import React, { useMemo } from 'react';
import styled from "styled-components/macro";
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Card, Button,Typography, Divider, TextField } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createBlog  } from '../../actions/blog';
import { getCookie, removeLocalStorage  } from '../../actions/auth';
import { getCategories  } from '../../actions/category';
import { getDomains  } from '../../actions/domain';
import { Alert, AlertTitle } from '@material-ui/lab';
import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";
import { spacing } from "@material-ui/system";

const CloudUpload = styled(MuiCloudUpload)(spacing);
const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"30px 10px 30px 10px",
   },
   titleInput:{
     margin:"0px 0px 20px 0px"
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
       featureImg:"https://geeksocean.com",
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


  const handleChange = (name) => (e) => {
      switch (name) {
        case "title":
        localStorage.setItem("title", JSON.stringify(e.target.value));
          setBlog({...blog, title: e.target.value })
          break;
        case "body":
          localStorage.setItem("blog", JSON.stringify(e));
          setBlog({...blog, body: e})
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


 function apiPostNewsImage(img) {
          return 'https://scontent.fdel1-2.fna.fbcdn.net/v/t1.6435-9/88339928_553781082162452_485602196625293312_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PdNmWOFS-J0AX_3f440&_nc_ht=scontent.fdel1-2.fna&oh=1ad2b4a3c414c722c3c9e95636179cd2&oe=60A560DC'
        // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
    }

    function imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('image', file);

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
            <Grid container spacing={6}>
              <Grid item>
                <Typography variant="h5">
                  Write a new blog
                </Typography>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <br /><br />
            <Card className={classes.cardRoot}>
              {blog.successStatus && <>
                <Alert severity="success">
                 {blog.successMsg}
               </Alert>
                <br /><br />
              </>
             }
              {blog.errorStatus && <>
                <Alert severity="error">
                 {blog.errorMsg.error}
              </Alert>
                <br /><br />
              </>
            }
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={9} sm={9} lg={9}>
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
                        onChange={handleChange("body")}
                       />
                       <br />


                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} lg={3}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="contained" color="primary" component="span">
                        <CloudUpload mr={1} /> Upload Feature IMG
                      </Button>
                    </label>
                    <br />  <br />
                    <Autocomplete
                      multiple
                       onChange={(event, newValue) => {
                         if(newValue){
                           setBlog({...blog, categories: newValue.map(item => item._id)})
                         }
                        }}
                       options={categories || ""}
                       getOptionLabel={(option) => option.name}
                       style={{ width: "100%" }}
                       renderInput={(params) => <TextField {...params} label="Category" variant="outlined" value={blog.categories}/>}
                     />
                     <br />
                     <Autocomplete
                        onChange={(event, newValue) => {
                          if(newValue){
                               setBlog({...blog, domain: newValue._id})
                          }
                         }}
                        options={domains}
                        getOptionLabel={(option) => option.name}
                        style={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Domain" variant="outlined"/>}
                      />
                      <br />
                  </Grid>
                </Grid>
              </form>
            </Card>
          </DashboardLayout>
         </>
}

export default CreateBlog;
