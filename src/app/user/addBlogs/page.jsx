// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import "./addblog.css";

// const PostForm = () => {
//   const router = useRouter()

//   const [blog, setBlog] = useState({
//         imageUrl : '',
//         title : '',
//         date : '',
//         category :'',
//         content : '',
//         userProfile: {
//           userId : '',
//         },
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
//       const response = await fetch('http://localhost:8282/api/blogs/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(blog),
//       });

//       if (response) {
//         console.log('Blog submitted successfully');
//         // Redirect or perform other actions after successful submission
//         router.push('/admin/dashboard'); // Replace with your desired route
//       } else {
//         console.error('Failed to submit blog');
//       }
//     } catch (error) {
//       console.error('Error submitting blog:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>

//       <label htmlFor="imageUrl">Image URL:</label>

//       <input
//         type="text"
//         id="imageUrl"
//         name="imageUrl"
//         value={blog.imageUrl}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="title">Title:</label>

//       <input
//         type="text"
//         id="title"
//         name="title"
//         value={blog.title}
//         onChange={handleChange}
//       />
//       <br />

// <label htmlFor="date">Date:</label>
// <input
//   type="date"
//   id="date"
//   name="date"
//   value={blog.date}
//   onChange={handleChange}
// />
// <br />

//       <label htmlFor="category">Category:</label>

//       <input
//         type="text"
//         id="category"
//         name="category"
//         value={blog.category}
//         onChange={handleChange}
//       />
//       <br />

//       <label htmlFor="content">Content:</label>
//       <textarea
//         id="content"
//         name="content"
//         value={blog.content}
//         onChange={handleChange}
//       />
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PostForm;

//
//
//
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./addblog.css";

const PostForm = () => {
  const router = useRouter();

  const [blog, setBlog] = useState({
    // imageUrl : '',
    title: "",
    category: "",
    content: "",
    imageUrl: "",
    fileInput:[],
    userProfile: {
      userId: 1,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8282/api/blogs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      console.log(blog)
      if (response) {
        console.log("Blog submitted successfully");
        // Redirect or perform other actions after successful submission
        router.push("/user/viewUserBlogs"); // Replace with your desired route
      } else {
        console.error("Failed to submit blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="imageUrl">Image URL:</label>

      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={blog.imageUrl}
        onChange={handleChange}
      />
      <br /> */}

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
      <label for="fileInput">Choose a file:</label>
      <input 
        type="file" 
        id="fileInput" 
        name="fileInput" 
        value={blog.fileInput}
        onChange={handleChange}
      />
      <br></br>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
