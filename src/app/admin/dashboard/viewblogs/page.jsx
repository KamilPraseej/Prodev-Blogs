// pages/admin/dashboard/viewblogs/[blogId].js
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"

const BlogDetails = () => {
    const blogId = localStorage.getItem('blogId')
  const [blogData, setBlogData] = useState(null);
  const router = useRouter()
console.log(blogId,"id")
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:8282/api/blogs/${blogId}`);
        const data = await response.json();
        setBlogData(data);
        console.log(data,"success")
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:8282/api/blogs/delete/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // setUsers((prevBlogs) => prevBlogs.filter((blog) => blog.blogId !== blogId));
        router.push('/admin/dashboard/blogs')

      } else {
        console.error('Failed to delete blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <h1>{blogData.title}</h1>
      <p>{blogData.content}</p>
      <p>Date: {blogData.date}</p>
      <p>Category: {blogData.category}</p>
                <img
                  src={blogData.imageUrl}
                  alt="Blog Image"
                  height={200}
                  width={300}
                //   className={styles.blogImage}
                />

<div><button
                  
                  onClick={() => handleDelete(blogData.blogId)}
                >
                  Delete
                </button></div>
      
    </div>
  );
};


export default BlogDetails;

