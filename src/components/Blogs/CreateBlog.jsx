// src/pages/CreateBlog.jsx
import React from 'react';
import { BlogEditor, BlogProvider, ThemeDebugger } from 'react-vector';
import { blogServiceAdapter } from '../../services/blogServiceAdapter'; 

const CreateBlog = () => {
  return (
    <BlogProvider service={blogServiceAdapter}>
      <div className="min-h-screen bg-backgroundSecondary text-primary p-4">
        <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>
        <BlogEditor />
        <ThemeDebugger /> 
      </div>
    </BlogProvider>
  );
};

export default CreateBlog;
