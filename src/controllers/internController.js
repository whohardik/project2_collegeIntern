const CollegeModel = require("../models/collegeModel")
const InternModel = require("../models/internModel")
const validator = require("email-validator")

//--------------------Handler For Creating College-----------------------------//
const createIntern = async function (req, res){
    try{
        let data = req.body

        if(Object.keys(data).length == 0){
            return res.status(400).send({
             status: false,
             msg : "Please provide the input"
            })
         }

         if ((typeof(data.name) != "string") || !data.name.match(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)) {
            return res.status(400).send({
                status: false,
                msg: "Intern Name is Missing or should contain only lowercase alphabets"
            })
        }
        if ((typeof(data.email) != "string")) {
            return res.status(400).send({
                status: false,
                msg: "Email is Missing or has invalid input"
            })
        }
        if (!validator.validate(data.email)) {
            return res.status(400).send({
                status: false,
                msg: "Email-Id is invalid"
            })
        }
        //Checks For Unique Email Id
        let checkEmail = await InternModel.findOne({ email: data.email })
        if (checkEmail) {
            return res.status(400).send({
                status: false,
                msg: "Email Id already Registred"
            })
        }

        if ((typeof(data.collegeName) != "string")) {
            return res.status(400).send({
                status: false,
                msg: "College Name is Missing or has invalid input"
            })
        }
        let college = await CollegeModel.findOne({name : data.collegeName})
        if(!college){
           return res.status(400).send({
                status : false,
                msg : "Enter a valid collegeName"
            })
        }

        if((typeof(data.mobile) != "string") || !data.mobile.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/)){
          return  res.status(400).send({
                status : false,
                msg : "Not a valid Mobile Number"  
            })
        }
        let number =  await InternModel.findOne({mobile : data.mobile})
        if(number){
            return res.status(400).send({
                status: false,
                msg: "Number already Registred"
            }) 
        }
      
       
      let query = {
        name : data.name,
        email : data.email,
        mobile : data.mobile,
        collegeId : college._id
      }
      console.log(typeof(data.isDeleted) != "undefined")
      if(typeof(data.isDeleted) != "undefined" && typeof(data.isDeleted) != "boolean"){
        return res.status(400).send({
            status : false,
            msg : "Incorrect input for isDeleted key"
        })  
   }
    (typeof(data.isDeleted) == "undefined") ? query.isDeleted = false : query.isDeleted = data.isDeleted
       console.log(query)
    let savedData = await InternModel.create(query)
    res.status(201).send({
        status : true,
        data : savedData
    })
    

    }
    catch(err){
        console.log("Error is From login :", err.message)
        res.status(500).send({
            status : false,
            msg : err.message
        })
    }
} 

module.exports.createIntern =createIntern