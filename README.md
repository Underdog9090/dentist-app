# Smile Bright - Modern Dental Clinic Website

A modern dental clinic website with appointment booking system and admin dashboard.

## Features

- 🖼️ Modern, responsive homepage
- 👨‍⚕️ About page with clinic information
- 🦷 Services page showcasing dental treatments
- 📅 Online appointment booking system
- 📬 Contact form with message storage
- 🔐 Secure admin dashboard
- 📱 Fully responsive design

## Tech Stack

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
smile-bright/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, icons
│   │   ├── components/         # Navbar, Footer, Forms, etc.
│   │   ├── pages/              # Home, About, Services, Contact, Admin
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
│
├── backend/                    # Node.js + Express Backend
│   ├── controllers/            # Logic for bookings, contact, auth
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API routes
│   ├── middleware/             # Auth middleware
│   ├── config/                 # DB connection, environment
│   ├── server.js
│   └── package.json
│
├── .env
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create a .env file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3001
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd client
   npm start
   ```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License. 