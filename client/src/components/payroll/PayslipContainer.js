import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px 0 rgb(0 0 0 / 5%)",
    padding: "0px 25px",
    border: "1px solid #f5f7ff",
  },
  heading: {
    fontSize: "18px",
  },
}));

export default function PayslipContainer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Your Payslips</h2>
    </div>
  );
}
