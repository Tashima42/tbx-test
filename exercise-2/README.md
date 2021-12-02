# Login Form

Live preview: http://tashima.rocks

## API Reference

### POST /api/login    
* Request:    
  * body: x-www-form-urlencoded       
    * username: string    
    * password: string    
    
* Response:
  * status: 200
    * body: "Hello {username}"
  * status: 401
    * body: "Invalid password"
  * status: 404
    * body: "Username not found"

## Running the code
1. Install dependencies: `npm install`
2. Run the server: `npm start`

Default port: 3000

## Code Structure
### Repositories
Responsible for data handling. In this case, because there isn't a database, we're using a mock data store. 
### Use Cases
Responsible for business logic.
### Helpers
Responsible for password validation.
### Views
Responsible for rendering the views.
