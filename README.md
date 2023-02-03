JWT token based authentication system
Backend application

step 1: use npm start command in terminal to run server.

step 2: follow the schema and create user using localhost:3000/createuser
{
"name":"tanmayy hedau",
"email":"tanmayy@gmail.com",
"password":"Tanmayy@124"
}

step 3: do the login via same user localhost:3000/loginuser
{
"email": "tanmayy@gmail.com",
"password": "Tanmayy@124"
}

step 4: to authenticate user simply use get request localhost:3000/getuser/:userId and provide token in headers x-api-key as key and value as token.

step 5: to get all users use get request localhost:3000/getuser and provide token in headers x-api-key as key and value as token.
