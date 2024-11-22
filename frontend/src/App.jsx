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
import { CreateAppointment } from "./components/Pages/Appointment/CreateAppointment";
import { Department } from "./components/Pages/Department/Department";
import { CreateDepartment } from "./components/Pages/Department/CreateDepartment";
import { EditDepartment } from "./components/Pages/Department/EditDepartment";
import { Test } from "./components/Pages/Test/Test";
import { CreateTest } from "./components/Pages/Test/CreateTest";
import { EditTest } from "./components/Pages/Test/EditTest";
import { Treatment } from "./components/Pages/Treatment/Treatment";
import { CreateTreatment } from "./components/Pages/Treatment/CreateTreatment";
import { EditTreatment } from "./components/Pages/Treatment/EditTreatment";
import { Service } from "./components/Pages/Service/Service";
import { CreateService } from "./components/Pages/Service/CreateService";
import { EditService } from "./components/Pages/Service/EditService";
import { Medicine } from "./components/Pages/Medicine/Medicine";
import { CreateMedicine } from "./components/Pages/Medicine/CreateMedicine";
import { EditMedicine } from "./components/Pages/Medicine/EditMedicine";
import { Prescription } from "./components/Pages/Prescription/Prescription";
import { CreatePrescription } from "./components/Pages/Prescription/CreatePrescription";
import { ViewPrescription } from "./components/Pages/Prescription/ViewPrescription";
import { Bill } from "./components/Pages/Bill/Bill";
import { CreateBill } from "./components/Pages/Bill/CreateBill";
import { EditBill } from "./components/Pages/Bill/EditBill";
import { MedicalRecord } from "./components/Pages/MedicalRecord/MedicalRecord";
import { CreateMedicalRecord } from "./components/Pages/MedicalRecord/CreateMedicalRecord";
import { EditMedicalRecord } from "./components/Pages/MedicalRecord/EditMedicalRecord";
import { EditProfile } from "./components/Profile/EditProfile";
import { Error } from "./components/Pages/Error/Error";

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
        <Route exact path="/create-appointment" element={<CreateAppointment />} />
        <Route exact path="/department" element={<Department />} />
        <Route exact path="/create-department" element={<CreateDepartment />} />
        <Route exact path="/edit-department/:deptId" element={<EditDepartment />} />
        <Route exact path="/test" element={<Test />} />
        <Route exact path="/create-test" element={<CreateTest />} />
        <Route exact path="/edit-test/:testId" element={<EditTest />} />
        <Route exact path="/treatment" element={<Treatment />} />
        <Route exact path="/create-treatment" element={<CreateTreatment />} />
        <Route exact path="/edit-treatment/:planId" element={<EditTreatment />} />
        <Route exact path="/service" element={<Service />} />
        <Route exact path="/create-service" element={<CreateService />} />
        <Route exact path="/edit-service/:serviceId" element={<EditService />} />
        <Route exact path="/medicine" element={<Medicine />} />
        <Route exact path="/create-medicine" element={<CreateMedicine />} />
        <Route exact path="/edit-medicine/:medId" element={<EditMedicine />} />
        <Route exact path="/prescription" element={<Prescription />} />
        <Route exact path="/create-prescription" element={<CreatePrescription />} />
        <Route exact path="/view-prescription/:prescriptionId" element={<ViewPrescription />} />
        <Route exact path="/bill" element={<Bill />} />
        <Route exact path="/create-bill" element={<CreateBill />} />
        <Route exact path="/edit-bill/:billId" element={<EditBill />} />
        <Route exact path="/medical-record" element={<MedicalRecord />} />
        <Route exact path="/create-record" element={<CreateMedicalRecord />} />
        <Route exact path="/edit-record/:recordId" element={<EditMedicalRecord />} />
        <Route exact path="/edit-profile" element={<EditProfile />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </Main>
  );
}

export default App;