import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
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
import { signout } from '../../actions/auth';

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
    backgroundColor:"#101531",
    marginRight: 36,
    "&:hover":{
      backgroundColor:"#101531"
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
    padding: theme.spacing(3),
  },
  icons:{
    fontSize:"30px"
  },
  menutext:{
    color:"#e0e0e0",
  },
  collapseList:{
    // backgroundColor:"lightgrey"
  },
  appname:{
    color:"black"
  }
}));

 const SideDrawer = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openEmployeeCollapse, setOpenEmployeeCollapse] = React.useState(true);


  function handleOpenEmployee(){
     setOpenEmployeeCollapse(!openEmployeeCollapse);
  }



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
      <CssBaseline />
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
            <MenuIcon className={classes.menutext} />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.appname}>
            AppName
          </Typography>

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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon className={classes.menutext} /> : <ChevronLeftIcon className={classes.menutext} />}
          </IconButton>
        </div>
        <Divider />


        <List>
          <ListItem button  selected={currentTab("/dashboard")} onClick={() => history.push("/dashboard")}>
            <ListItemIcon><i className="la la-dashboard" style={{ fontSize:"29px" , color:"#e0e0e0" }}></i></ListItemIcon>
            <ListItemText primary="Dashboard" className={classes.menutext} />
          </ListItem>

          <ListItem button  selected={currentTab("/chats")} onClick={() => history.push("/chats")}>
            <ListItemIcon><i className="la la-comments" style={{ fontSize:"29px" , color:"#e0e0e0" }}></i></ListItemIcon>
            <ListItemText primary="Chats" className={classes.menutext}/>
          </ListItem>


          <ListItem button onClick={handleOpenEmployee} className='mt-3'>
                      <ListItemIcon><i className="la la-user" style={{ fontSize:"29px" , color:"#e0e0e0" }}></i></ListItemIcon>
                      <ListItemText primary="Employees" className={classes.menutext} />
                      {openEmployeeCollapse ? <ExpandLess className={classes.menutext} /> : <ExpandMore className={classes.menutext} />}
          </ListItem>
          <Collapse in={openEmployeeCollapse} timeout="auto" unmountOnExit>
             <List component="div" disablePadding className={classes.collapseList}>
                   <ListItem button   selected={currentTab("/all-employees")} onClick={() => history.push("/all-employees")}>
                     <ListItemIcon><i className="la la-users" style={{ fontSize:"26px" , color:"#e0e0e0" }}></i></ListItemIcon>
                     <ListItemText primary='All Employees' className={classes.menutext}/>
                   </ListItem>

                   <ListItem button   selected={currentTab("/department")} onClick={() => history.push("/department")}>
                     <ListItemIcon><i class="las la-building" style={{ fontSize:"26px" , color:"#e0e0e0" }}></i></ListItemIcon>
                     <ListItemText primary='Departments' className={classes.menutext}/>
                   </ListItem>

                   <ListItem button   selected={currentTab("/designation")} onClick={() => history.push("/designation")}>
                     <ListItemIcon><i class="las la-passport" style={{ fontSize:"26px" , color:"#e0e0e0" }}></i></ListItemIcon>
                     <ListItemText primary='Designations' className={classes.menutext}/>
                   </ListItem>

             </List>
          </Collapse>



          <ListItem button   selected={currentTab("/projects")} onClick={() => history.push("/projects")}>
            <ListItemIcon><i className="la la-rocket" style={{ fontSize:"29px" , color:"#e0e0e0" }}></i></ListItemIcon>
            <ListItemText primary="Projects" className={classes.menutext} />
          </ListItem>

          <ListItem button   selected={currentTab("/tasks")} onClick={() => history.push("/tasks")}>
            <ListItemIcon><i className="la la-tasks" style={{ fontSize:"29px" , color:"#e0e0e0" }}></i></ListItemIcon>
            <ListItemText primary="Tasks" className={classes.menutext} />
          </ListItem>

          <ListItem button   selected={currentTab("/contact")} onClick={() => history.push("/contact")}>
            <ListItemIcon><i className="la la-book" style={{ fontSize:"29px" , color:"#e0e0e0" }}></i></ListItemIcon>
            <ListItemText primary="Contacts" className={classes.menutext} />
          </ListItem>


          <ListItem button   selected={currentTab("/activities")} onClick={() => history.push("/activities")}>
            <ListItemIcon> <i className="la la-bell" style={{ fontSize:"29px" , color:"#e0e0e0" }}></i></ListItemIcon>
            <ListItemText primary="Activities" className={classes.menutext} />
          </ListItem>

          <ListItem button    onClick={() => signout(() => window.location.href="/")}>
            <ListItemIcon> </ListItemIcon>
            <ListItemText primary="Signout" className={classes.menutext} />
          </ListItem>
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
