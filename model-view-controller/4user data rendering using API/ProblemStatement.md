# Node.js MVC Project - User Data Rendering

## Introduction:

Imagine building an admin dashboard for a bustling e-commerce platform. Admins need a quick snapshot of crucial user details. By implementing the Node.js MVC Project for User Data Rendering, admins can effortlessly access the "/users" route. The system fetches and displays essential user information in a structured table format, streamlining the admin's decision-making process and enhancing the overall management efficiency of the e-commerce platform.

## Objectives:

You have been provided an API 'https://dummyjson.com/users' that contains a users array. The array comprises objects, each detailing user information (e.g., [User Details](https://files.codingninjas.in/screenshot-2024-01-01-at-6-36-49-pm-34445.png)).

1. Implement the 'userModel' to fetch users' details from the provided API using axios.
2. Implement the 'userController' to render the details of users fetched using userModel using the 'index.ejs' view.
   - Render the data in a table format, utilizing your own styling.
   - Display only user's name, email, mobile number, gender, city, pincode, and profile image.
   - The route provided for rendering the details is `app.get("/users", userController)`.

## Expected Output:

[View Expected Output GIF](https://files.codingninjas.in/summativelec-5-27691.gif)

## Notes/Hints:

1. Follow the folder structure and file locations mentioned in the problem statement.
2. Refer to the starter code in `index.ejs` to implement the table rendering.
