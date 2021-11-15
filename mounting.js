const express=require('express');
const app = express();
const cookieParser=require('cookie-parser');

app.listen(3000);
app.use(cookieParser());
// let users=[
//     {
//         "id":1,
//         "name": "Bhavik"
//     },
//     {
//         "id":2,
//         "name":"Aman"
//     },
//     {
//         "id":3,
//         "name":"Ayaan"
//     }
// ];

// app.get('/users',(req,res)=>{
//     res.json(users);
// })
app.use(express.json());
const userRouter=require('./Router/user.js');
const authRouter=require('./Router/auth.js');
app.use("/user",userRouter);
app.use("/auth",authRouter);
