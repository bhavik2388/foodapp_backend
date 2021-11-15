const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('req has been made from browser');
    // console.log(req.method); 
    // console.log(req.url);
    res.setHeader('Content-Type','text/plain');
    res.write('Hello Pepcoders :)');
    res.end();
});


server.listen(3000,'localhost',()=>{
    console.log('server is listening ont port 3000');
});