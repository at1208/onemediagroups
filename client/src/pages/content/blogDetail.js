import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { singleBlog } from '../../actions/blog'
import { getCookie } from '../../actions/auth'

const BlogDetail = ({ match: { params: { id } } }) => {
   const [blog, setBlog] = useState();
   const token = getCookie("token");

   useEffect(() => {
      singleBlog(id, token)
        .then(response => {
          setBlog(response)
        })
        .catch(error => {
          console.log(error)
        })
   }, [])

console.log(blog)
  return <>
          <DashboardLayout>
          </DashboardLayout>
         </>
}

export default withRouter(BlogDetail);
