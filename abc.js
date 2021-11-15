const express=require('express');

const app = express();
app.use(express.json());

app.listen(3000);

let users={};

app.get('/users',(req,res)=>{
    res.send('user');
    console.log(users);
})

app.post('/users',(req,res)=>{
    res.send('File sent');
    users = req.body;
    console.log(users);
})