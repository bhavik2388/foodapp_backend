// const express=require('express');
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');


const db_link='mongodb+srv://Admin:bhavik@cluster0.kg5wr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log("database connected");    
})
.catch(function(err){
    console.log(err);
});

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    },
    role: {
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    profileImage:{
            type: String,
            default: "image/user/default.jpg"
    },
    resetToken:String
});



userSchema.pre("save",async function(){
    // console.log("before saving is database",this);
    this.confirmPassword=undefined;
});
// userSchema.post("save",function(doc){
//     console.log("after saving is database",doc);
// });

// userSchema.pre('save',async function(){
//     let salt =await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })

userSchema.methods.createResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswprdHandler=function(password,confirmPassword){
    this.password=password;
    this.comfirmPassword=confirmPassword;
    this.resetToken=undefined;
}

const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;

// // (async function createUser(){
// //     let user={
// //         name:'ayaan',
// //         email:'abcde@gmail.com',
// //         password:'1234567',
// //         confirmPassword:'1234567'
// //     }
// //     let data = await userModel.create(user);
// //     console.log(data);
// // })();