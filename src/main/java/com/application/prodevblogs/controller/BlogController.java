package com.application.prodevblogs.controller;


import com.application.prodevblogs.exceptions.BlogNotFoundException;
import com.application.prodevblogs.exceptions.UserProfileNotFoundException;
import com.application.prodevblogs.model.Blog;
import com.application.prodevblogs.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    
    private final BlogService blogService;
    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createBlog(
            @RequestBody Blog blog) throws RuntimeException {
        try{
            Blog createdBlog = blogService.createBlog(blog);
            return new ResponseEntity<>("Blog Created Successfully", HttpStatus.CREATED);
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("/{blogId}")
    public ResponseEntity<Blog> getBlog(
            @PathVariable Long blogId) throws RuntimeException {
        Blog blog = blogService.getBlogById(blogId);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }


    @GetMapping("/getBlogs")
    public ResponseEntity<List<Blog>> getAllBlogs() throws RuntimeException {
        List<Blog> blogs = blogService.getAllBlogs();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @GetMapping("/getBlogs/{userId}")
    public ResponseEntity<?> getAllBlogsByUser(@PathVariable Long userId) throws RuntimeException{
        try {
            List<Blog> blogs = blogService.getAllBlogsByUser(userId);
            return new ResponseEntity<>(blogs, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }



    @PutMapping("/update/{blogId}")
    public ResponseEntity<Blog> updateBlog(
            @PathVariable Long blogId, @RequestBody Blog blog) throws RuntimeException, BlogNotFoundException {
        Blog updatedBlog = blogService.updateBlog(blogId, blog);
        return new ResponseEntity<>(updatedBlog, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{blogId}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long blogId) throws RuntimeException, BlogNotFoundException {
        blogService.deleteBlog(blogId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
