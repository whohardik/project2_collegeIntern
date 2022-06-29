const CollegeModel = require("../models/collegeModel")
const isValidURL = require("valid-url")

//--------------------Handler For Creating College-----------------------------//
const createCollege = async function (req, res){
    try{
        let data = req.body

        if(Object.keys(data).length == 0){
            return res.status(400).send({
             status: false,
             msg : "Please provide the input"
            })
         }

         if ((typeof(data.name) != "string") || !data.name.match(/^[a-z]+$/)) {
            return res.status(400).send({
                status: false,
                msg: "College Name is Missing or should contain only lowercase alphabets"
            })
        }
        let checkName = await CollegeModel.findOne({name : data.name})
        if(checkName && checkName.isDeleted == false){
            return res.status(400).send({
                status : false,
                msg : "College name is already registered"
            })
        }

        if ((typeof(data.fullName) != "string")|| !data.fullName.match(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)){
            return res.status(400).send({
                status: false,
                msg: "College Full Name is Missing or should contain alphabets"
            })
        }

        
        const stringIsAValidUrl = (url) => {
         return (isValidURL.isUri(url)) ? true : false 
        };


        if(typeof(data.logoLink) != "string"){
            return res.status(400).send({
                status : false,
                msg : "Logo Link is missing or has some invalid input"
            })
        }
        else{
            if(!stringIsAValidUrl(data.logoLink))
            return res.status(400).send({
                status : false,
                msg : "LogoLink is not valid"
            })
        }

        if(data.isDeleted){
            if(typeof(data.isDeleted) != "boolean"){
                return res.status(400).send({
                    status :false,
                    msg : "is deleted can either be true or false"
                })
            }
        }

        let savedData = await CollegeModel.create(data)
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

module.exports.createCollege =createCollege