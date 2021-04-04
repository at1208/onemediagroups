import React from 'react';
import Drawer from '../drawer';
import Private from '../protectedRoutes/privateRoute';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body:{
          backgroundColor:"rgb(247, 249, 252)"
        },
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
});


const DashboardLayout = ({ children }) => {
  return <>
          <ThemeProvider theme={theme}>
             <CssBaseline />
           </ThemeProvider>
           <Drawer  children={children} />
         </>
}

export default DashboardLayout;
