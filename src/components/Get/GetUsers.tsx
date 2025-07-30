import React, { useEffect, useState } from "react";
import "./GetUsers.scss";
import { User } from "@/src/types/User";
import { UsersApiResponse } from "@/src/types/UsersApiResponse";
import getUsers from "@/src/api/getUsers";
import UserCard from "./UserCard";

const GetUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showingAll, setShowingAll] = useState(false);

  // Fetch all users from all pages
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      let allUsersData: User[] = [];
      let currentPage = 1;
      let totalPages = 1;

      // Fetch first page to get total pages info
      const firstPageData: UsersApiResponse = await getUsers(currentPage, 8);
      allUsersData = [...firstPageData.users];
      totalPages = firstPageData.total_pages;

      // Fetch remaining pages
      while (currentPage < totalPages) {
        currentPage++;
        const pageData: UsersApiResponse = await getUsers(currentPage, 8);
        allUsersData = [...allUsersData, ...pageData.users];
      }

      // Sort all users by registration date (newest first)
      const sortedUsers = allUsersData.sort(
        (a, b) => b.registration_timestamp - a.registration_timestamp
      );

      setAllUsers(sortedUsers);
      // Initially show first 6 users
      setDisplayedUsers(sortedUsers.slice(0, 6));
      setShowingAll(sortedUsers.length <= 6);
    } catch (error: unknown) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load - fetch all users
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Handle "Show more" button click
  const handleShowMore = () => {
    if (!showingAll && allUsers.length > displayedUsers.length) {
      // Show all remaining users
      setDisplayedUsers(allUsers);
      setShowingAll(true);
    }
  };

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
          onClick={handleShowMore}
          disabled={loading}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default GetUsers;
