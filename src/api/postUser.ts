import { PostUserRequest, PostUserResponse } from "../types/PostUser";

const postUser = async (
  userData: PostUserRequest,
  token: string
): Promise<PostUserResponse> => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("phone", userData.phone);
  formData.append("position_id", userData.position_id.toString());
  formData.append("photo", userData.photo);

  const response = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/users",
    {
      method: "POST",
      headers: {
        Token: token,
      },
      body: formData,
    }
  );

  const data: PostUserResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to register user");
  }

  return data;
};

export default postUser;
