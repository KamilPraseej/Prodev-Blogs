package com.application.prodevblogs.controller;

import com.application.prodevblogs.exceptions.BlogFilesNotFoundException;
import com.application.prodevblogs.model.BlogFiles;
import com.application.prodevblogs.service.BlogFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/blogFiles")
public class BlogFilesController {
    
    private final BlogFilesService blogFilesService;
    @Autowired
    public BlogFilesController(BlogFilesService blogFilesService) {
        this.blogFilesService = blogFilesService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createBlogFiles(
            @RequestBody BlogFiles blogFiles) throws RuntimeException {
        try{
            BlogFiles createdBlogFiles = blogFilesService.createBlogFiles(blogFiles);
            return new ResponseEntity<>("BlogFiles Created Successfully", HttpStatus.CREATED);
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("/{BlogFileId}")
    public ResponseEntity<BlogFiles> getBlogFiles(
            @PathVariable Long BlogFileId) throws RuntimeException {
        BlogFiles blogFiles = blogFilesService.getBlogFilesById(BlogFileId);
        return new ResponseEntity<>(blogFiles, HttpStatus.OK);
    }


    @GetMapping("/getBlogFiles")
    public ResponseEntity<List<BlogFiles>> getAllBlogFiles() throws RuntimeException {
        List<BlogFiles> blogFiles = blogFilesService.getAllBlogFiles();
        return new ResponseEntity<>(blogFiles, HttpStatus.OK);
    }


    @PutMapping("/update/{BlogFileId}")
    public ResponseEntity<BlogFiles> updateBlogFiles(
            @PathVariable Long BlogFileId, @RequestBody BlogFiles blogFiles) throws RuntimeException, BlogFilesNotFoundException {
        BlogFiles updatedBlogFiles = blogFilesService.updateBlogFiles(BlogFileId, blogFiles);
        return new ResponseEntity<>(updatedBlogFiles, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{BlogFileId}")
    public ResponseEntity<Void> deleteBlogFiles(@PathVariable Long BlogFileId) throws RuntimeException, BlogFilesNotFoundException {
        blogFilesService.deleteBlogFiles(BlogFileId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
