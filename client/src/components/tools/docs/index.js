import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Typography, Button } from "@material-ui/core";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getDomains } from "../../../actions/domain";
import moment from "moment";
import { getCookie, isAuth, setLocalStorage } from "../../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {},
  field: {
    backgroundColor: "white",
  },
  documentedBy: {
    margin: "50px 0px 0px 0px",
  },
  topHeading: {
    lineHeight: "0px",
    textAlign: "center",
  },
  domainUrl: {
    fontWeight: "500",
    textAlign: "center",
    marginLeft: "10px",
    fontSize: "14px",
  },
  docRoot: {
    backgroundColor: "white",
    padding: "15px",
  },
  key: {
    width: "150px",
    padding: "5px",
    fontSize: "13px",
  },
  table: {
    width: "100%",
  },
  value: {
    padding: "5px 5px 5px 10px",
    fontSize: "13px",
  },
  domain: {
    "&  .MuiAutocomplete-inputRoot": {
      height: "40px",
      backgroundColor: "white",
      padding: "10px",
    },
  },
  listTypeStyle: {
    padding: "0px 0px 0px 23px",
  },
  button: {
    background: "#6387ED 0% 0% no-repeat padding-box",
    borderRadius: "8px",
    opacity: 1,
    // width: '',
    fontWeight: "500",
    height: "49px",
    textTransform: "none",
    color: "white",
    "&:hover": {
      fontWeight: "500",
      background: "#6387ED 0% 0% no-repeat padding-box",
      color: "white",
    },
  },
  buttonArea: {
    textAlign: "center",
    margin: "20px",
  },
}));

export default function Docs() {
  const token = getCookie("token");
  const [domainList, setDomainList] = useState([]);
  const [state, setState] = useState({
    domain: "",
    title: "",
    primary: [],
    secondary: [],
    note: "",
    competitors: [],
  });
  const classes = useStyles();
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);
  const { domain, title, primary, secondary, note, competitors } = state || {
    domain: "",
    title: "",
    primary: [],
    secondary: [],
    note: "",
    competitors: [],
  };

  const handleChange = (e, name) => {
    if (name === "title") {
      setState({
        ...state,
        title: e.target.value,
      });
    } else if (name === "primary") {
      setState({
        ...state,
        primary: handleKeywords(e.target.value),
      });
    } else if (name === "secondary") {
      setState({
        ...state,
        secondary: handleKeywords(e.target.value),
      });
    } else if (name === "note") {
      setState({
        ...state,
        note: e.target.value,
      });
    } else if (name === "competitors") {
      setState({
        ...state,
        competitors: handleKeywords(e.target.value),
      });
    }
  };

  useEffect(() => {
    getDomains(token)
      .then((response) => {
        setDomainList(response);
      })
      .catch((err) => {
        console.log(err);
      });
    let localStorageState = JSON.parse(localStorage.getItem("keywordDoc"));
    setState(localStorageState ? localStorageState : state);
  }, []);

  useEffect(() => {
    setLocalStorage("keywordDoc", state);
  }, [state]);

  const handleKeywords = (keys) => {
    let listOfKeywords = keys.split(",");
    let sanitizedKeywords = [];
    for (var keyword of listOfKeywords) {
      sanitizedKeywords.push(keyword);
    }
    return sanitizedKeywords;
  };

  const handleExportWithFunction = (event) => {
    savePDF(contentArea.current, { paperSize: "A4", fileName: "aman" });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Keyword Documentation</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Autocomplete
                onChange={(e, val) => {
                  if (val) {
                    setState({ ...state, domain: val });
                  }
                }}
                closeIcon={<></>}
                value={domain || {}}
                size="small"
                options={domainList || []}
                className={classes.domain}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Domain" variant="outlined" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                fullWidth
                value={title}
                className={classes.field}
                onChange={(e) => handleChange(e, "title")}
                multiline
                variant="outlined"
                label="Title of the blog"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                fullWidth
                multiline
                value={primary}
                className={classes.field}
                rows={3}
                onChange={(e) => handleChange(e, "primary")}
                placeholder="Please add comma after a every keyword"
                maxRows={10}
                variant="outlined"
                label="Primary keywords"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                fullWidth
                multiline
                value={secondary}
                className={classes.field}
                rows={5}
                onChange={(e) => handleChange(e, "secondary")}
                placeholder="Please add comma after a every keyword"
                maxRows={10}
                variant="outlined"
                label="Secondary keywords"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={note}
                className={classes.field}
                onChange={(e) => handleChange(e, "note")}
                maxRows={10}
                variant="outlined"
                label="Note"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                fullWidth
                className={classes.field}
                multiline
                value={competitors}
                rows={3}
                onChange={(e) => handleChange(e, "competitors")}
                placeholder="Please add comma after a every link"
                maxRows={5}
                variant="outlined"
                label="Competitor links"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <PDFExport ref={pdfExportComponent} paperSize="A4">
            <div ref={contentArea}>
              <div className={classes.docRoot}>
                <h1 className={classes.topHeading}>ONE MEDIA GROUPS</h1>
                <div className={classes.domainUrl}>{domain && domain.url}</div>
                <br />
                <table border="1ps" className={classes.table}>
                  <tbody>
                    <tr>
                      <td className={classes.key}>Title</td>
                      <td className={classes.value}>{title}</td>
                    </tr>
                    <tr>
                      <td className={classes.key}>Primary Keywords</td>
                      <td className={classes.value}>
                        <ol className={classes.listTypeStyle}>
                          {primary.map((keyword) => {
                            return <li>{keyword}</li>;
                          })}
                        </ol>
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.key}>Secondary Keywords</td>
                      <td className={classes.value}>
                        <ol className={classes.listTypeStyle}>
                          {secondary.map((keyword) => {
                            return <li>{keyword}</li>;
                          })}
                        </ol>
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.key}>Note</td>
                      <td className={classes.value}>{note}</td>
                    </tr>
                    <tr>
                      <td className={classes.key}>Competitor Links</td>
                      <td className={classes.value}>
                        <ol className={classes.listTypeStyle}>
                          {competitors.map((keyword) => {
                            return (
                              <li>
                                <a
                                  href={keyword}
                                  style={{ color: "dodgerblue" }}
                                >
                                  {keyword}
                                </a>
                              </li>
                            );
                          })}
                        </ol>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={classes.documentedBy}>
                  <div>Documented By - {isAuth() && isAuth().full_name}</div>
                  <div>Email - {isAuth() && isAuth().email}</div>
                  <div>
                    Date - {moment(new Date()).format("h:mm a, Do MMM Y")}
                  </div>
                </div>
              </div>
            </div>
          </PDFExport>
        </Grid>
      </Grid>

      <div className={classes.buttonArea}>
        <Button className={classes.button} Click={handleExportWithFunction}>
          Download as PDF
        </Button>
      </div>
    </div>
  );
}
