package com.application.prodevblogs.service.serviceImpl;

import com.application.prodevblogs.exceptions.BlogNotFoundException;
import com.application.prodevblogs.exceptions.UserProfileNotFoundException;
import com.application.prodevblogs.model.Blog;
import com.application.prodevblogs.model.UserProfile;
import com.application.prodevblogs.repository.BlogRepository;
import com.application.prodevblogs.repository.UserProfileRepository;
import com.application.prodevblogs.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    
    private final BlogRepository blogRepository;
    private final UserProfileRepository userProfileRepository;
    @Autowired
    public BlogServiceImpl(BlogRepository blogRepository, UserProfileRepository userProfileRepository) {
        this.blogRepository = blogRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Override
    public Blog createBlog(Blog blog) {
        try{
            return blogRepository.save(blog);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Blog getBlogById(Long blogId) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        return blogOptional.orElse(null);
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public List<Blog> getAllBlogsByUser(Long userId) {
        try {
            Optional<UserProfile> optionalUser = userProfileRepository.findById(userId);

            if (optionalUser.isPresent()) {
                UserProfile user = optionalUser.get();
                return blogRepository.findAllByUserProfile(user);
            } else {
                throw new UserProfileNotFoundException("User with ID " + userId + " not found");
            }
        } catch (UserProfileNotFoundException e) {
            throw new RuntimeException("Error getting blogs by user", e);
        }
    }


    @Override
    public Blog updateBlog(Long blogId, Blog blog) throws BlogNotFoundException {
        try {
            Optional<Blog> existingBlogOptional = blogRepository.findById(blogId);

            if (existingBlogOptional.isPresent()) {
                Blog existingBlog = existingBlogOptional.get();
                existingBlog.setTitle(blog.getTitle());
                existingBlog.setCategory(blog.getCategory());
                existingBlog.setImageUrl(blog.getImageUrl());

                return blogRepository.save(existingBlog);
            } else {
                throw new BlogNotFoundException("Blog with ID " + blogId + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating blog", e);
        }
    }

    @Override
    public void deleteBlog(Long blogId) throws BlogNotFoundException {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(blogId);

            if (blogOptional.isPresent()) {
                blogRepository.deleteById(blogId);
            } else {
                throw new BlogNotFoundException("Blog with ID " + blogId + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting blog", e);
        }
    }


}
