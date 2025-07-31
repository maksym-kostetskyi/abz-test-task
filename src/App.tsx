import React, { useState, useEffect } from "react";
import About from "./components/About/About";
import GetUsers from "./components/Get/GetUsers";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import { User } from "@/src/types/User";
import { UsersApiResponse } from "@/src/types/UsersApiResponse";
import getUsers from "@/src/api/getUsers";

const App: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showingAll, setShowingAll] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

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
      // Initially show first 6 users (reset to first page)
      setDisplayedUsers(sortedUsers.slice(0, 6));
      setShowingAll(sortedUsers.length <= 6);
    } catch (error: unknown) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and reload when reloadFlag changes
  useEffect(() => {
    fetchAllUsers();
  }, [reloadFlag]);

  // Handle "Show more" button click
  const handleShowMore = () => {
    if (!showingAll && allUsers.length > displayedUsers.length) {
      // Show all remaining users
      setDisplayedUsers(allUsers);
      setShowingAll(true);
    }
  };

  // Called after successful registration - reload and collapse to first page
  const handleUserRegistered = () => {
    setReloadFlag((prev) => prev + 1); // This triggers useEffect to reload users
  };

  return (
    <>
      <Header />
      <About />
      <div id="get-users-section">
        <GetUsers
          allUsers={allUsers}
          displayedUsers={displayedUsers}
          loading={loading}
          showingAll={showingAll}
          onShowMore={handleShowMore}
        />
      </div>
      <div id="post-section">
        <Post onUserRegistered={handleUserRegistered} />
      </div>
    </>
  );
};

export default App;
