import React, { useEffect, useState } from "react";
import { getSalaryStructure } from "../../actions/payroll";
import { getCookie } from "../../actions/auth";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PayslipContainer from "./PayslipContainer";
import ReimbursementContainer from "./ReimbursementContainer";
import EPFContainer from "./EPFContainer";

const useStyles = makeStyles((theme) => ({
  greeting: {
    fontSize: "30px",
    lineHeight: "10px",
  },
  subheading: {
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "10px",
  },
  container: {
    margin: "40px 0px 0px 0px",
  },
}));

export default function Home() {
  const [salaryDetails, setSalaryDetails] = useState({});
  const token = getCookie("token");
  const classes = useStyles();

  useEffect(async () => {
    let result = await getSalaryStructure(token);
    setSalaryDetails(result);
  }, []);

  return (
    <>
      <h1 className={classes.greeting}>
        Welcome {salaryDetails?.employee?.full_name?.split(" ")[0]}!
      </h1>
      <h2 className={classes.subheading}>
        {salaryDetails?.employee?.designation?.name || "unknown designation "}
        at One Media Groups
      </h2>
      <div className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <PayslipContainer />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <ReimbursementContainer />
          </Grid>
        </Grid>
        <br />
        <EPFContainer />
      </div>
    </>
  );
}
