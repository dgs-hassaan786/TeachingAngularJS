const http = require('http');
var fs = require('fs');
const port = 3000

const requestHandler = (request, response) => {
    
    fs.readFile('./views/index.html', function (err, html) {
        if (err) {
            return console.log('error in reading html', err)
          } 
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  

        });
   
 
    console.log(request.url)
  //response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


