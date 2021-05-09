const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const employeeSchema = mongoose.Schema({
    employee_id : {
        type: String,
        unique:true
    },
    first_name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    last_name: {
        type:String,
        trim:true,
        lowercase:true,
        default:null
    },
    full_name:{
      type:String,
      default:null
    },
    bio:{
      type:String,
      max:200,
      default:null
    },
    username:{
      type:String,
      // trim:true,
      // unique:true,
      default:null
    },
    headshot_url:{
      type:String,
      default:null
    },
    gender:{
        type:String,
        enum:["MALE", "FEMALE"],
        required:true
    },
    role:{
        type:String,
        enum:[
            'EMPLOYEE',
            'ADMIN',
            'CONTRACTOR',
            'INTERN'
        ],
        default:'EMPLOYEE'
    },
    date_of_joining: {
        type: Date,
        required : true
    },
    phone_number:{
        type:String,
        unique:true,
        required:true,
        max:15,
    },
    department: {
        type: ObjectId,
        ref: "Department",
        default:null
    },
    designation:{
        type: ObjectId,
        ref : "Designation",
        default:null
    },
    email:{
        type:String,
        unique:true,
        default:null,
        required:true
    },
    address:{
        type:String,
        default:null
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
    status:{
      type:String,
      enum:['INVITED', 'JOINED', 'LEFT'],
      default:"INVITED"
    },
    password:{
      type:String,
      min:4,
      max:100
    },
    author:{
      type:Boolean,
      default:false
    },
    channels:[{
      type:ObjectId,
      ref:"Channel"
    }],
    del_flag:{
      type:Boolean,
      default:false
    },
    permission:{
      project:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      task:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      channel:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      employee:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      department:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      designation:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      domain:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      blog:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      },
      category:{
        read:{
          type:Boolean,
          default:true
        },
        write:{
          type:Boolean,
          default:false
        },
        update:{
          type:Boolean,
          default:false
        },
        delete:{
          type:Boolean,
          default:false
        }
      }
    }
},{ timestamps:true });

module.exports = mongoose.model('Employee', employeeSchema);
