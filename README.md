# MentorGuru E-learning Web Platform

## Client

To start the client run the following command:

```bash
cd client
pnpm install
pnpm run dev
```


## Microservices Overview
This project is a `Monorepo` that contains all microservices, including the API Gateway, User API, and more. These microservices are located in the `microservices/apps` directory.

Currently, the project includes the following services:
- **API Gateway** (Port: `3001`)
- **User Service** (Port: `3002`)

Additional services will follow the same pattern with port allocation starting from `3003` and so on.

### Starting Microservices
To start a microservice, navigate to the root directory of the microservices (`microservices/`) and run the following command:

```bash
cd microservices
pnpm install
pnpm run start:dev <microservice_name> 
```

For example, to start the user service:

```bash
pnpm run start:dev users
```

The User Service will now be available at [http://localhost:3002](http://localhost:3002).

## Database
To run the MongoDB Docker image database. After starting the User Service, open a separate terminal in the mentorGuru/micrsoervices directory run:

```bash
make run-mongodb
```

### Testing the MongoDB Instance
You can test the MongoDB instance locally by opening **MongoDB Compass** and using the `DATABASE_URL` from your `.env` file to connect. This ensures the local MongoDB instance is running properly.

---