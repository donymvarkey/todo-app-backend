## Backend for todo-app built using node, express and mongodb
##### Features
 * User registraation and login
 * Add Todo items
 * Delete Todo items
 * List all Todo items
 * List completed Todo items
 * List incompleted Todo items

### Get Started
<hr>

    git clone https://github.com/donymvarkey/todo-app-backend.git
    cd todo-app-backend
    npm install
    touch .env
    nano .env

### Add your configs to the .env file
<hr>
    
    PORT='your_port'
    MONGO_URL='your_mongodb_url'
    SIGNATURE='your_super_secret_key'


<hr>

### Routes
  
      * User Registration
    +---------------------------------------------------------------------
      Route   -->     /user/register
      Params  -->     { name, email, password }

      * User Login
    +---------------------------------------------------------------------
      Route   -->     /user/login
      Params  -->     { email, password }
      
      * Create Todo items (Requres user login)
    +---------------------------------------------------------------------
      Route   -->     /todo/create
      Params  -->     { name }
      headers -->     x-auth-token (incude jwt token in headers)

      * List all Todo items (Requres user login)
    +---------------------------------------------------------------------
      Route   -->     /todo/list/all
      headers -->     x-auth-token (incude jwt token in headers)

      * Mark a Todo item finished (Requres user login)
    +---------------------------------------------------------------------
      Route   -->     /todo/mark/fnished/:id
      Params  -->     { id }
      headers -->     x-auth-token (incude jwt token in headers)

      * Delete a Todo item (Requres user login)
    +---------------------------------------------------------------------
      Route   -->     /todo/delete/:id
      Params  -->     { id }
      headers -->     x-auth-token (incude jwt token in headers)

      * List completed Todo items (Requres user login)
    +---------------------------------------------------------------------
      Route   -->     /todo/complete
      headers -->     x-auth-token (incude jwt token in headers)

      * List incomplete Todo items (Requres user login)
    +---------------------------------------------------------------------
      Route   -->     /todo/incomplete
      headers -->     x-auth-token (incude jwt token in headers)
