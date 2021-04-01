import React from 'react';
import Drawer from '../drawer';
import Private from '../protectedRoutes/privateRoute';

const DashboardLayout = ({ children }) => {
  return <>
           <Drawer  children={children} />
         </>
}

export default DashboardLayout;
