# Hospital-Backend
<a href="https://codeclimate.com/github/luc-tuyishime/Hospital-Backend/maintainability"><img src="https://api.codeclimate.com/v1/badges/50016f1926ddc258554e/maintainability" /></a>


# EPIC-Mail-3

A web app that helps people exchange messages / information over the internet


### Heroku API
[Hospital vaccin link](https://hospital-vaccin.herokuapp.com/)

## Tools Used

[Javascript](https://javascript.info/) : Language used.

[NodeJS](https://nodejs.org/en/) : server environment.

[Express](http://expressjs.com/) : used for building fast APIs.

[Airbnb](https://github.com/airbnb/javascript) : Style Guide.

[Code climate](https://codeclimate.com/login/github/join/) : Clean code.

[Heroku](https://www.heroku.com/) : Deployment.


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
TO setup the project on your local machine do the following
Install Node
```
npm install node
```
Install Postgres
```
[Postgres](http://www.postgresqltutorial.com/install-postgresql/)
```

Clone the repo by running

```
git clone https://github.com/luc-tuyishime/EPIC-Mail-3.git
cd EPIC-Mail-3
```

Then install all the necessary dependencies

```
npm install
```

## Database setup

```
Creata a .env file

Copy and Paste the DATABASE_URL

DATABASE_URL=postgres://[USERNAME]:[PASSWORD]@localhost/[DATABASE_NAME]
```

## Deployment

* URL = http://localhost:8000
* PORT = 8000
* NODE_ENV = production
* DATABASE_URL =
* PG_HOST = localhost
* PG_USER = username
* PG_DATABASE = epicemail
* PG_PASSWORD = secretpassword
* PG_PORT = 5432


## Run the application

```
npm start

```

## Run tests

```
npm test
```

## API ENDPOINTS


### HOSPITAL

| Ressource URL       | Methods | Description                 |
| ------------------- | ------- | --------------------------- |
| /                   | GET     | The index (welcome message) |
| /api/v1/auth/signup | POST    | Create hospital             |
| /api/v1/auth/login  | LOGIN   | Login hospital              |


### PARENTS

| Ressource URL   | Methods | Description     |
| --------------- | ------- | --------------- |
| /api/v1/parents | POST    | Create parents  |
| /api/v1/parents | GET     | Get all parents |


### USER

| Ressource URL           | Methods | Description                    |
| ----------------------- | ------- | ------------------------------ |
| /api/v1/users/          | POST    | Create users                   |
| /api/v1/login/          | POST    | Login user                     |
| /api/v1/auth/logout     | POST    | Logout User                    |
| /api/v1/forgot/password | POST    | Enter email in case you Forgot |
|                         |         | your password                  |
| api/v1/reset/`token`    | POST    | Update password                |


### CHILD

| Ressource URL               | Methods | Description                      |
| --------------------------- | ------- | -------------------------------- |
| /api/v1/children/           | POST    | Create child                     |
| /api/v1/child/`childID`     | GET     | Get child with associated parent |
| /api/v1/vaccinated/children | GET     | GET vaccinated children          |
| /api/v1/children            | GET     | GET all children                 |

### VACCIN

| Ressource URL       | Methods | Description               |
| ------------------- | ------- | ------------------------- |
| /api/v1/vaccins     | POST    | Create vaccin for a child |
| /api/v1/vaccins     | GET     | Get all vaccin            |
| /api/v1/vaccin/`id` | GET     | GET one vaccin            |


## Contributor
- Jean luc Tuyishime <luctunechi45@gmail.com>

---

## License & copyright
Copyright (c) Jean luc Tuyishime, Software developer
