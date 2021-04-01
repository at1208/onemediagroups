import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { acceptInvitation, signIn, authenticate } from '../../actions/auth';

const useStyles = makeStyles({
  form:{
    padding:"30px 7px 30px 7px",
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


const Onboard = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();

  const { token } = match.params;
  const [user, setUser] = React.useState({
    data:"",
    token:"",
    error:"",
    success:"",
    isLoading:false,
    password:""
  });

  React.useEffect(() => {
    if(token){
        setUser({...user, data:jwt.decode(token), token})
       }
  }, [match])

 const handleChange = (e) => {
    setUser({...user, password: e.target.value })
 }

 const handleSubmit = (e) => {
     e.preventDefault();
     acceptInvitation(user)
       .then((value) => {
           signIn({ email: user.data.email, password: user.password })
             .then(response => {
                authenticate(response, () => {
                  history.push("/dashboard")
                })
             })
             .catch((err) => {
               console.log(err)
             })
       })
       .catch((err) => {
         console.log(err)
       })
 }


  return <>
            <div className={classes.root}>
              <div className={classes.middle}>
                <div className={classes.inner}>
                <Grid
                  container
                  justify="center">
                   <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" className={classes.form}>
                       <Typography align='center' variant="h5">Hi {user && user.data.first_name}, Welcome you onboard</Typography>
                        <br />
                        <form onSubmit={handleSubmit}>
                         <Grid container justify='center'>
                           <Grid item sm={6} md={9} xs={12}>
                           <TextField
                            type="text"
                            disabled={true}
                            variant="outlined"
                            value={user.data.email}
                            fullWidth
                            size="small"
                            label="Email"
                           />
                           <br /><br />
                           <TextField
                            type="password"
                            variant="outlined"
                            onChange={handleChange}
                            value={user.data.password}
                            fullWidth
                            inputProps={{
                              autocomplete: 'password',
                              form: {
                                autocomplete: 'off',
                              },
                            }}
                            size="small"
                            label="Create password"
                           />
                            <br /><br />
                             <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              type="submit">Activate account</Button>
                           </Grid>
                          </Grid>
                          <br />
                        </form>
                       </Card>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
         </>
}

export default withRouter(Onboard);
