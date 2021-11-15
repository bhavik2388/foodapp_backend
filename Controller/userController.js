const userModel=require('../Models/userModel');

module.exports.getUser=async function getUser(req,res){
   
    let id=req.id;
    let user=await userModel.findById(id);
    if(user){
        return res.json(user);
    }
    else{
        return res.json({
            message:'user not found'
        });
    }
}

// module.exports.postUser=function postUser(req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data reveived successfully",
//         user:req.body
//     })
// };

module.exports.updateUser=async function updateUser(req,res){
    try{
        console.log('req.body-> ',req.body);
        let id = req.params.id;
        let user= await userModel.findById(id);
        let dataToBeUpdated=req.body;
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++) {
                user[keys[i]]=dataToBeUpdated[keys[i]]; 
            }
            const updatedData= await user.save();
            res.json({
                message:"data updated successfully"
            })
        }
        else{
            res.json({
                message:"USER NOT FOUND"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.deleteUser=async function deleteUser(req,res){
    //users={};
    try{
    let id=req.params.id;
    let user = await userModel.findOneAndDelete(id);
    if(!user){
        res.json({
            message:"user not found"
        });
    }
    res.json({
        message:"data deleted.",
        data:user
    });
}
catch(err){
    res.json({
        message:err.message
    });
}
}

module.exports.getallUser=async function getallUser(req,res){
    try{
        res.json("user id by param");
        let users=await userModel.find();
        if(users){
            res.json({
                message:"users retrived",
                data:users
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
};

// function setCookies(req,res){
//     res.setHeader('isLoggedIn',true);
//     res.send('cookie sent');
// }

// function getCookies(req,res){
//     let cookies=req.cookies.isLoggedIn;
//     console.log(cookies);
//     res.send('cookies received');
// }
