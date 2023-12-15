'use client'
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../../ui/dashboard/allUsers/allUsers.module.css";
import Search from "../../../ui/dashboard/search/search";
import Pagination from "../../../ui/dashboard/pagination/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8282/api/user/getUserProfiles");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8282/api/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleView = (userId) => {
    localStorage.setItem('userId', userId)
    router.push(`/admin/dashboard/viewUsers`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
          <td>Image</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email Id</td>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
               <td>
                <img
                  src={user.imageUrl}
                  alt="Blog Image"
                  height={40}
                  className={styles.userImage}
                />
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.emailId}</td>
             
              <td>
                <button
                  className={`${styles.button} ${styles.delete}`}
                  onClick={() => handleDelete(user.userId)}
                >
                  Delete
                </button>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>
    </div>
  );
};

export default Page;