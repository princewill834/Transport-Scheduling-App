# Transport Team Scheduling page

A scheduling page for a transport team that provides a glance at the schedule of drivers and vehicles. This project was built using Express.js and MongoDB.

## Table of Contents

-[Features](#features) -[Technologies used](#technologies-used) -[Installation](#installation) -[Usage](#usage) -[Why MongoDB](#why-mongodb)

## Features

- View the schedule of drivers and vehicles at a glance.
- Create drivers and vehicles.
- Assign drivers and vehicles to specific schedules.
- Filter functionality.

## Technologies Used

- Express.js: A fast and minimalist web application framework for Node.js.
- MongoDB: A NoSQL document database that provides scalability, flexibility and rich querying capabilities.

## Usage

- Set an Environment variable for the json webtoken in the Advanced System Settings of your local device for testing this app by using "scheduler_jwtSecretKey" as varible name and providing any value of your choice to it.
- Only two routes are protected for Unauthorized access this are:
  1.) 'localhost:3000/api/schedule/:id and
  2.) 'localhost:3000/api/schedule/vehicle/vehicleId
  to access this route the user must have a valid json webtoken.
- View the schedule at a glance. Drivers and vehicles will be listed with their assigned schedules.
- Add a new driver or vehicle by providing necessary details.
- Assign drivers and vehicles to specific schedules
- filter schedules base on a single date or week

## Why MongoDB

MongoDB was choosen as the preferred database for this project due to the following reasons:

- Scalability: MongoDB is designed to handle large amounts of data and scale horizontally, making it suitable for applications with growing data requirements.
- Flexibility MongoDB's flexible schema allows for easy adaptation to evolving data needs without the need for migrations or downtime.

- Rich Query Cabailities:
  MongoDB's powerful query language and indexing options provide efficient and expressive querying, making it easier to retrieve and manipulate data.

- Document-Oriented: MongoDB stores data in a flexible, JSON-like format called BSON(Binary JSON), which aligns well with the structure of modern applications and reduces the need for complex joins.
