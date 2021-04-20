const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = require("./service").app;
const server = require('./service').server;
require('dotenv').config();

const employeeRouter = require("./routers/employee_router");
const projectRouter = require("./routers/project_router");
const departmentRouter = require("./routers/department_router");
const taskRouter = require("./routers/task_router");
const designationRouter = require("./routers/designation_router");
const channelRouter = require("./routers/channel_router");
const channelChatRouter = require("./routers/channel_chat_router");

app.use(cors({origin: "http://localhost:3000"}));

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use("/api", employeeRouter);
app.use("/api", projectRouter);
app.use("/api", departmentRouter);
app.use("/api", taskRouter);
app.use("/api", designationRouter);
app.use("/api", channelRouter);
app.use("/api", channelChatRouter);

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.log(err, "mongo_error");
    });




const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
