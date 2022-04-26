import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { getSalaryStructure } from "../../actions/payroll";
import { getCookie } from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import { default as NumberFormat } from "react-number-format";
import { withRouter, useHistory } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px",
    position: "relative",
  },
  table: {
    width: "100%",
  },
  td: {
    fontSize: "15px",
    fontWeight: "400",
    width: "50%",
    color: "#5F5C6A",
    padding: "10px 0px 10px 0px",
  },

  th: {
    textAlign: "left",
    padding: "10px 0px 10px 0px",
  },
  val: {
    fontSize: "15px",
    fontWeight: "500",
    width: "50%",
    color: "black",
    padding: "10px 0px 10px 0px",
  },
  heading: {
    marginTop: "40px",
    fontSize: "20px",
    color: "#5F5C6A",
    lineHeight: "0px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
    color: "black",
    lineHeight: "17px",
  },
  subtitle: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#5F5C6A",
    lineHeight: "15px",
  },
  box: {
    display: "flex",
    gap: "30px",
  },
  innerBox1: {
    borderColor: "#2DCC9E",
    padding: "10px",
    borderLeft: "4px solid",
    paddingRight: "25px",
    paddingLeft: "15px",
  },
  innerBox2: {
    borderColor: "#47B2FF",
    padding: "10px",
    borderLeft: "4px solid",
    paddingRight: "25px",
    paddingLeft: "15px",
  },
  innerBox3: {
    borderColor: "#FFD163",
    padding: "10px",
    borderLeft: "4px solid",
    paddingRight: "25px",
    paddingLeft: "15px",
  },
  text1: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#5F5C6A",
    lineHeight: "15px",
    marginBottom: "10px",
  },
  text2: {
    fontSize: "16px",
    fontWeight: "500",
    color: "black",
    lineHeight: "15px",
  },
  card: {
    paddingTop: "30px",
    display: "flex",
  },
  navBar: {
    zIndex: 10000,
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    left: "-22px",
    right: "-30px",
    top: "-22px",
    padding: "10px",
    backgroundColor: "white",
  },
  navBtn: {
    color: "#454351",
    lineHeight: "20px",
    fontSize: "18px",
    backgroundColor: "white",
    border: "0px solid white",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  box1: {
    display: "flex",
    gap: "20px",
    backgroundColor: "white",
  },
  box2: {
    display: "flex",
    position: "absolute",
    top: "50px",
    right: "60px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function SalaryStructure({ match: { path } }) {
  const [salaryDetails, setSalaryDetails] = useState();
  const [toggle, setToggle] = useState("Mine");
  const [state, setState] = useState();
  const history = useHistory();
  const [monthlyCTC, setMonthlyCTC] = useState();
  const token = getCookie("token");

  useEffect(async () => {
    let result = await getSalaryStructure(token);
    setSalaryDetails(result);
  }, []);
  const classes = useStyles();

  const calculateBreakups = (amount) => {
    return amount
      ? amount
          .map((item, i) => {
            return item.amount;
          })
          .reduce((a, b) => a + b)
      : null;
  };

  const calculate = () => {
    let totalEarnings = calculateBreakups(salaryDetails?.earnings);
    let totalReimbursement = calculateBreakups(salaryDetails?.reimbursements);
    let totalDeductions = calculateBreakups(salaryDetails?.deductions);

    return {
      totalEarnings,
      totalDeductions,
      totalReimbursement,
      monthlyCTC: totalEarnings + totalReimbursement + totalDeductions,
      yearlyCTC: (totalEarnings + totalReimbursement + totalDeductions) * 12,
    };
  };

  useEffect(() => {
    if (salaryDetails) {
      setState(calculate());
    }
  }, [salaryDetails]);

  function selectedRoute(pathname) {
    if (pathname === path) {
      return { borderBottom: "4px solid #208EFF", fontWeight: 600 };
    } else {
      return;
    }
  }

  const handleChange = (event) => {
    setToggle(event.target.value);
    if (event.target.value == "Mine") {
      history.push("/payroll/salary-details");
    } else if (event.target.value == "Others") {
      history.push("/payroll/all");
    }
  };

  function SalaryStructureComponent() {
    return (
      <>
        <Grid container className={classes.card} justifyContent="center">
          <Grid item xs={12} sm={2} md={2} lg={2}>
            <Grid container justifyContent="center">
              <Grid item>
                <PieChart
                  style={{ width: "100px" }}
                  radius={50}
                  totalValue={100}
                  lineWidth={40}
                  data={[
                    {
                      title: "Earnings",
                      value: (state?.totalEarnings / state?.monthlyCTC) * 100,
                      color: "#2DCC9E",
                    },
                    {
                      title: "Reimbursements",
                      value:
                        (state?.totalReimbursement / state?.monthlyCTC) * 100,
                      color: "#47B2FF",
                    },
                    {
                      title: "Deductions",
                      value: (state?.totalDeductions / state?.monthlyCTC) * 100,
                      color: "#FFD163",
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <h2 className={classes.title}>
              Monthly CTC:{" "}
              <NumberFormat
                value={state?.monthlyCTC.toFixed(2)}
                displayType={"text"}
                thousandsGroupStyle="lakh"
                prefix={"₹"}
                thousandSeparator={true}
              />
            </h2>
            <h2 className={classes.subtitle}>
              Yearly CTC:{" "}
              <NumberFormat
                thousandsGroupStyle="lakh"
                value={state?.yearlyCTC.toFixed(2)}
                displayType={"text"}
                prefix={"₹"}
                thousandSeparator={true}
              />
            </h2>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div className={classes.innerBox1}>
                  <div className={classes.text1}>Earnings</div>
                  <div className={classes.text2}>
                    <NumberFormat
                      value={state?.totalEarnings.toFixed(2)}
                      displayType={"text"}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      thousandSeparator={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div className={classes.innerBox2}>
                  <div className={classes.text1}>Reimbursements</div>
                  <div className={classes.text2}>
                    <NumberFormat
                      value={state?.totalReimbursement.toFixed(2)}
                      displayType={"text"}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      thousandSeparator={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div className={classes.innerBox3}>
                  <div className={classes.text1}>Deductions</div>
                  <div className={classes.text2}>
                    <NumberFormat
                      value={state?.totalDeductions.toFixed(2)}
                      displayType={"text"}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      thousandSeparator={true}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <table className={classes.table}>
          <h2 className={classes.heading}>Earnings</h2>
          {salaryDetails &&
            salaryDetails.earnings &&
            salaryDetails.earnings.length > 0 &&
            salaryDetails.earnings.map((item, i) => {
              return (
                <tr className={classes.tr}>
                  <td className={classes.td}>{item?.earning_type}</td>
                  <td className={classes.val}>
                    <NumberFormat
                      value={item?.amount.toFixed(2)}
                      displayType={"text"}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      thousandSeparator={true}
                    />
                  </td>
                </tr>
              );
            })}

          <h2 className={classes.heading}>Reimbursements</h2>
          {salaryDetails &&
            salaryDetails.reimbursements &&
            salaryDetails.reimbursements.length > 0 &&
            salaryDetails.reimbursements.map((item, i) => {
              return (
                <tr className={classes.tr}>
                  <td className={classes.td}>{item?.reimbursement_type}</td>
                  <td className={classes.val}>
                    <NumberFormat
                      value={item?.amount.toFixed(2)}
                      displayType={"text"}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      thousandSeparator={true}
                    />
                  </td>
                </tr>
              );
            })}
          <h2 className={classes.heading}>Deductions</h2>
          {salaryDetails &&
            salaryDetails.deductions &&
            salaryDetails.deductions.length > 0 &&
            salaryDetails.deductions.map((item, i) => {
              return (
                <tr className={classes.tr}>
                  <td className={classes.td}>{item?.deduction_type}</td>
                  <td className={classes.val}>
                    <NumberFormat
                      value={item?.amount.toFixed(2)}
                      displayType={"text"}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      thousandSeparator={true}
                    />
                  </td>
                </tr>
              );
            })}
        </table>
      </>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.navBar}>
        <Grid container>
          <Grid item className={classes.box1} xs={12} sm={10} md={10} lg={10}>
            <button
              className={classes.navBtn}
              style={selectedRoute("/payroll/salary-details")}
            >
              Salary Structure
            </button>
            <button
              className={classes.navBtn}
              style={selectedRoute("/payroll/payslip")}
            >
              Payslips
            </button>
            <button
              className={classes.navBtn}
              style={selectedRoute("/payroll/epf-contribution")}
            >
              EPF contributions
            </button>
          </Grid>
        </Grid>
      </div>
      {/*<Grid item className={classes.box2} xs={12} sm={2} md={2} lg={2}>
        <Box>
          <FormControl fullWidth>
            <Select
              className={classes.menuList}
              labelId="demo-simple-select-label"
              value={toggle}
              onChange={handleChange}
            >
              <MenuItem value={"Mine"}>Mine</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>*/}
      <SalaryStructureComponent />
    </div>
  );
}

export default withRouter(SalaryStructure);
