import React from 'react';
import { Route } from 'react-router-dom';
import Private from '../components/protectedRoutes/privateRoute';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import AllEmployees from '../pages/employees/';
import EmployeeDetail from '../pages/employees/employeeDetail';
import Department from '../pages/employees/department';
import Designation from '../pages/employees/designation';
import Contact from '../pages/contact';
import Reset from '../pages/reset';
import Onboard from '../pages/onboard';
import Activities from '../pages/activities';
import Projects from '../pages/projects';
import Tasks from '../pages/tasks';
import ChannelChats from '../pages/chats';
import Chats from '../pages/chats/chats';



const Router = () => {
   return <>
           <Route path="/" exact component={Login} />
           <Private path="/dashboard" exact component={Dashboard} />
           <Route path="/all-employees" exact component={AllEmployees} />
           <Private path="/employee-detail/:id" exact component={EmployeeDetail} />
           <Route path="/department" exact component={Department} />
           <Route path="/designation" exact component={Designation} />
           <Private path="/contact" exact component={Contact} />
           <Private path="/activities" exact component={Activities} />
           <Private path="/projects" exact component={Projects} />
           <Private path="/tasks" exact component={Tasks} />
           <Private path="/chats" exact component={Chats} />
           <Private path="/chats/:channel" exact component={ChannelChats} />
           <Route path="/reset" exact component={Reset} />
           <Route path="/auth/onboard/:token" exact component={Onboard} />
          </>
}
export default Router;
