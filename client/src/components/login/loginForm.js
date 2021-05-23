import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  PersonOutlineOutlined,
  HttpsOutlined
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { signIn, authenticate } from '../../actions/auth';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    form: {
      padding: '35px 5px 70px 5px',
      margin: '5px',
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      borderRadius: '8px',
      opacity: 1,
    },
  root:{
      display: 'table',
      backgroundImage: 'url(/images/Bg.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
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
  button: {
    background: '#6387ED 0% 0% no-repeat padding-box',
    borderRadius: '8px',
    opacity: 1,
    width: '100%',
    fontWeight: '500',
    height: '49px',
    textTransform: 'none',
    color: 'white',
    '&:hover': {
      fontWeight: '500',
      background: '#6387ED 0% 0% no-repeat padding-box',
      color: 'white',
    },
  },

    loginTextField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        background: 'white',
      },
      '& .MuiOutlinedInput-adornedEnd': {
        background: 'white',
      },
      '& .MuiOutlinedInput-adornedStart': {
        background: 'white',
      },
      opacity: 1,
    },
    textfieldIcon: {
      opacity: 0.2,
      fontSize: '21px',
    },
  alertCard:{
    height:"40px"
  }
});



const LoginForm = () => {
  const classes = useStyles();
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
      }
  }

 const handleSubmit = (e) => {
   e.preventDefault()
   setLogin({...login, isLoading:true })
   signIn({ email: login.credentials.email, password: login.credentials.password })
     .then((value) => {
         authenticate(value, () => {
           window.location.href="/dashboard"
           setLogin({...login, isLoading:false, success: value.message })
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
                      <div className={classes.form}>
                      <form onSubmit={handleSubmit}>
                      <div className={classes.alertCard}>
                      {login.success && <Alert severity="success">{login.success}</Alert>}
                      {login.error && <Alert severity="error">{login.error}</Alert>}
                      </div>
                      <br />
                      <Grid container justify="center" spacing={3}>
                      <Grid xs={10} sm={12} md={10} item>
                      <TextField
                      type="text"
                      variant="outlined"

                      className={classes.loginTextField}
                      fullWidth
                      InputProps={{
                      startAdornment: (
                      <InputAdornment position="start">
                      <PersonOutlineOutlined
                      className={classes.textfieldIcon}
                      />
                      </InputAdornment>
                      ),
                      }}
                      placeholder="Email"
                      disabled={login.isLoading}
                      onChange={handleChange("email")}
                      value={login.credentials.email} />
                      </Grid>
                      <Grid xs={10} sm={12} md={10} item>
                      <TextField
                      type="password"
                      variant="outlined"
                      fullWidth
                      placeholder="Password"
                      className={classes.loginTextField}
                      InputProps={{
                      startAdornment: (
                      <InputAdornment position="start">
                      <HttpsOutlined
                      className={classes.textfieldIcon}
                      />
                      </InputAdornment>
                      ),
                      }}
                      disabled={login.isLoading}
                      onChange={handleChange("password")}
                      value={login.credentials.password} />
                      </Grid>
                      </Grid>
                      <br />
                      <Grid container justify='center'>
                      <Grid item sm={10} md={10} xs={10}>
                      <Button
                      className={classes.button}
                      classes={{ disabled: classes.disabledButton }}
                      type="submit"
                      disabled={login.isLoading}>
                      {login.isLoading? 'Submitting' : 'LOGIN TO CONTINUE'}
                      </Button>
                      </Grid>
                      </Grid>
                      <br />
                      <Grid container justify='center'>
                      <Typography variant="body1">
                      Forget password
                      </Typography>
                      </Grid>
                      </form>
                      </div>
                    </Grid>
                 </Grid>
              </div>
            </div>
          </div>
         </>
}

export default LoginForm;
