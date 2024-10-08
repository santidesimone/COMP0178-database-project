# COMP0178-database-project

## Introduction

This is a proposal for a starter project template to be used for the group project coursework.

If you follow the instructions below to run the project locally, it will:

1. Set up MySQL inside a Docker container. Additionally, it will create a database called 'ucl' and a table named 'students,' populating it with initial data.  
2. Create a front end using the Angular framework. This webpage will be served by a lightweight Nginx server and will currently display a "Hello World" page. Both the Angular app and the Nginx server are inside a Docker container.  
3. Build a back end using Node.js, also inside a container. This server contains one endpoint: `/students`. When you access this endpoint, the server connects to the database, runs an SQL query, and returns the contents of the 'students' table from the 'ucl' database to the client.  

## Prerequisites

Make sure you have the following installed on your machine:

- **Docker**
- **MySQL**
- **Node.js**
- **npm**
- **Angular**

## Installation and Setup

1. **Clone the project from GitHub:**
   ```bash
   git clone git@github.com:santidesimone/COMP0178-database-project.git
   ```

2. **Navigate into the project folder:**
   ```bash
   cd COMP0178-database-project
   ```

3. **Start Docker:**
   Make sure Docker is running on your machine.

4. **Build and run the containers:**
   ```bash
   docker-compose up --build
   ```
   ![build-and-run-containers](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2JvYmh2dTJ5ODIwZjRscnE4dTMzY3h5N2c3aW5kc2I1YXJzZmFqaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aDidd9H1Sj5IZRMQ2S/giphy.gif)

5. **Access the applications:**
   - **Frontend:** Open your browser and go to [http://localhost:8080/](http://localhost:8080/)

   ![front-end](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzB2NHp2ZWNhM2tjY2h6ZHdoMTZteWNxYW4xOWR5MzJkcmNubmVodSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qHyAD4hxyahL48yBZD/giphy.gif)

   - **Backend:** Open your browser and go to [http://localhost:3000/students](http://localhost:3000/students)

   ![backend-connected-to-database](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDA2c2pnNHJqeXZuMmQ4OTU3ZGhmajE4ZGMxNnA2cTdmNzVnMWxkcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9sX6eAdgq9WEjRxjBi/giphy.gif)


## Database Access

To connect to the MySQL database and interact with it, open a new terminal and run the following command:

```bash
docker exec -it project-starter-database-1 mysql -u root -p
```

![connecting-to-db-via-cmd](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3ZkZzRtbWxtbW9pMXVkNGVxcnMyY3pjcWh1ZnJqZGI2NnRhNmZ3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9oNn5lkNwx2O51ipKN/giphy.gif)

When prompted for the password, use:
```
rootpassword
```