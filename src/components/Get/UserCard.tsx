import { User } from "@/src/types/User";
import React from "react";
import "./UserCard.scss";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="user-card">
      <img
        className="user-card__photo"
        src={user.photo}
        alt={`${user.name}'s photo`}
      />
      <p className="user-card__name">{user.name}</p>

      <div className="user-card__details">
        <p className="user-card__position">{user.position}</p>
        <p className="user-card__email">{user.email}</p>
        <p className="user-card__phone">{user.phone}</p>
      </div>
    </div>
  );
};

export default UserCard;
