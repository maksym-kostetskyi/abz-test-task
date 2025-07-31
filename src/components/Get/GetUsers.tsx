import React from "react";
import "./GetUsers.scss";
import { User } from "@/src/types/User";
import UserCard from "./UserCard";

interface GetUsersProps {
  allUsers: User[];
  displayedUsers: User[];
  loading: boolean;
  showingAll: boolean;
  onShowMore: () => void;
}

const GetUsers: React.FC<GetUsersProps> = ({
  allUsers,
  displayedUsers,
  loading,
  showingAll,
  onShowMore,
}) => {
  return (
    <div className="get-users">
      <h1 className="get-users__title">Working with GET request</h1>
      {loading && displayedUsers.length === 0 ? (
        <p className="get-users__loading">Loading...</p>
      ) : (
        <div className="get-users__list">
          {displayedUsers.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {!showingAll && !loading && (
        <button
          className="get-users__button button--primary"
          onClick={onShowMore}
          disabled={loading}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default GetUsers;
