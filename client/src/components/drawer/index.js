import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Collapse, Grid } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import "../../vendor/perfect-scrollbar.css";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserDropdown from './userDropdown';
import { Sliders,
         Globe,
         Hash,
         MessageSquare,
         Users,
         User,
         Layers,
         Target,
         Mail,
         Edit,
         Briefcase,
         Grid as GridIcon,
         Zap,
         Home,
         BookOpen } from 'react-feather';
import { isAuth } from '../../actions/auth';
import { checkVisiblityOnSidebar } from '../../utils/helper'

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    boxShadow:"0px 0px 0px 0px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // backgroundColor:"#101531",
    marginRight: 36,
    "&:hover":{
      // backgroundColor:"#101531"
    }
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down('sm')]: {
      width: '0px'
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    minHeight:"45px"
  },
  content: {
    flexGrow: 1,
    overflowX:"scroll",
    [theme.breakpoints.down('xs')]: {
     padding: theme.spacing(2),
    },
    padding: theme.spacing(3),
  },
  icons:{
    fontSize:"30px"
  },
  menutext:{
    color:"rgb(238, 238, 238)",
    fontWeight:"100",
    fontSize:"13px",
    letterSpacing:"0.05rem",
    [theme.breakpoints.down('sm')]: {
      fontSize:"15px",
    },
  },
  collapseList:{
    // backgroundColor:"lightgrey"
  },
  appname:{
    color:"black"
  },
  menuIcon:{
    color:"black"
  },
  sidebarIcons:{
    color:"rgb(238, 238, 238)",
    opacity:"0.30"
  },
  direc:{
    color:"rgb(238, 238, 238)",
    opacity:"0.30"
  },
  grow:{
    flex:1
  },
  loggedInUser:{
    fontSize:"17px",
    color:"black"
  },
  list:{
    paddingLeft:"20px",
    paddingRight:"20px"
  },
  name:{
    color:"rgb(238, 238, 238)",
    opacity:"0.90"
  }
}));




 const SideDrawer = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const matches = useMediaQuery('(min-width:600px)');
  const [openEmployeeCollapse, setOpenEmployeeCollapse] = React.useState(true);
  const [openContentCollapse, setOpenContentCollapse] = React.useState(true);
  const [openTaskCollapse, setOpenTaskCollapse] = React.useState(true);

 
  const handleChange = (name) => e => {
   if(name ==="content"){
      setOpenContentCollapse(!openContentCollapse);
   }else if (name === "employee") {
        setOpenEmployeeCollapse(!openEmployeeCollapse);
   }else if (name === "task") {
      setOpenTaskCollapse(!openTaskCollapse);
   }
  }

   React.useEffect(() => {
       if(matches){
         return setOpen(true)
       }
       setOpen(false)
   }, [matches])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const currentTab = path => {
     if(path === history.location.pathname){
       return true;
     }
     return false;
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
         <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.appname}>

          </Typography>
          <div className={classes.grow}>
          </div>

          <UserDropdown />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

      <div className={classes.toolbar}>
        {open && <Typography variant="h6" noWrap>
        </Typography>}
        {!matches && <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon className={classes.direc} /> : <ChevronLeftIcon className={classes.direc} />}
        </IconButton>}
       <Grid container justify="center">
         <Typography noWrap className={classes.name}>
           Hello, {isAuth() && isAuth().full_name}
         </Typography>
       </Grid>
      </div>
      <Divider />
      <List className={classes.list}>

      <Link to="/dashboard">
        <ListItem button selected={currentTab("/dashboard")}>
            <ListItemIcon>
              <Home className={classes.sidebarIcons} />
            </ListItemIcon>
            <ListItemText >
              <Typography className={classes.menutext} variant="body1">
               Dashboard
              </Typography>
          </ListItemText>
        </ListItem>
      </Link>

      <Link to="/profile">
        <ListItem button selected={currentTab("/profile")}>
            <ListItemIcon>
              <Sliders className={classes.sidebarIcons} />
            </ListItemIcon>
            <ListItemText >
              <Typography className={classes.menutext} variant="body1">
               Profile
              </Typography>
            </ListItemText>
        </ListItem>
      </Link>

      {checkVisiblityOnSidebar('project') && <Link to="/projects">
          <ListItem button selected={currentTab("/projects")}>
             <ListItemIcon>
               <GridIcon className={classes.sidebarIcons} />
             </ListItemIcon>
            <ListItemText >
              <Typography className={classes.menutext} variant="body1">
                Projects
              </Typography>
            </ListItemText>
          </ListItem>
      </Link>}




    {(checkVisiblityOnSidebar('my_tasks') || checkVisiblityOnSidebar('task')) &&
    <ListItem button onClick={handleChange("task")} className='mt-3'>
                <ListItemIcon>
                  <User className={classes.sidebarIcons} />
                 </ListItemIcon>
                <ListItemText >
                  <Typography className={classes.menutext}>
                   Tasks
                  </Typography>
                </ListItemText>
                {openTaskCollapse ?<ExpandLess className={classes.direc} />:<ExpandMore className={classes.direc} />}
    </ListItem>}

    <Collapse in={openTaskCollapse} timeout="auto" unmountOnExit>
       <List component="div" disablePadding className={classes.collapseList}>

       {checkVisiblityOnSidebar('my_tasks') && <Link to="/my-tasks">
         <ListItem button selected={currentTab("/my-tasks")}>
          <ListItemIcon>
            {<Zap className={classes.sidebarIcons} />}
          </ListItemIcon>
           <ListItemText >
              <Typography className={classes.menutext} variant="body1">
                My Tasks
              </Typography>
           </ListItemText>
         </ListItem>
       </Link>}

       {checkVisiblityOnSidebar('task') && <Link to="/tasks">
         <ListItem button selected={currentTab("/tasks")}>
              <ListItemIcon>
                <Briefcase className={classes.sidebarIcons} />
              </ListItemIcon>
           <ListItemText >
             <Typography className={classes.menutext} variant="body1">
               All Tasks
             </Typography>
           </ListItemText>
         </ListItem>
       </Link>}

       </List>
    </Collapse>





     {checkVisiblityOnSidebar('chat') && <Link to="/chats">
        <ListItem button selected={currentTab("/chats")}>
            <ListItemIcon>
               <MessageSquare className={classes.sidebarIcons} />
            </ListItemIcon>
            <ListItemText >
              <Typography className={classes.menutext} variant="body1">
                Chats
              </Typography>
            </ListItemText>
        </ListItem>
    </Link>}

      {(checkVisiblityOnSidebar('all_employees') || checkVisiblityOnSidebar('department') || checkVisiblityOnSidebar('designation')) && <ListItem button onClick={handleChange("employee")} className='mt-3'>
                  <ListItemIcon>
                    <User className={classes.sidebarIcons} />
                   </ListItemIcon>
                  <ListItemText >
                    <Typography className={classes.menutext}>
                     Employees
                    </Typography>
                  </ListItemText>
                  {openEmployeeCollapse ?
                  <ExpandLess className={classes.direc} />
                  :<ExpandMore className={classes.direc} />}
      </ListItem>}
      <Collapse in={openEmployeeCollapse} timeout="auto" unmountOnExit>
         <List component="div" disablePadding className={classes.collapseList}>

           {checkVisiblityOnSidebar('all_employees') && <Link to="/all-employees">
               <ListItem button selected={currentTab("/all-employees")}>
                  <ListItemIcon>
                      <Users className={classes.sidebarIcons} />
                  </ListItemIcon>
                  <ListItemText >
                    <Typography className={classes.menutext} variant="body1">
                      All Employee
                    </Typography>
                  </ListItemText>
               </ListItem>
              </Link>}

           {checkVisiblityOnSidebar('department') && <Link to="/department">
               <ListItem button selected={currentTab("/department")}>
                  <ListItemIcon>
                    <Layers className={classes.sidebarIcons} />
                  </ListItemIcon>
                  <ListItemText >
                    <Typography className={classes.menutext} variant="body1">
                      Department
                    </Typography>
                  </ListItemText>
               </ListItem>
           </Link>}

            {checkVisiblityOnSidebar('designation') && <Link to="/designation">
               <ListItem button selected={currentTab("/designation")}>
                   <ListItemIcon>
                     <Target className={classes.sidebarIcons} />
                   </ListItemIcon>
                  <ListItemText >
                    <Typography className={classes.menutext} variant="body1">
                      Designation
                    </Typography>
                  </ListItemText>
               </ListItem>
            </Link>}
         </List>
      </Collapse>


      {(checkVisiblityOnSidebar('write_blog')||checkVisiblityOnSidebar('all_blogs')||checkVisiblityOnSidebar('domain')||checkVisiblityOnSidebar('category')) && <ListItem button onClick={handleChange("content")} className='mt-3'>
                  <ListItemIcon>
                     <User className={classes.sidebarIcons} />
                  </ListItemIcon>
                  <ListItemText >
                    <Typography className={classes.menutext}>
                      Content
                    </Typography>
                  </ListItemText>
                  {openContentCollapse ?
                  <ExpandLess className={classes.direc} />
                  :<ExpandMore className={classes.direc} />}
      </ListItem>}
      <Collapse in={openContentCollapse} timeout="auto" unmountOnExit>
         <List component="div" disablePadding className={classes.collapseList}>

               {checkVisiblityOnSidebar('my_blogs') && <Link to="/my-blogs">
                 <ListItem button selected={currentTab("/my-blogs")}>
                  <ListItemIcon>
                   {/*<Zap className={classes.sidebarIcons} />*/}
                  </ListItemIcon>
                   <ListItemText >
                      <Typography className={classes.menutext} variant="body1">
                        My Blogs
                      </Typography>
                   </ListItemText>
                 </ListItem>
               </Link>}

              {checkVisiblityOnSidebar('write_blog') && <Link to="/content/create">
                 <ListItem button selected={currentTab("/content/create")}>
                   <ListItemIcon>
                      <Edit className={classes.sidebarIcons} />
                   </ListItemIcon>
                  <ListItemText >
                     <Typography className={classes.menutext} variant="body1">
                       Write Blog
                     </Typography>
                  </ListItemText>
                 </ListItem>
              </Link>}

              {checkVisiblityOnSidebar('all_blogs') && <Link to="/content/blogs">
                 <ListItem button selected={currentTab("/content/blogs")}>
                   <ListItemIcon>
                     <BookOpen className={classes.sidebarIcons} />
                   </ListItemIcon>
                  <ListItemText >
                    <Typography className={classes.menutext} variant="body1">
                      All Blogs
                    </Typography>
                  </ListItemText>
                 </ListItem>
               </Link>}

              {checkVisiblityOnSidebar('category') && <Link to="/categories">
                 <ListItem button selected={currentTab("/categories")}>
                   <ListItemIcon>
                     <Hash className={classes.sidebarIcons} />
                   </ListItemIcon>
                  <ListItemText >
                     <Typography className={classes.menutext}>
                     Categories
                     </Typography>
                  </ListItemText>
                 </ListItem>
               </Link>}

               {checkVisiblityOnSidebar('domain') && <Link to="/domains">
                   <ListItem button selected={currentTab("/domains")}>
                     <ListItemIcon>
                       <Globe className={classes.sidebarIcons} />
                     </ListItemIcon>
                    <ListItemText >
                      <Typography className={classes.menutext} variant="body1">
                        Domains
                      </Typography>
                    </ListItemText>
                   </ListItem>
               </Link>}
         </List>
      </Collapse>

      {checkVisiblityOnSidebar('contact') && <Link to="/contact">
        <ListItem button selected={currentTab("/contact")}>
           <ListItemIcon>
             <Mail className={classes.sidebarIcons} />
           </ListItemIcon>
          <ListItemText >
            <Typography className={classes.menutext} variant="body1">
              Contacts
            </Typography>
          </ListItemText>
        </ListItem>
      </Link>}

      {checkVisiblityOnSidebar('activity') && <Link to="/activities">
        <ListItem button selected={currentTab("/activities")}>
         <ListItemIcon>
           <Zap className={classes.sidebarIcons} />
         </ListItemIcon>
          <ListItemText >
             <Typography className={classes.menutext} variant="body1">
               Activities
             </Typography>
          </ListItemText>
        </ListItem>
      </Link>}

      <br />




      </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
         {children}
      </main>
    </div>
  );
}

export default SideDrawer;
