import React, { useEffect, useState } from "react";
import "./GetUsers.scss";
import { User } from "@/src/types/User";
import getUsers from "@/src/api/getUsers";
import UserCard from "./UserCard";

const GetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers(1, 8)
      .then((data: User[]) => {
        setUsers(data);
      })
      .catch((error: unknown): void => {
        console.error("Error fetching users:", error);
      })
      .finally((): void => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="get-users">
      <h1 className="get-users__title">Working with GET request</h1>
      {loading ? (
        <p className="get-users__loading">Loading...</p>
      ) : (
        <div className="get-users__list"> 
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      <button className="get-users__button">Show more</button>
    </div>
  );
};

export default GetUsers;
