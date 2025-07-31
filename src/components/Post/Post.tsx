import React, { useEffect, useState } from "react";
import "./Post.scss";
import { Position } from "@/src/types/Position";
import { PostUserRequest } from "@/src/types/PostUser";
import getPositions from "@/src/api/getPositions";
import getToken from "@/src/api/getToken";
import postUser from "@/src/api/postUser";
import successImage from "@/assets/success-image.svg";

interface PostProps {
  onUserRegistered?: () => void;
}

const Post: React.FC<PostProps> = ({ onUserRegistered }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: 0,
    photo: null as File | null,
  });

  // Fetch positions on component mount
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await getPositions();
        setPositions(data.positions);
        // Set first position as default
        if (data.positions.length > 0) {
          setFormData((prev) => ({
            ...prev,
            position_id: data.positions[0].id,
          }));
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    return (
      formData.name.trim().length >= 2 &&
      formData.name.trim().length <= 60 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      /^\+38\d{10}$/.test(formData.phone) &&
      formData.position_id > 0 &&
      formData.photo !== null &&
      formData.photo?.type !== undefined &&
      ["image/jpeg", "image/jpg"].includes(formData.photo.type) &&
      formData.photo?.size !== undefined &&
      formData.photo.size <= 5 * 1024 * 1024
    );
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2 || formData.name.length > 60) {
      newErrors.name = "Name should be 2-60 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    const phoneRegex = /^\+38\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone should start with +38 and contain 10 digits";
    }

    // Position validation
    if (!formData.position_id) {
      newErrors.position_id = "Please select a position";
    }

    // Photo validation
    if (!formData.photo) {
      newErrors.photo = "Photo is required";
    } else {
      const file = formData.photo;
      const validTypes = ["image/jpeg", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        newErrors.photo = "Photo must be a JPG/JPEG image";
      } else if (file.size > maxSize) {
        newErrors.photo = "Photo size must not exceed 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      // Get token
      const token = await getToken();

      // Submit user data
      const userData: PostUserRequest = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position_id: formData.position_id,
        photo: formData.photo!,
      };

      await postUser(userData, token);

      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position_id: positions[0]?.id || 0,
        photo: null,
      });
      // Notify parent to reload/collapse users
      if (onUserRegistered) {
        onUserRegistered();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to register user. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="post post--success">
        <h1 className="post__title">User successfully registered</h1>
        <img className="post__success-image" src={successImage} alt="Success" />
      </div>
    );
  }

  return (
    <div className="post">
      <h1 className="post__title">Working with POST request</h1>

      <form className="post__form" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label className="label" htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`input-field ${errors.name ? "input-field--error" : ""}`}
            placeholder="Your name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label className="label" htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`input-field ${
              errors.email ? "input-field--error" : ""
            }`}
            placeholder="Email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`input-field ${
              errors.phone ? "input-field--error" : ""
            }`}
            placeholder="Phone"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
          <label className="label" htmlFor="phone">
            +38 (XXX) XXX - XX - XX
          </label>
        </div>

        {/* Position Field */}
        <div className="form-group">
          <label className="label">Select your position</label>
          <div className="radio-button-group">
            {positions.map((position) => (
              <div key={position.id} className="radio-button">
                <input
                  type="radio"
                  id={`position-${position.id}`}
                  name="position_id"
                  value={position.id}
                  checked={formData.position_id === position.id}
                  onChange={handleInputChange}
                  className="radio-button__input"
                />
                <label htmlFor={`position-${position.id}`}></label>
                <div className="radio-button__label">{position.name}</div>
              </div>
            ))}
          </div>
          {errors.position_id && (
            <span className="error-text">{errors.position_id}</span>
          )}
        </div>

        {/* Photo Field */}
        <div className="form-group">
          <label className="label" htmlFor="photo"></label>
          <div
            className={`file-input-wrapper ${
              errors.photo ? "file-input-wrapper--error" : ""
            }`}
          >
            <button
              type="button"
              className="file-input-button"
              onClick={() => document.getElementById("photo")?.click()}
            >
              Upload
            </button>
            <div className="file-input-placeholder">
              {formData.photo ? formData.photo.name : "Upload your photo"}
            </div>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/jpeg,image/jpg"
              onChange={handleInputChange}
            />
          </div>
          {errors.photo && <span className="error-text">{errors.photo}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || !isFormValid()}
          className="post__submit-button button--primary"
        >
          <span>{submitting ? "Registering..." : "Sign up"}</span>
        </button>

        {/* Submit Error */}
        {errors.submit && <span className="error-text">{errors.submit}</span>}
      </form>
    </div>
  );
};

export default Post;
