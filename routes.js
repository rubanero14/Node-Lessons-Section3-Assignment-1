const fs = require('fs');

const requestHandler = (req, res) => {
    const URL = req.url;
    // const Method = req.method;

    if(URL === '/'){
        // Telling the browser that this server is sending an HTML file as response
        res.setHeader('Content-Type', 'text/html');

        // Injecting HTML code to browser to be rendered
        res.write(`
            <html>
                <head>
                    <title>Section 3 - Node Assignment 1</title>
                </head>
                <body>
                    <h1>Enter Username</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" placeholder="Enter Username"/>
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `);

        // finalizing and ending the response to browser
        return res.end();
    }

    if(URL === '/users'){
        // Telling the browser that this server is sending an HTML file as response
        res.setHeader('Content-Type', 'text/html');

        // Injecting HTML code to browser to be rendered
        res.write(`
            <html>
                <head>
                    <title>Section 3 - Node Assignment 1</title>
                </head>
                <body>
                    <ul type="i">
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                    </ul>
                </body>
            </html>
        `);

        // finalizing and ending the response to browser
        return res.end();
    }

    if(URL === '/create-user' /*&& Method === 'POST'*/){
        // Initialize an empty array for storing the incoming data submitted in route '/'
        const Body = [];

        // Initiating Event Listener on data received, and storing data into Body array
        req.on('data', (datachunk) => {
            Body.push(datachunk);
        })

        return req.on('end', () => {
            // using Stream and Buffer method to parse and store data in human-readable format
            const ParsedBody = Buffer.concat(Body).toString();
            const Message = ParsedBody.split('=')[1];
            console.log(ParsedBody);
            console.log(Message);

            res.write(`
                <html>
                    <head>
                        <title>Section 3 - Node Assignment 1</title>
                    </head>
                    <body>
                        <h1>Username: ${Message} is set!</h1>
                    </body>
                </html>
            `);

            // Storing parsed data into text file using file-system method
            fs.writeFile('message.txt', Message, error => {
                 // redirect HTTP code '302' initiated 
                 res.statusCode = 302;

                 // Headers with Location redirects to '/create-user' upon submit
                 res.setHeader('Location', '/create-user');

                 // Error handler
                 if(error){
                    console.log(error);
                 }

                 // finalizing and ending the response to browser
                 return res.end();
            });
        });
    }
};

module.exports = {
    handler: requestHandler,
};