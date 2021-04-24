import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import BlogFilter from '../../components/content/blogFilter';
import BlogList from '../../components/content/blogList';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    setBlogList(blogs);
  }, [blogs])

  return <>
          <DashboardLayout>
            <BlogFilter blogs={(blogs) => setBlogs(blogs)}/>
            <BlogList blogs={blogList}/>
          </DashboardLayout>
        </>
}

export default AllBlogs;
