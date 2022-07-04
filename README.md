# BeaverNote

[Try it out on Heroku!](https://beavernote.herokuapp.com/)

## About

Beavernote is an Evernote clone created by Jeffrey Kintner. Users can demo the app via a demo user, create an account, or download the app and run it locally.

Beavernote allows users to create, read, update, and delete notes stored inside notebooks (which the user may also create, read, update, and delete). No user can access the notes belonging to any other user.

------

## Technologies Used

This project was written in JavaScript and built using the PERN stack:
* PostgreSQL
* Express
* React
* Node.js

This app's state is managed using Redux.

Additional languages include HTML & CSS.

------

## Downloading Beavernote

Clone the repo by running this terminal command:
```
git clone https://github.com/jkintner25/BeaverNote.git
```

Once you've cloned the repo, use the command `npm install` to install all dependencies in both the frontend and backend root folders.

Create a `.env` file in your backend directory to tell the app how to access your database. Set up your postgres database to match the information in your `.env` file.

Migrate and seed your database with the `npm run reset` command from your backend directory.

Running the command `npm start` from the backend and frontend folders will

------

## Future Features

* Rich Text Editor implementation
* Improvements to UI/UX
* Ability to export notes

------

## Screenshots

![landing-page](https://user-images.githubusercontent.com/95717139/177223903-7b93aca3-60b5-49bd-902a-fcdf0a168185.PNG)
![feature-view](https://user-images.githubusercontent.com/95717139/177223917-eed63260-4e30-443d-b265-30a88db258cd.PNG)
![edit-view](https://user-images.githubusercontent.com/95717139/177223923-7cb61d5a-4f1f-4e8c-991d-c3d745240048.PNG)

------

## Technical Implementation

When I set out to build Beavernote I envisioned a seamless, one-page app where all the tools are readily available for the user. Many of the components interchange depending on whether the user is reading or editing data which made this design a bit more difficult to implement. Deciding to include a nested notes object inside the notebooks slice of state ended up being a great decision and made accessing all the notes associated with each note simple.
