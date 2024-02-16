// HTTP imports
const http = require("http");
// const { info } = require("console");
const PORT = 3000;

const shoppingList = []

// TODO: Implement status codes in the responses
const server = http.createServer((req, res) => {
    
    if (req.method === 'GET' && req.url === '/api/list') {  // TODO: GET Endpoint
        res.writeHead(200, { "Content-Type": "application/json" });

        // TODO: Format list here
        let data = { grocery_list: shoppingList };
        
        res.end(JSON.stringify(data));

        infoLogger.info("System displays Grocery List")
    } else if (req.method === 'POST' && req.url === '/api/insert') {    // TODO: POST Endpoint
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const item = JSON.parse(body);

            // this is where you would save the data
            shoppingList.push(item);
            // console.log(shoppingList)

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Item Added Successfully!" }));
            infoLogger.info(`System adds '${item.name}' to the Grocery List`)
        });

    } else if (req.method === 'PUT' && req.url === '/api/update') { // TODO: PUT Endpoint
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const item = JSON.parse(body);
      
            // this is where you would update the data based on the body received
            // or you could check the url to see what the id of the object is to update
            let listUpdated = false;
            for (let i = 0; i < shoppingList.length; i++) {
                if (shoppingList[i].name === item.name) {
                    shoppingList[i] = item;
                    listUpdated = true;
                }
            }
            
            if (listUpdated) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Item Updated Successfully!" }));
                infoLogger.info(`System updates '${item.name}' in the Grocery List`)
            } else {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Item Not Found" }));
            }
        });

    } else if (req.method === 'DELETE' && req.url === '/api/delete') {  // TODO: DELETE Endpoint
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const item = JSON.parse(body);
            const index = item.index;

            shoppingList.splice(index, 1);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Resource deleted Successfully!" }));
            infoLogger.info(`System deletes index ${index} in the Grocery List`)
        });

    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        let data = { error: "Not Found" };
        res.end(JSON.stringify(data));
    }
    
});  
  
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});