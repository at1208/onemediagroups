import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Badge, Typography, Avatar } from '@material-ui/core/';
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
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Divider, Collapse, Grid } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import ContactsIcon from '@material-ui/icons/Contacts';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import StyleIcon from '@material-ui/icons/Style';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import ViewListIcon from '@material-ui/icons/ViewList';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../vendor/perfect-scrollbar.css";
import styled from "styled-components/macro";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MessagesDropdown from './messageDropdown';
import NotificationDropdown from './notificationDropdown';
import UserDropdown from './userDropdown';
import { Sliders,Globe, Hash, MessageSquare, Users, User, Layers, Target, Mail, Edit, Briefcase, Grid as GridIcon, Zap, Home, BookOpen } from 'react-feather';
import { signout, isAuth } from '../../actions/auth';

const drawerWidth = 240;

const Scrollbar = styled(PerfectScrollbar)`
  /* background-color: 'blue'; */
  /* border-right: 1px solid rgba(0, 0, 0, 0.12); */
`;

const SidebarFooterBadge = styled(Badge)`
  margin-right: "10px";
  span {
    background-color: "blue";
    border: 1.5px solid "black";
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const SidebarFooter = styled.div`
  background-color: "blue" !important;
  padding:"10px";
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

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
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    overflowX:"scroll",
    padding: theme.spacing(3),
  },
  icons:{
    fontSize:"30px"
  },
  menutext:{
    color:"rgb(238, 238, 238)",
    fontWeight:"100",
    fontSize:"14px",
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
    color:"grey",
  },
  direc:{
    color:"#e0e0e0"
  },
  grow:{
    flex:1
  },
  loggedInUser:{
    fontSize:"17px",
    color:"black"
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

  function handleOpenEmployee(){
     setOpenEmployeeCollapse(!openEmployeeCollapse);
  }

  function handleOpenContent(){
     setOpenContentCollapse(!openContentCollapse);
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
            AppName
          </Typography>
          <div className={classes.grow}>
          </div>
          <small className={classes.loggedInUser}>{`Hello ${isAuth() && isAuth().first_name}`}</small>
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
      </div>
      <Divider />
      <Scrollbar>
      <List disablePadding>

      <Link to="/dashboard">
        <ListItem button  selected={currentTab("/dashboard")}>
          <ListItemIcon><Home className={classes.sidebarIcons} /></ListItemIcon>
          <ListItemText ><Typography className={classes.menutext}>Dashboard</Typography></ListItemText>
        </ListItem>
      </Link>

      <Link to="/profile">
      <ListItem button  selected={currentTab("/profile")} onClick={() => history.push("/profile")}>
        <ListItemIcon><Sliders className={classes.sidebarIcons} /></ListItemIcon>
        <ListItemText ><Typography className={classes.menutext}>Profile</Typography></ListItemText>
      </ListItem>
      </Link>

      <Link to="/projects">
      <ListItem button   selected={currentTab("/projects")}>
         <ListItemIcon><GridIcon className={classes.sidebarIcons} /></ListItemIcon>
        <ListItemText ><Typography className={classes.menutext}>Projects</Typography></ListItemText>
      </ListItem>
      </Link>

    <Link to="/tasks">
      <ListItem button   selected={currentTab("/tasks")} onClick={() => history.push("/tasks")}>
       <ListItemIcon><Briefcase className={classes.sidebarIcons} /></ListItemIcon>
      <ListItemText ><Typography className={classes.menutext}>Tasks</Typography></ListItemText>
      </ListItem>
    </Link>

     <Link to="/chats">
      <ListItem button  selected={currentTab("/chats")} onClick={() => history.push("/chats")}>
        <ListItemIcon><MessageSquare className={classes.sidebarIcons} /></ListItemIcon>
        <ListItemText ><Typography className={classes.menutext}>Chats</Typography></ListItemText>
      </ListItem>
    </Link>

      <ListItem button onClick={handleOpenEmployee} className='mt-3'>
                  <ListItemIcon><User className={classes.sidebarIcons} /></ListItemIcon>
                  <ListItemText ><Typography className={classes.menutext}>Employees</Typography></ListItemText>
                  {openEmployeeCollapse ? <ExpandLess className={classes.direc} /> : <ExpandMore className={classes.direc} />}
      </ListItem>
      <Collapse in={openEmployeeCollapse} timeout="auto" unmountOnExit>
         <List component="div" disablePadding className={classes.collapseList}>
           <Link to="/all-employees">
               <ListItem button   selected={currentTab("/all-employees")}>
                 <ListItemIcon><Users className={classes.sidebarIcons} /></ListItemIcon>
                <ListItemText ><Typography className={classes.menutext}>All Employee</Typography></ListItemText>
               </ListItem>
              </Link>

           <Link to="/department">
               <ListItem button   selected={currentTab("/department")}>
                 <ListItemIcon><Layers className={classes.sidebarIcons} /></ListItemIcon>
                  <ListItemText ><Typography className={classes.menutext}>Department</Typography></ListItemText>
               </ListItem>
           </Link>
            <Link to="/designation">
               <ListItem button   selected={currentTab("/designation")}>
                 <ListItemIcon><Target className={classes.sidebarIcons} /></ListItemIcon>
                  <ListItemText ><Typography className={classes.menutext}>Designation</Typography></ListItemText>
               </ListItem>
            </Link>
         </List>
      </Collapse>



      <ListItem button onClick={handleOpenContent} className='mt-3'>
                  <ListItemIcon><User className={classes.sidebarIcons} /></ListItemIcon>
                  <ListItemText ><Typography className={classes.menutext}>Content</Typography></ListItemText>
                  {openContentCollapse ? <ExpandLess className={classes.direc} /> : <ExpandMore className={classes.direc} />}
      </ListItem>
      <Collapse in={openContentCollapse} timeout="auto" unmountOnExit>
         <List component="div" disablePadding className={classes.collapseList}>
              <Link to="/content/create">
               <ListItem button   selected={currentTab("/content/create")}>
                 <ListItemIcon><Edit className={classes.sidebarIcons} /></ListItemIcon>
                <ListItemText ><Typography className={classes.menutext}>Write Blog</Typography></ListItemText>
               </ListItem>
              </Link>

              <Link to="/content/blogs">
               <ListItem button   selected={currentTab("/content/blogs")}>
                 <ListItemIcon><BookOpen className={classes.sidebarIcons} /></ListItemIcon>
                <ListItemText ><Typography className={classes.menutext}>All Blogs</Typography></ListItemText>
               </ListItem>
               </Link>

              <Link to="/categories">
               <ListItem button   selected={currentTab("/categories")}>
                 <ListItemIcon><Hash className={classes.sidebarIcons} /></ListItemIcon>
                <ListItemText ><Typography className={classes.menutext}>Categories</Typography></ListItemText>
               </ListItem>
               </Link>

              <Link to="/domains">
               <ListItem button   selected={currentTab("/domains")}>
                 <ListItemIcon><Globe className={classes.sidebarIcons} /></ListItemIcon>
                <ListItemText ><Typography className={classes.menutext}>Domains</Typography></ListItemText>
               </ListItem>
              </Link>
         </List>
      </Collapse>

      <Link to="/contact">
      <ListItem button   selected={currentTab("/contact")}>
         <ListItemIcon><Mail className={classes.sidebarIcons} /></ListItemIcon>
        <ListItemText ><Typography className={classes.menutext}>Contacts</Typography></ListItemText>
      </ListItem>
      </Link>

      <Link to="/activities">
      <ListItem button   selected={currentTab("/activities")}>
       <ListItemIcon><Zap className={classes.sidebarIcons} /></ListItemIcon>
         <ListItemText ><Typography className={classes.menutext}>Activities</Typography></ListItemText>
      </ListItem>
      </Link>

      </List>
    </Scrollbar>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
         {children}
      </main>
    </div>
  );
}

export default SideDrawer;
