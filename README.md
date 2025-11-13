# Curo - Hospital Management Application

Welcome to **Curo**, a modern, comprehensive hospital management system designed to streamline healthcare operations and improve patient care delivery.

## Table of Contents

- [Visit](#visit)
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Structure](#structure)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

## Visit

- [Vercel](https://curo0.vercel.app/)

## About

**Curo** is a full-stack hospital management system built with modern web technologies. The platform provides a comprehensive solution for managing various aspects of healthcare operations, including patient records, doctor appointments, medical prescriptions, department management, and more. The system is designed with scalability and maintainability in mind, featuring a clean architecture, reusable components, and a consistent design system.

## Features

- **Authentication & Authorization**
  - Secure login and registration
  - Role-based access control (Admin, Doctor, Patient)
  - Protected routes and API endpoints

- **Dashboard**
  - Visual statistics and charts
  - User count analytics
  - Gender-based demographics
  - Role-specific dashboards for all user types

- **Doctor Management**
  - Create, view, edit, and manage doctor profiles
  - Department assignments
  - Specialization tracking

- **Patient Management**
  - Complete patient records
  - Medical history tracking
  - Profile management

- **Appointment System**
  - Schedule and manage appointments
  - Doctor-patient matching
  - Appointment history

- **Department Management**
  - Organize hospital departments
  - Department-specific configurations

- **Medical Services**
  - Test management
  - Service catalog
  - Medicine inventory

- **Prescription Management**
  - Create and view prescriptions
  - Medicine assignment
  - Prescription history

- **Additional Features**
  - BMI Calculator
  - Contact form
  - Request management
  - Profile editing

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/woabu0/curo.git
   cd curo
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   ```
   
   - Create a `.env` file in the `server` directory:
     ```env
     JWT_SECRET_KEY=your_secret_key_here
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=curo_db
     ```
   
   - Import the database schema from `database/db.sql`
   - Start the server:
     ```bash
     npm start
     ```

3. **Setup Frontend:**
   ```bash
   cd client
   npm install
   ```
   
   - Create a `.env` file in the `client` directory:
     ```env
     VITE_API_URL=http://localhost:8081
     ```
   
   - Start the development server:
     ```bash
     npm run dev
     ```

## Usage

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:8081`

2. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   cd client
   npm run build
   ```

## Structure

```
curo/
├── client/                          # Frontend (React/Vite)
│   ├── public/
│   │   └── images/                  # Static images (doctor.png, patient.png)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Bars/                # Navigation components
│   │   │   │   ├── Navbar.jsx       # Main navigation bar (landing page)
│   │   │   │   ├── Sidebar.jsx      # Sidebar navigation (dashboard)
│   │   │   │   └── barData.json     # Navigation menu data
│   │   │   ├── UI/                  # Reusable UI components
│   │   │   │   ├── Button/          # Button component
│   │   │   │   │   └── Button.jsx
│   │   │   │   ├── Input/           # Input component
│   │   │   │   │   └── Input.jsx
│   │   │   │   ├── Card/            # Card component
│   │   │   │   │   └── Card.jsx
│   │   │   │   └── index.js         # Barrel export
│   │   │   ├── Pages/               # Page components
│   │   │   │   ├── Home/            # Landing page
│   │   │   │   │   ├── Hero.jsx     # Hero section
│   │   │   │   │   ├── About.jsx    # About section
│   │   │   │   │   ├── Calculator.jsx  # BMI Calculator
│   │   │   │   │   ├── Contact.jsx  # Contact form
│   │   │   │   │   ├── Footer.jsx   # Footer
│   │   │   │   │   └── Home.jsx     # Home page container
│   │   │   │   ├── Auth/            # Authentication pages
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   └── Register.jsx
│   │   │   │   ├── Dashboard/       # Dashboard page
│   │   │   │   │   └── Dashboard.jsx
│   │   │   │   ├── Doctor/          # Doctor management
│   │   │   │   │   ├── Doctor.jsx   # Doctor list
│   │   │   │   │   ├── CreateDoctor.jsx
│   │   │   │   │   └── EditDoctor.jsx
│   │   │   │   ├── Patient/         # Patient management
│   │   │   │   │   ├── Patient.jsx
│   │   │   │   │   ├── CreatePatient.jsx
│   │   │   │   │   └── EditPatient.jsx
│   │   │   │   ├── Appointment/     # Appointment management
│   │   │   │   │   ├── Appointment.jsx
│   │   │   │   │   └── CreateAppointment.jsx
│   │   │   │   ├── Department/      # Department management
│   │   │   │   │   ├── Department.jsx
│   │   │   │   │   ├── CreateDepartment.jsx
│   │   │   │   │   └── EditDepartment.jsx
│   │   │   │   ├── Test/            # Test management
│   │   │   │   │   ├── Test.jsx
│   │   │   │   │   ├── CreateTest.jsx
│   │   │   │   │   └── EditTest.jsx
│   │   │   │   ├── Service/         # Service management
│   │   │   │   │   ├── Service.jsx
│   │   │   │   │   ├── CreateService.jsx
│   │   │   │   │   └── EditService.jsx
│   │   │   │   ├── Medicine/        # Medicine management
│   │   │   │   │   ├── Medicine.jsx
│   │   │   │   │   ├── CreateMedicine.jsx
│   │   │   │   │   └── EditMedicine.jsx
│   │   │   │   ├── Prescription/    # Prescription management
│   │   │   │   │   ├── Prescription.jsx
│   │   │   │   │   ├── CreatePrescription.jsx
│   │   │   │   │   └── ViewPrescription.jsx
│   │   │   │   ├── Request/         # Request management
│   │   │   │   │   └── Request.jsx
│   │   │   │   └── Error/           # Error page
│   │   │   │       └── Error.jsx
│   │   │   └── Profile/             # Profile components
│   │   │       ├── Profile.jsx
│   │   │       ├── EditProfile.jsx
│   │   │       └── IdCard.jsx
│   │   ├── constants/              # Application constants
│   │   │   ├── theme.js             # Design system & theme
│   │   │   └── config.js            # Configuration constants (API_URL, ROUTES, ROLES)
│   │   ├── App.jsx                  # Main app component with routes
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend (Node.js/Express)
│   ├── config/
│   │   └── db.js                    # Database configuration
│   ├── controllers/                 # Route controllers
│   │   ├── appointment.controllers.js
│   │   ├── auth.controllers.js
│   │   ├── department.controllers.js
│   │   ├── doctor.controllers.js
│   │   ├── medicine.controllers.js
│   │   ├── patient.controllers.js
│   │   ├── request.controllers.js
│   │   ├── service.controllers.js
│   │   └── test.controllers.js
│   ├── middlewares/
│   │   └── auth.middleware.js       # Authentication middleware
│   ├── models/                      # Data models
│   │   ├── appointment.models.js
│   │   ├── auth.models.js
│   │   ├── department.models.js
│   │   ├── doctor.models.js
│   │   ├── medicine.models.js
│   │   ├── patient.models.js
│   │   ├── request.models.js
│   │   ├── service.models.js
│   │   └── test.models.js
│   ├── routes/                      # API routes
│   │   ├── appointment.routes.js
│   │   ├── auth.routes.js
│   │   ├── department.routes.js
│   │   ├── doctor.routes.js
│   │   ├── medicine.routes.js
│   │   ├── patient.routes.js
│   │   ├── request.routes.js
│   │   ├── service.routes.js
│   │   └── test.routes.js
│   ├── server.js                   # Express server entry point
│   └── package.json
│
├── database/
│   └── db.sql                      # Database schema
│
├── README.md
└── LICENSE
```

## Contributors

<p align="center">
  <a href="https://github.com/woabu0/curo/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=woabu0/curo" alt="Contributors" />
  </a>
</p>

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes
4. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
5. Push to the branch:
   ```bash
   git push origin feature-name
   ```
6. Open a pull request

### Code Style Guidelines

- Follow React best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design for all components
- Use the design system constants from `constants/theme.js`
- Follow the component structure in `components/UI/` for reusable components

## License

This project is licensed under the [MIT License](LICENSE).
