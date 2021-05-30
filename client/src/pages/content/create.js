import React, { useMemo } from 'react';
import styled from "styled-components/macro";
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Button,Typography, TextField, Avatar } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createBlog  } from '../../actions/blog';
import { getCookie, removeLocalStorage  } from '../../actions/auth';
import { getCategories  } from '../../actions/category';
import { getDomains  } from '../../actions/domain';
import { Alert } from '@material-ui/lab';
import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import { uploadFile } from '../../actions/upload'
import SnackBar from '../../components/core/snackbar'
const CloudUpload = styled(MuiCloudUpload)(spacing);

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"30px 10px 30px 10px",
   },
   titleInput:{
     backgroundColor:"white",
     margin:"0px 0px 20px 0px"
   },
   button:{
     textTransform:"none",
     marginTop:"5px"
   },
   featureRoot:{
     height:"100%",
     maxHeight:"250px",
     width:"100%"
   },
   editor:{
     "& .ql-editor":{
        minHeight:"50vh",
        letterSpacing: "-0.003em",
        lineHeight: "32px",
        marginTop: "2em",
        fontSize: "21px",
        marginBottom: "-0.46em",
        fontFamily: `charter, Georgia, Cambria, "Times New Roman", Times, serif`,
        fontStyle: "normal",
        wordBreak: "break-word",
        color: "rgba(41, 41, 41, 1)",
        fontWeight: "400"
     }
   },
   editorContainer:{
     minHeight:"70vh"
   }
}));


const CreateBlog = () => {
  const classes = useStyles();
  const token = getCookie("token");
  const blogBodyFromLS = () => {
   if (localStorage.getItem("blog")) {
    return JSON.parse(localStorage.getItem("blog"));
  } else {
    return "";
  }
};

const blogTitleFromLS = () => {
 if (localStorage.getItem("title")) {
  return JSON.parse(localStorage.getItem("title"));
} else {
  return "";
}
};


  const [blog, setBlog] = React.useState({
       title:blogTitleFromLS(),
       body:blogBodyFromLS(),
       categories:[],
       domain:"",
       featureImg:"",
       isLoading:false,
       successMsg:"",
       successStatus:false,
       errorMsg:"",
       errorStatus:false
  });


  const [categories, setCategories] = React.useState();
  const [domains, setDomains] = React.useState();

  React.useEffect(() => {
     getCategories(token)
       .then(response => {
         setCategories(response)
       })
       .catch(err => {
         console.log(err)
       })

       getDomains(token)
       .then(response => {
         setDomains(response)
       })
       .catch(err => {
         console.log(err)
       })
  }, [])

  React.useEffect(() => {
     getCategories(blog.domain, token)
       .then(response => {
         setCategories(response)
       })
       .catch(err => {
         console.log(err)
       })
  }, [blog.domain])


  const handleChange = (name) => async (e) => {
      switch (name) {
        case "title":
        localStorage.setItem("title", JSON.stringify(e.target.value));
          setBlog({...blog, title: e.target.value })
          break;
        case "body":
          localStorage.setItem("blog", JSON.stringify(e));
          setBlog({...blog, body: e})
          break;
        case "featureImg":
        let file = e.target.files[0];
        let formData = new FormData();
            formData.append('upload', file);
            let url = await apiPostNewsImage(formData);
          setBlog({...blog, featureImg: url})
          break;
        default:
      }
  }


 const handleSubmit = (e) => {
   e.preventDefault();
   createBlog(blog, token)
     .then(response => {
       setBlog({...blog,
       errorStatus: false,
       errorMsg:"",
       successStatus:true,
       successMsg: response.message
     })
       removeLocalStorage('blog');
     })
     .catch(err => {
       setBlog({...blog,
         errorStatus: true,
         errorMsg:err,
         successStatus:false,
         successMsg: ""  })

     })
 }


 async function apiPostNewsImage(img) {
      setBlog({...blog, isLoading: true })
       let result = await uploadFile(img, token);
       if(result){
         setBlog({...blog, isLoading: false })
         return result.url
       }
    }

    function imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('upload', file);

            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);

            const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

            // Remove placeholder image
            this.quill.deleteText(range.index, 1);

            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
            this.quill.insertEmbed(range.index, 'image', res);
        };
    }


    const modules = useMemo(() => ({
      toolbar: {
          container: [
              [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'video'],
              ['link', 'image', 'video'],
              ['clean'],
              ['code-block']
          ],
          handlers: {
              image: imageHandler
          }
      }
     }), [])


  return <>
          <DashboardLayout>
           <br />
            <Grid container spacing={6}>
              <Grid item>
                <Typography variant="h5">

                </Typography>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <br /><br />
              {blog.successStatus && <>
                <SnackBar msg={blog.successMsg} status="success" />
              </>
             }
              {blog.errorStatus && <>
                  <SnackBar msg={blog.errorMsg.error} status="error" />
              </>
            }
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={9} sm={9} lg={9}>
                     <div className={classes.editorContainer}>
                      <TextField onChange={handleChange("title")}
                        fullWidth
                        value={blog.title}
                        className={classes.titleInput}
                        size="medium"
                        label="Blog Title"
                        variant="outlined"
                        />
                      <ReactQuill
                        value={blog.body}
                        modules={modules}
                        className={classes.editor}
                        onChange={handleChange("body")}
                       />
                       <br />
                       <Grid container justify='center'>
                         <Grid item>
                           <Button
                             variant="contained"
                             size="large"
                             color="primary"
                             type="submit">
                             Submit
                           </Button>
                         </Grid>
                       </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} lg={3}>
                    <Avatar
                      alt=""
                      src={blog.featureImg}
                      className={classes.featureRoot}
                      variant="square"
                      >
                      Feature Image
                      </Avatar>
                    <input
                      onChange={handleChange("featureImg")}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                        component="span">
                        <CloudUpload mr={1} /> {blog.isLoading?`Uploading ...`:`Upload Feature IMG`}
                      </Button>
                    </label>
                    <br />  <br />

                     <Autocomplete
                        onChange={(event, newValue) => {
                          if(newValue){
                               setBlog({...blog, domain: newValue._id})
                          }
                         }}
                        options={domains}
                        getOptionLabel={(option) => option.name}
                        style={{ width: "100%",background:"white" }}
                        renderInput={(params) => <TextField {...params} label="Domain" variant="outlined"/>}
                      />
                      <br />
                      <Autocomplete
                        multiple
                        disabled={blog.domain.length===0}
                         onChange={(event, newValue) => {
                           if(newValue){
                             setBlog({...blog, categories: newValue.map(item => item._id)})
                           }
                          }}
                         options={categories || ""}
                         getOptionLabel={(option) => option.name}
                         style={{ width: "100%",background:"white"  }}
                         renderInput={(params) => <TextField {...params} label="Category" variant="outlined" value={blog.categories}/>}
                       />
                  </Grid>
                </Grid>
              </form>

          </DashboardLayout>
         </>
}

export default CreateBlog;
