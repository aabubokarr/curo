# Curo - Hospital Management Website

Welcome to the **Curo** project! This README provides an overview of the project, setup instructions, and other relevant details.

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

**Curo** is a modern, fast, and responsive web application built with React.js and JavaScript. It is designed to provide a seamless user experience with a clean UI, reusable components, and optimized performance.

## Features

- Portfolio
- Auth
- Dashboard
- Doctor
- Patient
- Department
- Service
- Test
- Medicine
- Prescription
- Appointment

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/woabu0/curo.git
   ```
2. Navigate to the project's frontend directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm add vite@latest
   ```
4. Navigate to the project's backend directory:
   ```bash
   cd server
   ```
5. Install dependencies:
   ```bash
   npm i
   ```

## Usage

1. Start the frontend:
   ```bash
   npm run dev
   ```
2. Start the backend:
   ```bash
   npm start
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Structure
```
curo/
├── client/                     # Frontend (React/Vite)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend (Node/Express)
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── appointment.controllers.js
│   │   ├── auth.controllers.js
│   │   ├── department.controllers.js
│   │   ├── doctor.routes.js
│   │   ├── medicine.routes.js
│   │   ├── patient.controllers.js
│   │   ├── request.controllers.js
│   │   ├── service.controllers.js
│   │   └── test.controllers.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── appointment.models.js
│   │   ├── auth.models.js
│   │   ├── department.models.js
│   │   ├── doctor.routes.js
│   │   ├── medicine.routes.js
│   │   ├── patient.models.js
│   │   ├── request.models.js
│   │   ├── service.models.js
│   │   └── test.models.js
│   ├── routes/
│   │   ├── appointment.routes.js
│   │   ├── auth.routes.js
│   │   ├── department.routes.js
│   │   ├── doctor.routes.js
│   │   ├── medicine.routes.js
│   │   ├── patient.routes.js
│   │   ├── request.routes.js
│   │   ├── service.routes.js
│   │   └── test.routes.js
│   ├── server.js               # Express entry point
│   └── package.json
│
├── README.md
└── .gitignore
```

## Contributors

<p align="center">
  <a href="https://github.com/woabu0/curo/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=woabu0/curo" alt="Contributors" />
  </a>
</p>

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
