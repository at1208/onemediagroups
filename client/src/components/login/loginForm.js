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
    padding:"20px 7px 20px 7px",
    margin:"5px",
    minHeight:"300px"
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
  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    width:"100%",
    color:"white",
    fontWeight:800,
    height:"40px",
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  },
  alertCard:{
    height:"40px"
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
                <Grid item xs={12} sm={6} md={4}>
                 <Card  className={classes.form}>
                   <div className={classes.alertCard}>
                     {login.success && <Alert severity="success">{login.success}</Alert>}
                     {login.error && <Alert severity="error">{login.error}</Alert>}
                   </div>
                   <br />
                   <form onSubmit={handleSubmit}>
                    <Grid container justify="center" spacing={3}>
                      <Grid xs={10} sm={12} md={10} item>
                        <TextField
                         type="text"
                         variant="outlined"
                         fullWidth
                         size="small"
                         label="Email"
                         disabled={login.isLoading}
                         onChange={handleChange("email")}
                         value={login.credentials.email} />
                      </Grid>
                      <Grid xs={10} sm={12} md={10} item>
                        <TextField
                         type="password"
                         variant="outlined"
                         fullWidth
                         size="small"
                         label="Password"
                         disabled={login.isLoading}
                         onChange={handleChange("password")}
                         value={login.credentials.password} />
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container justify='center'>
                      <Grid item sm={5} md={5} xs={10}>
                        <Button
                         className={classes.button}
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
