// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import styles from "../../../../ui/dashboard/blogs/addBlogs/addBlogs.module.css";

// const AddBlogForm = () => {
//   const router = useRouter();

//   const [blog, setBlog] = useState({
//     title: "",
//     category: "",
//     content: "",
//     imageUrl: "",
//     userProfile: {
//       userId: 1,
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlog((prevBlog) => ({
//       ...prevBlog,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8282/api/blogs/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(blog),
//       });

//       if (response) {
//         console.log("Blog submitted successfully");
//         // Redirect or perform other actions after successful submission
//         router.push("/admin/dashboard/blogs"); // Replace with your desired route
//       } else {
//         console.error("Failed to submit blog");
//       }
//     } catch (error) {
//       console.error("Error submitting blog:", error);
//     }
//   };

//   return (
//     <div className={styles.mainPage}>
//     <div className={styles.AddBlogForm}>
//       <div className={styles.formContent}>
//       <form onSubmit={handleSubmit}>
//         <label className={styles.label} htmlFor="blogTitle">Title:</label>
//         <input className={styles.input} type="text" id="blogTitle" name="title" value={blog.title} onChange={handleChange} required />
//         <br />
//         <br />

//         <label className={styles.label} htmlFor="category">Category:</label>
//         <input className={styles.input}
//           type="text"
//           id="category"
//           name="category"
//           value={blog.category}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <br />

//         <label className={styles.label} htmlFor="blogContent">Content:</label>
//         <input className={styles.input}
//           type="textarea"
//           id="blogContent"
//           name="content"
//           value={blog.content}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <br />

//         <label className={styles.label} htmlFor="blogTags">ImageUrl:</label>
//         <input className={styles.input}
//           type="text"
//           id="blogTags"
//           name="imageUrl"
//           value={blog.imageUrl}
//           onChange={handleChange}
//         />
//         <br />
//         <br />

//         <input className={styles.button} type="submit" id="submit" value="Submit" />
//       </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AddBlogForm;




"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../../ui/dashboard/blogs/addBlogs/addBlogs.module.css";

const PostForm = () => {
  const router = useRouter();

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    imageUrl: "",
    fileInput: null, // File input should be a single file, not an array
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: name === "fileInput" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append JSON data to FormData
      formData.append("blogRequest", JSON.stringify(blog));

      // Append the file to FormData
      if (blog.fileInput) {
        formData.append("fileInput", blog.fileInput);
      }

      const response = await fetch("http://localhost:8282/api/blogs/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Blog submitted successfully");
        router.push("/user/viewUserBlogs");
      } else {
        console.error("Failed to submit blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="blogTitle">Title:</label>
      <input
        type="text"
        id="blogTitle"
        name="title"
        value={blog.title}
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={blog.category}
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="blogContent">Content:</label>
      <textarea
        id="blogContent"
        name="content"
        value={blog.content}
        onChange={handleChange}
        rows="6"
        required
      ></textarea>
      <br />
      <label htmlFor="blogTags">ImageUrl:</label>
      <input
        type="text"
        id="blogTags"
        name="imageUrl"
        value={blog.imageUrl}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="fileInput">Choose a file:</label>
      <input
        type="file"
        id="fileInput"
        name="fileInput"
        onChange={handleChange}
      />
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;