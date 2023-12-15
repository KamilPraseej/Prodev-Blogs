'use client'
import React, { useEffect, useParams, useState } from 'react';

export default function Viewblogdata() {
  const blogId = localStorage.getItem('blogId')
  const [bloginfo, setBloginfo] = useState({});

  const blogData = async () => {
    try {


      const response = await fetch(`http://localhost:8282/api/blogs/${blogId}`);
      const data = await response.json();
      setBloginfo(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  useEffect(() => {

    blogData();
  }); // Include blogId in the dependency array

  return (
    <div>
      <div>
      <h1>{bloginfo.title}</h1>
      <p>{bloginfo.content}</p>
      <p>Date: {bloginfo.date}</p>
      <p>Category: {bloginfo.category}</p>
                <img
                  src={bloginfo.imageUrl}
                  alt="Blog Image"
                  height={200}
                  width={300}
                //   className={styles.blogImage}
                />
      
    </div>
    </div>
  );
}
