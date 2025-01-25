# CRM Tasks CRUD Application

## Project Overview
This project is a simple Customer Relationship Management (CRM) system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to manage leads by performing CRUD (Create, Read, Update, Delete) operations, and includes user authentication using JWT (JSON Web Tokens) with cookies for protected routing.

---

## Features
- **User Authentication**: Users can sign up, sign in, and securely access protected routes using JWT and cookies.
- **Lead Management**:
  - Create, view, update, and delete leads.
  - Search leads by ID for detailed information.
- **Protected Routes**: Routes that require user authentication to access.
- **Responsive Design**: The frontend is styled using Tailwind CSS to ensure a modern and responsive UI.

---

## Folder Structure
The application follows the MVC (Model-View-Controller) architecture:

### Backend
```
|-- controllers
|   |-- leads
|   |   |-- createLead.js
|   |   |-- getAllLeads.js
|   |   |-- getLeadById.js
|   |   |-- updateLead.js
|   |   |-- deleteLead.js
|   |-- users
|       |-- createUser.js
|       |-- signIn.js
|       |-- getVerified.js
|
|-- models
|   |-- leadsSchema.js
|   |-- usersSchema.js
|
|-- routes
|   |-- leadRoutes.js
|   |-- userRoutes.js
|
|-- config
|   |-- db.js
|
|-- server.js
```

### Frontend
```
|-- src
|   |-- components
|   |   |-- LeadCard.js
|   |   |-- EditModal.js
|   |   |-- LeadDetailModal.js
|   |-- pages
|   |   |-- SignIn.js
|   |   |-- Dashboard.js
|   |-- utils
|       |-- api.js
```

---

## Technologies Used
### Backend
- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database for storing leads and user data.
- **JWT**: Used for user authentication.
- **bcrypt**: Password hashing for secure storage.
- **dotenv**: Environment variable management.

### Frontend
- **React.js**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.

---

## Installation and Setup

### Prerequisites
1. Node.js and npm installed.
2. MongoDB installed and running.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder and set the following environment variables:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://127.0.0.1:27017/crm_db
   JWT_SECRET=your_secret_key
   FRONTEND_BASE_URL=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
3. Create a `.env` file in the root folder and set the following environment variables:
   ```env
   BASE_URL=http://localhost:3000
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

5. Open `http://localhost:5173` in your browser.

---

## API Endpoints

### User Routes
- **POST** `/api/users/signUp`: Create a new user.
- **POST** `/api/users/signIn`: Authenticate user and set JWT cookie.
- **GET** `/api/users`: Verify JWT token for protected routes.

### Lead Routes
- **POST** `/api/leads`: Create a new lead.
- **GET** `/api/leads`: Get all leads.
- **GET** `/api/leads/:id`: Get a lead by ID.
- **PUT** `/api/leads/:id`: Update a lead by ID.
- **DELETE** `/api/leads/:id`: Delete a lead by ID.

---

## Key Features Explained

### User Authentication
- Users sign in with their email and password.
- JWT tokens are generated and stored as HTTP-only cookies.
- Protected routes check the validity of the JWT token.

### CRUD Operations for Leads
- Create, Read, Update, and Delete leads via backend API.
- Frontend UI provides modals for editing and viewing lead details.

### Token Verification for Protected Routes
- A middleware function verifies the JWT token before granting access to sensitive routes.
- Cookies are included in requests to validate user sessions.

---

## Deployment
- **Frontend**: Deploy using services like Vercel or Netlify.
- **Backend**: Deploy using platforms like Render, Heroku, or AWS.

---

## Screenshots

### 1. **Dashboard**
A page displaying all leads with options to edit, view, or delete.

### 2. **Sign-In Page**
User login form with email and password.

---

## Future Enhancements
- Add role-based access control (e.g., admin vs regular users).
- Implement lead import/export functionality (e.g., CSV or Excel).
- Integrate email notifications for lead updates.

---

## Contributors
- **Shahzaib Ali**  
  MERN Stack Developer  

---

## License
This project is licensed under the MIT License.

