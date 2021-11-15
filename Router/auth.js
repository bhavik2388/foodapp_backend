const express=require('express');
const app = express();
app.use(express.json());
// const userModel=require('../Models/userModel');
// const jwt=require('jsonwebtoken');
// const JWT_KEY=require('../secrets');
const authRouter=express.Router();
authRouter
.route('/signup')
.get(middleware,getSignUp)
// .post(postSignUp);

// authRouter
// .route('/login')
// .post(loginUser);
// authRouter.use(express.json);

function middleware(req,res,next){
    console.log('middleware encountered');
    next();
}

function getSignUp(req,res){
    console.log('hello');
    res.sendFile('C:/Users/bhavi/New folder (3)/abc/index.html');
}

// async function postSignUp(req,res){
//     let dataObj = req.body;
//     let user = await userModel.create(dataObj);
//     // console.log('backend',user);
//     res.json({
//         message:"user signed up"
//         ,data:user
//     });
// }

// async function loginUser(req,res){
//     try{
//         console.log("Hello");
//         let data= req.body;
//         if(data.email){
//             let user =await userModel.findOne({email:data.email});
//             if(user)
//             {
//                 if(user.password == data.password)
//                 {
//                     let uid=user['id'];
//                     let token=jwt.sign({payload:uid},JWT_KEY);
//                     res.cookie('login',token,{httpOnly:true}); 
//                     return res.json({
//                         message:'User logged in',
//                         userDetails:data
//                     })
//                 }
//                 else{
//                     return res.json({
//                         message:'password incorrect'
//                     })
//                 }
//             }
//             else{
//                 return res.json({
//                     message:"user not found"
//                 })
//             }
//         }
//         else{
//             return res.json({
//                 message:"empty feild"
//             })
//         }
//     }
//     catch(err){
//         return res.json({message:err.message});

//     }
// }

module.exports=authRouter;