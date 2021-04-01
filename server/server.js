const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const employeeRouter = require("./routers/employee_router");
const projectRouter = require("./routers/project_router");
const departmentRouter = require("./routers/department_router");
const taskRouter = require("./routers/task_router");
const holidayRouter = require("./routers/holiday_router");
const eventRouter = require("./routers/event_router");
const designationRouter = require("./routers/designation_router");
const leaveTypeRouter = require("./routers/leave_router");
const leaveRequestRouter = require("./routers/leave_request_router");
const jobApplicantRouter = require("./routers/job_apply_router");
const jobManageRouter  = require("./routers/job_router");


app.use(cors({origin: "http://localhost:3000"}))
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use("/api", employeeRouter);
app.use("/api", projectRouter);
app.use("/api", departmentRouter);
app.use("/api", taskRouter);
app.use("/api", holidayRouter);
app.use("/api", eventRouter);
app.use("/api", designationRouter);
app.use("/api", leaveTypeRouter);
app.use("/api", leaveRequestRouter);
app.use("/api", jobApplicantRouter);
app.use("/api", jobManageRouter);



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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
