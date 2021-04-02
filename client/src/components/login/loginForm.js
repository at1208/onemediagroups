import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { signIn, authenticate } from '../../actions/auth';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  form:{
    padding:"12px 7px 12px 7px",
    margin:"5px"
  },
  login:{
    minWidth:'130px'
  },
  root:{
    display: "table",
    position: "absolute",
    top: 0,
    left: 0,
    height: "90%",
    width: "100%",
  },
  middle:{
    display: "table-cell",
    verticalAlign: "middle"
  },
  inner:{
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  }
});



const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [login, setLogin] = useState({
    credentials:{
      email:"",
      password:""
    },
    isLoading:false,
    error:"",
    success:""
  })

  const handleChange = (type) => (e) => {
      switch (type) {
        case "email":
           setLogin({...login, credentials: {...login.credentials, email: e.target.value}})
          break;
        case "password":
           setLogin({...login, credentials: {...login.credentials, password: e.target.value}})
          break;
        default:
           return;
        ;
      }
  }

 const handleSubmit = (e) => {
   e.preventDefault()
   setLogin({...login, isLoading:true })
   signIn({ email: login.credentials.email, password: login.credentials.password })
     .then((value) => {
       setLogin({...login, isLoading:false, success: value.message })
         authenticate(value, () => {
           window.location.href="/dashboard"
           // history.push("/dashboard")
         })
     })
     .catch((err) => {
       setLogin({...login, isLoading:false, error: err.error })
     })
 }

  return <>
         <div className={classes.root}>
           <div className={classes.middle}>
             <div className={classes.inner}>
             <Grid
               container
               justify="center"
               >
                <Grid item xs={12} sm={6} md={4}

                >
                 <Card variant="outlined" className={classes.form}>
                 {login.success && <Alert severity="success">{login.success}</Alert>}
                 {login.error && <Alert severity="error">{login.error}</Alert>}
                   <br />
                   <form onSubmit={handleSubmit}>
                    <TextField
                     type="text"
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="Email"
                     disabled={login.isLoading}
                     onChange={handleChange("email")}
                     value={login.credentials.email}/>
                    <br /><br />
                    <TextField
                     type="password"
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="Password"
                     disabled={login.isLoading}
                     onChange={handleChange("password")}
                     value={login.credentials.password}/>
                    <br /><br />
                    <Grid container justify='center'>
                      <Grid item sm={6} md={8} xs={12}>
                        <Button
                         variant="contained"
                         color="primary"
                         fullWidth
                         className={classes.login}
                         type="submit"
                         disabled={login.isLoading}>Login</Button>
                      </Grid>
                     </Grid>
                     <br />
                     <Grid container justify='center'>
                       <Typography variant="body1">
                         Forget password
                       </Typography>
                     </Grid>
                   </form>
                    </Card>
                 </Grid>
               </Grid>
             </div>
           </div>
         </div>
         </>
}

export default LoginForm;
