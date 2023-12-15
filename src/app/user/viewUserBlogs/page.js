'use client';
import { useEffect, useState,useParams } from 'react';
import './viewUserblogs.css'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function ViewAllBlogs() {
  const router =useRouter()
  // const { blogId } = useParams()
  const [blogs, setBlogs] = useState([]);

  const blogsApi = async () => {
    try {
      const response = await fetch('http://localhost:8282/api/blogs/getBlogs/1');
      const data = await response.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  async function viewBlog (blogId){
    console.log(blogId,"iddddddddddddddddddd");
    localStorage.setItem('blogId',blogId)
    router.push('/user/viewBlogData')
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:8282/api/blogs/delete/${blogId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Deletion was successful
        console.log('Blog deleted successfully');
        blogsApi()
        // Optionally, you can update the UI or perform any other actions after deletion.
      } else {
        // Handle the case when the deletion was not successful
        console.error('Error deleting blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  

  useEffect(() => {
    blogsApi(); 
  }, []); 

  return (
    <div>
      <div className='blogcards'>

        {blogs.map((item) => (
          <div key={item.blogId} className='data'>
            <div className='image'>
             <img src={item.imageUrl} height='100' width='100' alt="Blog Image" />
            </div>
            <div className='bloginfo'>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
              <p>{item.content}</p>
              <p>Date: {item.date}</p>
              
              <button className='viewButton'
                    onClick={()=>viewBlog(item.blogId)}
                    >View</button>
              <button className='deleteButton'
                    onClick={()=>deleteBlog(item.blogId)}
                    >Delete</button>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}
