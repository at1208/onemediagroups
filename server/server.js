const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = require("./service").app;

const server = require("./service").server;
require("dotenv").config();
require("./runScript");

const employeeRouter = require("./routers/employee_router");
const projectRouter = require("./routers/project_router");
const departmentRouter = require("./routers/department_router");
const taskRouter = require("./routers/task_router");
const designationRouter = require("./routers/designation_router");
const channelRouter = require("./routers/channel_router");
const channelChatRouter = require("./routers/channel_chat_router");
const categoryRouter = require("./routers/category_router");
const blogRouter = require("./routers/blog_router");
const domainRouter = require("./routers/domain_router");
const bloguserRouter = require("./routers/bloguser_router");
const uploadRouter = require("./routers/upload_file_router");
const dashboardRouter = require("./routers/dashboard_router");
const notificationRouter = require("./routers/notification_router");
const privateChatRouter = require("./routers/private_chat_router");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://cms.readifly.com",
      "https://www.cms.readifly.com",
      "https://www.travlojournal.com",
      "https://www.fashiofly.com",
      "https://www.elitegamezone.com",
      "https://www.scientifly.com",
      "https://www.vedifly.com",
      "https://www.artoftalk.in",
      "https://www.broocode.com",
      "https://www.99chill.com",
      "https://readifly.netlify.app",
    ],
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", employeeRouter);
app.use("/api", projectRouter);
app.use("/api", departmentRouter);
app.use("/api", taskRouter);
app.use("/api", designationRouter);
app.use("/api", channelRouter);
app.use("/api", channelChatRouter);
app.use("/api", categoryRouter);
app.use("/api", blogRouter);
app.use("/api", domainRouter);
app.use("/api", bloguserRouter);
app.use("/api", uploadRouter);
app.use("/api", dashboardRouter);
app.use("/api", notificationRouter);
app.use("/api", privateChatRouter);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err, "mongo_error");
  });

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
