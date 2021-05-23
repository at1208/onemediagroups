import React from "react";

import {
  Button,
  TextField,
  Typography,
} from "@material-ui/core";



function ResetPassword() {

  return (
    <>
    <Typography component="h1" variant="h4" align="center" gutterBottom>
      Reset Password
    </Typography>
    <Typography component="h2" variant="body1" align="center">
      Enter your email to reset your password
    </Typography>

    <form noValidate  >
      <TextField
        type="email"
        name="email"
        label="Email Address"
        fullWidth
        my={3}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"

      >
        Reset password
      </Button>
    </form>
    </>
  );
}

export default ResetPassword;
