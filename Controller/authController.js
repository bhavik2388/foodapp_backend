const express=require('express');
const userModel=require('../Models/userModel');
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets').JWT_KEY;

module.exports.signup=async function signup(req,res){
    try{
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        // console.log('backend',user);
        res.json({
            message:"user signed up"
            ,data:user
        });
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.login=async function login(req,res){
    try{
        console.log("Hello");
        let data= req.body;
        if(data.email){
            let user =await userModel.findOne({email:data.email});
            if(user)
            {
                if(user.password == data.password)
                {
                    let uid=user['id'];
                    let token=jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true}); 
                    return res.json({
                        message:'User logged in',
                        userDetails:data
                    })
                }
                else{
                    return res.json({
                        message:'password incorrect'
                    })
                }
            }
            else{
                return res.json({
                    message:"user not found"
                })
            }
        }
        else{
            return res.json({
                message:"empty feild"
            })
        }
    }
    catch(err){
        return res.json({message:err.message});

    }
}

module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
    if(roles.includes(req.role)==true){
        next();
    }
    else{
        res.status(401),res.json({
            message:'operation not allowed'
        });
    }
}
}

module.exports.protectRoute=async function protectRoute(req,res,next){
    try{

    let token;
    if(req.cookies.login){
        console.log(req.cookies);
        token=req.cookies.login;
        let payload=jwt.verify(token,JWT_KEY);
        if(payload){
            const user = await userModel.findById(payload.payload);
            req.role = user.role;
            req.id=user.id;
            next();
           
        }

        else{
            const client = req.get('User-Agent');
            if(client.includes("Mozilla")){
                return res.redirect('/login');
            }
            return res.json({
                message:'please login'
            })
        }
    }
    
    else{
        return res.json({
            message:'user not verified'
        })
    }
}

catch(err){
    res.json({
        message:'err.message'
    })
}
}

module.exports.forgetpassword=async function forgetpassword(req,res){
    let {email}=req.body;
    try{
        const user = await userModel.findOne({email:email});
        if(user){
            const resetToken=user.createResetToken();
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
        }
        else{
            return res.json({
                message:"please signup"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.resetpassword=async function resetpassword(req,res){
try{
    const token=req.params.token;
    let {password,confirmPassword}=req.body;
    const user = await userModel.findOne({resetToken: token});
    if(user){
        user.resetPasswordHandler(password, confirmPassword);
        await user.save();
        res.json({
            message:"password changed sucessfully, please login again",
        });
    }
    else{
        res.json({
            message:"user not found"
        });
    }

}
catch(err){
    res.json({
        message:err.message,
    });
}
};

module.exports.logout=async function logout(req,res){
    res.cookie("login"," ",{maxAge:1});
    res.json({
        message:"user logged out successfully"
    });
}