# Real Time Chat
my first project with websocket written in golang and vuejs <br/>

###### clone the repository:
```
git clone https://github.com/sajjadth/all-my-links.git
```

### Backend
1. change directory:
   ```
   cd ./backend
   ```
2. install packages:
   ```
   go install
   ```
3. create .env file:
   ```
   touch .env
   ```
4. set environment variable:
   ```
   DATABASEUSERNAME="your database username"
   PASSWORD="your database password"
   HOST="127.0.0.1"
   PORT="yout database port"
   DATABASENAME="your database name"
   APPPORT=5000
   JWTSECRETKEY="your json web token secret"
   ```
5. run the project:
   ```
   go run .
   ```

### Frontend
1. change directory:
   ```
   cd ./frontend
   ```
2. install packages:
   ```
   npm install
   ```
3. run the project:
<br/>You can replace `npm run` with `yarn` here.

   * run in developer mode:
     ```
     npm run dev
     ```
   * build for production:
     ```
     npm run build
     ```
   * serve the bundled dist folder in production mode:
     ```
     npm run start
     ```