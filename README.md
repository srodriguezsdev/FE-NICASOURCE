### Node React Dev Project Setup Guide
This guide will walk you through the steps needed to set up and run a Node React APP dev project from your GitHub repository using Node version 18 and TypeScript.

### Prerequisites
Node.js 18 installed on your machine
Basic knowledge of TypeScript and React.js
Text editor of your choice

You should set a .env file for the project with the following variables:
    REACT_APP_BACKEND_URL: ""
If you are testing the backend locally, use 'http://localhost:{PORT}'

### Step 1: Install dependencies
Navigate into the cloned repository directory and install the required dependencies for our project by running the following command:
	
    npm install

### Step 2: Run the server
To start the server, run the following command:

    npm run start

> Some clarifications: 

- You should develop with your navigator in mobile mode since it is a pwa for mobile phones.
    
- The used nomenclature in this project is camelCase for code variables and snake_case for refering to database fields.