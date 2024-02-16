// HTTP imports
const http = require("http");
const PORT = 3000;

// Shopping List Functions Import
const { groceryList, addItem } = require('./groceryListFunctions');

// TODO: Implement status codes in the responses
const server = http.createServer((req, res) => {

    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk;
    })

    req.on('end', () => {
        body = body.length > 0 ? JSON.parse(body) : {};

        const contentType = { 'Content-Type': 'application/json' };

        if (req.url.startsWith('/list')) {
            // let itemName = JSON.parse(req.url.split('/')[2]);

            switch(req.method) {
                case 'GET':
                    res.writeHead(200, contentType);
                    res.end(JSON.stringify({ groceryList }));
                    break;
                case 'POST':
                    const { name, price } = body;
                    if (!name || !price) {
                        res.writeHead(400, contentType);
                        res.end(JSON.stringify({ error: 'Please provide valid item names and prices' }));
                    } else {
                        const message = addItem(name, price);
                        res.writeHead(201, contentType);
                        res.end(JSON.stringify({ message, groceryList }));
                    }
                    break;
                default:
                    res.writeHead(404, contentType);
                    res.end(JSON.stringify( { error: "Invalid Endpoint" } ));
            }
        }
    })
    
});  
  
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});