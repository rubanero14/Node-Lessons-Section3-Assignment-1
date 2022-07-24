const fs = require('fs');

const requestHandler = (req, res) => {
    const URL = req.url;
    const Method = req.method;

    if(URL === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head>
                    <title>Section 3 - Node Assignment 1</title>
                    <body>
                        <h1>Enter Username</h1>
                        <form action="/create-user" method="POST">
                            <input type="text" name="username" placeholder="Enter Username"/>
                            <button type="submit">Send</button>
                        </form>
                    </body>
                </head>
            </html>
        `);
        res.end();
    }

    if(URL === '/users'){
        res.write(`
            <html>
                <head>
                    <title>Section 3 - Node Assignment 1</title>
                    <body>
                        <ul type="i">
                            <li>User 1</li>
                            <li>User 2</li>
                            <li>User 3</li>
                        </ul>
                    </body>
                </head>
            </html>
        `);
        res.end();
    }

    if(URL === '/create-user' && Method === 'POST'){
        // Initialize an empty array for storing the incoming data submitted in route '/'
        const Body = [];

        // Initiating Event Listener on data received, and storing data into Body array
        req.on('data', (datachunk) => {
            console.log(datachunk);
            Body.push(datachunk);
        })

        return req.on('end', () => {
            // using Buffer method to parse and store data in human-readable format
            const ParsedBody = Buffer.concat(Body).toString();
            const Message = ParsedBody.split('=')[1];
            console.log(ParsedBody);
            console.log(Message);

            // Storing parsed data into text file
            fs.writeFile('message.txt', Message, error => {
                 // redirect HTTP code '302' initiated 
                 res.statusCode = 302;
                 // Headers with Location redirects to '/create-user' upon submit
                 res.setHeader('Location', '/create-user');
                //  if(error){
                //     console.log(error);
                //  }
                 return res.end();
            });
        });
    }
};

module.exports = {
    handler: requestHandler,
};