# React CRUD Application with Mock API

This is a simple CRUD (Create, Read, Update, Delete) application built with React.js and Mock API. It uses `jsonplaceholder.typicode.com` as a placeholder API to perform CRUD operations.

## Features

- **Home**: View a list of users with pagination.
- **Create**: Add a new user.
- **Update**: Edit an existing user's details.
- **View**: Display detailed information about a user.
- **Delete**: Remove a user.

## Mock API

The application uses https://jsonplaceholder.typicode.com as a mock API for user data. The following endpoints are utilized:

- **GET /users** - Fetch all users.
- **GET /users/:id** - Fetch details of a specific user.
- **POST /users** - Add a new user.
- **PUT /users/:id** - Update user information.
- **DELETE /users/:id** - Delete a user.

## Pagination

- The Home component implements pagination, displaying 5 users per page.
- Navigate between pages using "Previous" and "Next" buttons.

## Error Handling

This application includes basic error handling for a better user experience.

# API Errors

- Displays an alert when an API request fails (e.g., unable to fetch data, add, update, or delete a user).
- Example: If data fetching fails, the user sees a message: **"Error Fetching the data"**.

# Delete Confirmation

- Before deleting a user, a confirmation popup asks: **"Would you like to delete this user?"**.

# Form Validation

- Ensures all required fields are filled before submission while creating a new user.

### Deployment Link

https://ajackus-reactjs-crud-app.netlify.app