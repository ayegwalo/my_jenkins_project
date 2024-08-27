/*app.js*/
const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
  // HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to My Server</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f0f0;
          color: #333;
        }
        .container {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          color: #007bff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello, this is Christopher A.</h1>
        <p>Welcome to my server. This is a sample webpage served by Node.js.</p>
        <p>Feel free to modify the content and style to suit your needs.</p>
      </div>
    </body>
    </html>
  `;

  // Set the content type to HTML
  response.setHeader('Content-Type', 'text/html');
  // Send the HTML content
  response.end(htmlContent);
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
