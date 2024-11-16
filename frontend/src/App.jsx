import { BrowserRouter as Main, Routes, Route } from "react-router-dom";
import { Register } from "./components/Pages/Auth/Register";
import { Login } from "./components/Pages/Auth/Login";
import { Dashboard } from "./components/Pages/Dashboard/Dashboard";
import { Doctor } from "./components/Pages/Doctor/Doctor";
import { CreateDoctor } from "./components/Pages/Doctor/CreateDoctor";
import { EditDoctor } from "./components/Pages/Doctor/EditDoctor";
import { Patient } from "./components/Pages/Patient/Patient";
import { CreatePatient } from "./components/Pages/Patient/CreatePatient";
import { EditPatient } from "./components/Pages/Patient/EditPatient";
import { Appointment } from "./components/Pages/Appointment/Appointment";
import { Department } from "./components/Pages/Department/Department";
import { CreateDepartment } from "./components/Pages/Department/CreateDepartment";
import { EditDepartment } from "./components/Pages/Department/EditDepartment";
import { Test } from "./components/Pages/Test/Test";
import { Treatment } from "./components/Pages/Treatment/Treatment";
import { Service } from "./components/Pages/Service/Service";
import { Medicine } from "./components/Pages/Medicine/Medicine";
import { Prescription } from "./components/Pages/Prescription/Prescription";
import { Bill } from "./components/Pages/Billing/Billing";
import { MedicalRecord } from "./components/Pages/MedicalRecord/MedicalRecord";
import { EditProfile } from "./components/Profile/EditProfile";

function App() {
  return (
    <Main>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/doctor" element={<Doctor />} />
        <Route exact path="/create-doctor" element={<CreateDoctor />} />
        <Route exact path="/edit-doctor/:doctorId" element={<EditDoctor />} />
        <Route exact path="/patient" element={<Patient />} />
        <Route exact path="/create-patient" element={<CreatePatient />} />
        <Route exact path="/edit-patient/:patientId" element={<EditPatient />} />
        <Route exact path="/appointment" element={<Appointment />} />
        <Route exact path="/department" element={<Department />} />
        <Route exact path="/create-department" element={<CreateDepartment />} />
        <Route exact path="/edit-department/:deptId" element={<EditDepartment />} />
        <Route exact path="/test" element={<Test />} />
        <Route exact path="/treatment" element={<Treatment />} />
        <Route exact path="/service" element={<Service />} />
        <Route exact path="/medicine" element={<Medicine />} />
        <Route exact path="/prescription" element={<Prescription />} />
        <Route exact path="/billing" element={<Bill />} />
        <Route exact path="/medicalrecord" element={<MedicalRecord />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Main>
  );
}

export default App;
