# wellbeing-api-app

## Running

Use 
`npm install`
and
`npm start`
to run the project. Unless you specify a port for the server, you can find the port logged to console and navigate to the according localhost address.


## Routes

GET: /   
Returns a json with welcome message. 

POST: /user  
Creates a new user.

GET:  /find-user/:username?

GET: /find-id/:id?

GET: /assessment/basic

POST: /assessment/add-complete

GET: /assessment/:assessmentId/user/:userId

GET: /requests    
Gets all request list

GET: /requests/:userId    
Gets request of certain user

POST: /requests   
Saves request

PUT: /requests    
Modify requests

DELETE: /requests/:id    
Deletes request by request id
