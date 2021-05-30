import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import TaskFilter from '../../components/task/taskFilter';
import CreateTask from '../../components/task/createTask';
import TaskList from '../../components/task/taskList';

const Tasks = () => {
   const [tasks, setTasks] = useState([]);
   const [taskList, setTaskList] = useState([]);

   useEffect(() => {
     setTaskList(tasks);
   }, [tasks])

  return <>
          <DashboardLayout>
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Tasks
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                <CreateTask />
               </Grid>
            </Grid>
            <br />
            <TaskFilter tasks={(tasks) => setTasks(tasks)} />
            <TaskList taskList={taskList} />
          </DashboardLayout>
         </>
}

export default Tasks;
