import React from 'react';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import AllEmployees from '../pages/employees/allEmployees';
import Department from '../pages/employees/department';
import Designation from '../pages/employees/designation';
import Holidays from '../pages/employees/holidays';
import LeaveRequests from '../pages/employees/leaveRequests';
import Contact from '../pages/contact';
import Reset from '../pages/reset';
import Onboard from '../pages/onboard';
import { Route } from 'react-router-dom';
import Private from '../components/protectedRoutes/privateRoute';

const Router = () => {
   return <>
           <Route path="/" exact component={Login} />
           <Private path="/dashboard" exact component={Dashboard} />
           <Private path="/all-employees" exact component={AllEmployees} />
           <Private path="/department" exact component={Department} />
           <Private path="/designation" exact component={Designation} />
           <Private path="/holidays" exact component={Holidays} />
           <Private path="/leave-requests" exact component={LeaveRequests} />
           <Private path="/contact" exact component={Contact} />
           <Route path="/reset" exact component={Reset} />
           <Route path="/auth/onboard/:token" exact component={Onboard} />
          </>
}
export default Router;
