# To-Do List Microservices

This project contains multiple microservices to manage a To-Do list. Each microservice handles a specific part of the application, such as creating, deleting, listing, and updating tasks.

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/todo-list-microservices.git
   cd todo-list-microservices
   ´´´

2. Build and start the services:
    ```bash
    docker-compose up --build
    ```

3. The microservices will be available on the following ports:    
    - create-task: http://localhost:3001
    - delete-task: http://localhost:3005
    - list-task: http://localhost:3004
    - update-task: http://localhost:3003

    MongoDB will be available on port 27017

## Microservices

    . Create Task: Adds a new task.
    . Delete Task: Removes an existing task.
    . List Task: Lists all tasks.
    . Update Task: Updates an existing task.

## Running the Services

To start the services, simply run the following command from the root directory:
    ```bash
    docker-compose up --build
    ```

This will build the Docker images for each microservice and start the containers. The services will be available at the ports listed above.

## Stopping the Services

To stop the services, press CTRL+C in the terminal where the services are running, or use the following command in another terminal:
    ```bash
    docker-compose down
    ```
This will stop and remove the containers.

# Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes.

# License

This project is licensed under the MIT License - see the LICENSE file for details.