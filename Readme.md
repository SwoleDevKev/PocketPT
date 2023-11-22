#  Project Title

**PocketPT**

##  Overview

Being at the gym can be very intimidating. People everywhere that seem to know what they're doing, looking very intense and unapproachable. You may have questions you wish you could ask a trainer but just aren't willing or able to hire one. If that sounds like you then PocketPT (a trainer in your pocket) is just what you need.

  

###  Problem

  

PocketPT solves both a client and trainer issue. On the Trainer side it encapsulates your work creating one place to manage all your clients, and facilitates your programming to help you provide more value. If you are a client then this will allow you to be more organized and proactive by having direct access to your trainer and curated workouts.

###  User Profile

The app is for both a client and a Trainer. This app is used to connect them, the trainer uses their app to program for their client and set workouts for them. The client on the other hand, receives these programs and is able to track their workouts using the app. Accessibility is factored in by having an option to describe the workouts as opposed to video which is an important feature of the app.

###  Features

This is a CRUD app, on the Trainer side as you can need to CREATE UPDATE and DELETE programs and READ client information that they've inputed. You can also retrieve information from youtube api to help with your programming.

##  Implementation

###  Tech Stack

This app is built using a modified MERN Stack 
- MySQL
- Express
- React
- Node  

###  APIs

YoutubeAPI will be used to search and get workout videos.

###  Sitemap

  
List the pages of your app with brief descriptions. You can show this visually, or write it out.

##### Trainer side App:

- landing page- page with list of clients and an add client button

- client page- page with list of exercises

- text chat- message box for client and trainer to speak

 
##### Client side App:

- List of client exercises that are to be completed

- A page that displays the individual videos

  

##### Both sides: 
		
- An assessment page that containing input fields for weight BMI and other objective 
	client data.

###  Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

  

###  Data


# Database Schema for Personal Training App

## Trainer Table

| Column Name  | Data Type         | Description                           |
|--------------|-------------------|---------------------------------------|
| trainer_id   | INT (Primary Key) | Unique identifier for the trainer.    |
| trainer_name | VARCHAR           | Name of the trainer.                  |
| ...          | ...               | Other details about the trainer.      |

## Client Table

| Column Name | Data Type         | Description                           |
|-------------|-------------------|---------------------------------------|
| client_id   | INT (Primary Key) | Unique identifier for the client.     |
| trainer_id  | INT (Foreign Key) | References trainer_id in TrainerTable.|
| client_name | VARCHAR           | Name of the client.                   |
| ...         | ...               | Other details about the client.       |

## Workout Table

| Column Name         | Data Type        | Description                           |
|---------------------|------------------|---------------------------------------|
| workout_id          | INT (Primary Key)| Unique identifier for the workout.    |
| workout_name        | VARCHAR          | Name of the workout.                  |
| workout_description | VARCHAR          | Description of the workout.           |
| workout_date        | DATE             | Date of the workout.                  |
| ...                 | ...              | Other details about the workout.      |

## ClientWorkout Table (Associative Table)

| Column Name | Data Type         | Description                             |
|-------------|-------------------|-----------------------------------------|
| client_id   | workout_id (FK)   | Relates client_id to workout_id         |
| client_id   | workout_id (FK)   | allows for many to many relationship    |
| ...         | ...               | Other details                           |

  

###  Endpoints

  
```sh
Route('/workouts')

	.post -- create a new workout program

	.get -- get all stored workout program

	.put -- to update a specific program

	.delete -- to delete a workout program
```

``` sh
Route('/workouts')

	.post -- create a new workout program

	.get -- get all stored workout program

	.put -- to update a specific program

	.delete -- to delete a workout program

```
```sh
Route('/workouts/:id')

	.post -- create a new exercise

	.get -- to get a specific exercise

	.put -- to update a specific exercise

	.delete -- to delete a specific exercise

```
```
Route('/login')

	.post -- post request for authentication & to get JWT from server

```

``` 
Route('/signup')

	.post -- post request to create a new user

```

  

###  Auth

  
The authentication is implemented using single factor authorization and  JWT for authorization

  

##  Roadmap

  

Sprint-1 :
		 
	build out a front-end for the client side & trainer side (HTML and styling)

sprint-2 : 


	Create mock database and seed file. And start implementing axios calls

sprint-3 : 

	build out the back-end, test it out on postman  

sprint-4 : 

	connect everything and do testing 

##  Nice-to-haves

Implementation of text channel to allow clients to leave questions for their trainers. Chat GPT API implementation to help trainer delegate some client questions and nutrition guidance. customizable app color to give personalize trainer app.