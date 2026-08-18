# Curo - Hospital Management Application

![Curo](curo.png)

Welcome to the **Curo** project! This README provides an overview of the project, setup instructions, and other relevant details.

## Table of Contents

- [Visit](#visit)
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Structure](#structure)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

## Visit

- [Repository](https://github.com/aabubokarr/curo)
- [Website](https://aabubokarr.github.io/curo/)

## About

**Curo** is a full-stack hospital management system built with modern web technologies. The platform provides a comprehensive solution for managing various aspects of healthcare operations. The system is designed with scalability and maintainability in mind.

## Features

- Modern UI/UX
- Responsive Design
- Visual Statistics and Charts
- JWT Authentication
- Hospital Management

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aabubokarr/curo.git
   ```
2. Navigate to the project's frontend directory:
   ```bash
   cd client
   ```
3. Install dependencies & start the frontend:
   ```bash
   npm i
   npm run dev
   ```
4. Navigate to the project's backend directory:
   ```bash
   cd server
   ```
5. Install dependencies & start the backend:
   ```bash
   npm i
   npm start
   ```
6. Open your browser and navigate to:
   ```
   http://localhost:5173
   ``` 

## Structure

```
curo/
├── client/                                 # Frontend (React/Vite)
│   ├── public/
│   │   └── images/                         # Static images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Bars/                       # Navigation components
│   │   │   │   ├── Navbar.jsx              # Main navigation bar
│   │   │   │   ├── Sidebar.jsx             # Sidebar navigation
│   │   │   │   └── barData.json            # Navigation menu data
│   │   │   ├── UI/                         # Reusable UI components
│   │   │   │   ├── Button/                 # Button component
│   │   │   │   │   └── Button.jsx
│   │   │   │   ├── Input/                  # Input component
│   │   │   │   │   └── Input.jsx
│   │   │   │   ├── Card/                   # Card component
│   │   │   │   │   └── Card.jsx
│   │   │   │   └── index.js                # Barrel export
│   │   │   ├── Pages/                      # Page components
│   │   │   │   ├── Home/                   # Landing page
│   │   │   │   │   ├── Hero.jsx            # Hero section
│   │   │   │   │   ├── About.jsx           # About section
│   │   │   │   │   ├── Calculator.jsx      # BMI Calculator
│   │   │   │   │   ├── Contact.jsx         # Contact form
│   │   │   │   │   ├── Footer.jsx          # Footer
│   │   │   │   │   └── Home.jsx            # Home page container
│   │   │   │   ├── Auth/                   # Authentication pages
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   └── Register.jsx
│   │   │   │   ├── Dashboard/              # Dashboard page
│   │   │   │   │   └── Dashboard.jsx
│   │   │   │   ├── Doctor/                 # Doctor management
│   │   │   │   │   ├── Doctor.jsx          # Doctor list
│   │   │   │   │   ├── CreateDoctor.jsx
│   │   │   │   │   └── EditDoctor.jsx
│   │   │   │   ├── Patient/                # Patient management
│   │   │   │   │   ├── Patient.jsx
│   │   │   │   │   ├── CreatePatient.jsx
│   │   │   │   │   └── EditPatient.jsx
│   │   │   │   ├── Appointment/            # Appointment management
│   │   │   │   │   ├── Appointment.jsx
│   │   │   │   │   └── CreateAppointment.jsx
│   │   │   │   ├── Department/             # Department management
│   │   │   │   │   ├── Department.jsx
│   │   │   │   │   ├── CreateDepartment.jsx
│   │   │   │   │   └── EditDepartment.jsx
│   │   │   │   ├── Test/                   # Test management
│   │   │   │   │   ├── Test.jsx
│   │   │   │   │   ├── CreateTest.jsx
│   │   │   │   │   └── EditTest.jsx
│   │   │   │   ├── Service/                # Service management
│   │   │   │   │   ├── Service.jsx
│   │   │   │   │   ├── CreateService.jsx
│   │   │   │   │   └── EditService.jsx
│   │   │   │   ├── Medicine/               # Medicine management
│   │   │   │   │   ├── Medicine.jsx
│   │   │   │   │   ├── CreateMedicine.jsx
│   │   │   │   │   └── EditMedicine.jsx
│   │   │   │   ├── Prescription/           # Prescription management
│   │   │   │   │   ├── Prescription.jsx
│   │   │   │   │   ├── CreatePrescription.jsx
│   │   │   │   │   └── ViewPrescription.jsx
│   │   │   │   ├── Request/                # Request management
│   │   │   │   │   └── Request.jsx
│   │   │   │   └── Error/                  # Error page
│   │   │   │       └── Error.jsx
│   │   │   └── Profile/                    # Profile components
│   │   │       ├── Profile.jsx
│   │   │       └── IdCard.jsx
│   │   ├── constants/                      # Application constants
│   │   │   ├── theme.js                    # Design system & theme
│   │   │   └── config.js                   # Configuration constants
│   │   ├── App.jsx                         # Main app component
│   │   ├── main.jsx                        # Entry point
│   │   └── index.css                       # Global styles
│   ├── package.json
│   └── vite.config.js
├── server/                                 # Backend (Node.js/Express)
│   ├── config/
│   │   └── db.js                           # Database configuration
│   ├── controllers/                        # Route controllers
│   │   ├── appointment.controllers.js
│   │   ├── auth.controllers.js
│   │   ├── department.controllers.js
│   │   ├── doctor.controllers.js
│   │   ├── medicine.controllers.js
│   │   ├── patient.controllers.js
│   │   ├── prescription.controllers.js
│   │   ├── request.controllers.js
│   │   ├── service.controllers.js
│   │   ├── test.controllers.js
│   │   └── user.controllers.js
│   ├── middlewares/
│   │   └── auth.middleware.js              # Authentication middleware
│   ├── models/                             # Data models
│   │   ├── appointment.models.js
│   │   ├── auth.models.js
│   │   ├── department.models.js
│   │   ├── doctor.models.js
│   │   ├── medicine.models.js
│   │   ├── patient.models.js
│   │   ├── prescription.models.js
│   │   ├── request.models.js
│   │   ├── service.models.js
│   │   ├── test.models.js
│   │   └── user.models.js
│   ├── routes/                             # API routes
│   │   ├── appointment.routes.js
│   │   ├── auth.routes.js
│   │   ├── department.routes.js
│   │   ├── doctor.routes.js
│   │   ├── medicine.routes.js
│   │   ├── patient.routes.js
│   │   ├── prescription.routes.js
│   │   ├── request.routes.js
│   │   ├── service.routes.js
│   │   ├── test.routes.js
│   │   └── user.routes.js
│   ├── server.js                           # Server entry point
│   └── package.json
├── database/
│   └── db.sql                              # Database schema
├── README.md
└── LICENSE
```

## Contributors

<p align="center">
  <a href="https://github.com/aabubokarr/curo/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=aabubokarr/curo" alt="Contributors" />
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

## License

This project is licensed under the [MIT License](LICENSE).
