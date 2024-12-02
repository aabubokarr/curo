SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- 1. Create admin table
CREATE TABLE admin_details(
    admin_id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
    password VARCHAR(150) NOT NULL,
    role VARCHAR(10) NOT NULL,
    PRIMARY KEY(admin_id)
);

-- Insert into admin_details
INSERT INTO admin_details (name, email, password, role)
VALUES
('Md Abu Bokar', 'abu@gmail.com', 'testpass1', 'admin'),
('Natsha Monir Shawon', 'nat@gmail.com', 'testpass2', 'admin');

-- 2. Create department table
CREATE TABLE department(
    dept_id INT AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(55) NOT NULL,
    PRIMARY KEY(dept_id)
);

-- Insert into department
INSERT INTO department (dept_name)
VALUES
('Opthalmology'),
('Cardiology');

-- 3. Create doctor table
CREATE TABLE doctor_details(
    doctor_id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    phone_no VARCHAR(15) UNIQUE NOT NULL,
    address VARCHAR(150),
    password VARCHAR(150) NOT NULL,
    gender VARCHAR(10),
    speciality VARCHAR(55) NOT NULL,
    dept_id INT NOT NULL,
    role VARCHAR(10) NOT NULL,
    PRIMARY KEY(doctor_id),
    FOREIGN KEY(dept_id) REFERENCES department(dept_id)
);

-- Insert into doctor_details
INSERT INTO doctor_details (name, email, phone_no, address, password, gender, speciality, dept_id, role)
VALUES
('Nafis Anzum', 'nafis@gmail.com', '31234567890', 'Bangladesh', 'docpass1', 'Male', 'Opthalmologist', 1, 'doctor'),
('Ava Brown', 'ava@gmail.com', '41234567890', 'Australia', 'docpass2', 'Female', 'Cardiologist', 2, 'doctor');

-- 4. Create patient table
CREATE TABLE patient_details(
    patient_id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    phone_no VARCHAR(15) UNIQUE NOT NULL,
    address VARCHAR(150),
    password VARCHAR(150) NOT NULL,
    gender VARCHAR(10),
    blood_group VARCHAR(5),
    dob VARCHAR(10),
    height DOUBLE(5,2),
    weight DOUBLE(5,2),
    occupation VARCHAR(50),
    role VARCHAR(10) NOT NULL,
    PRIMARY KEY(patient_id)
);

-- Insert into patient_details
INSERT INTO patient_details 
(name, email, phone_no, address, password, gender, blood_group, dob, height, weight, occupation, role)
VALUES
('Emily Parker', 'emily@gmail.com', '91234567890', 'Usa', 'patpass1', 'Female', 'O+', '1990-05-12', 1.65, 55.50, 'Teacher', 'patient'),
('Sophia Johnson', 'sophia@gmail.com', '92345678901', 'Russia', 'patpass2!', 'Female', 'A+', '1985-08-20', 1.70, 60.00, 'Software Engineer', 'patient'),
('Md Akib', 'akib@gmail.com', '95678901234', 'Bangladesh', 'patpass3', 'Male', 'B+', '1995-03-07', 1.68, 62.35, 'Architect', 'patient');

-- 5. Create treatment table
CREATE TABLE treatment_plan(
    treatment_id INT AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    diagnosis VARCHAR(50),
    medications VARCHAR(100),
    plan_details VARCHAR(100),
    PRIMARY KEY (treatment_id ),
    FOREIGN KEY (patient_id) REFERENCES patient_details(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor_details(doctor_id)
);

-- Insert into treatment table
INSERT INTO treatment_plan (patient_id, doctor_id, diagnosis, medications, plan_details)
VALUES
(1, 1, 'Fracture', 'Paracetamol, Ibuprofen', 'Patient to take rest, apply ice, and visit after a week for X-ray'),
(2, 1, 'Viral Infection', 'Cough Syrup, Vitamin C', 'Patient to rest and take prescribed medications for 7 days'),
(3, 2, 'Heart Condition', 'Aspirin, Beta-blockers', 'Patient to undergo ECG and heart monitoring, follow-up after 1 week');
 
-- 6. Create appointment table
CREATE TABLE appointment (
    appointment_id INT AUTO_INCREMENT,
    doctor_id INT,
    patient_id INT,
    appointment_date varchar(15),
    appointment_time varchar(10),
    PRIMARY KEY (appointment_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor_details(doctor_id),
    FOREIGN KEY (patient_id) REFERENCES patient_details(patient_id)
);

-- Insert into appointment table
INSERT INTO appointment(doctor_id, patient_id, appointment_date, appointment_time)
VALUES
(1, 1,'2024-11-07','10:00 AM'),
(1, 2,'2024-11-07','09:30 AM'),
(2, 1,'2024-11-07','10:00 AM');

-- 7. Create medicine table
CREATE TABLE medicine (
    medicine_id INT AUTO_INCREMENT,
    medicine_name VARCHAR(255),
    medicine_quantity INT,
    medicine_price INT,
    PRIMARY KEY (medicine_id)
);

-- Insert into medicine table
INSERT INTO medicine (medicine_name, medicine_quantity, medicine_price)
VALUES
('Paracetamol', 30, 50),
('Ibuprofen', 20, 40),
('Aspirin', 25, 60);
 
-- 8. Create service table
CREATE TABLE service (
    service_id INT AUTO_INCREMENT,
    treatment_id INT,
    service_name VARCHAR(255),
    service_cost INT,
    PRIMARY KEY (service_id),
    FOREIGN KEY (treatment_id) REFERENCES treatment_plan(treatment_id)
);
 
-- Insert into service table
INSERT INTO service (treatment_id, service_name, service_cost)
VALUES
(1, 'X-ray', 1500),
(2, 'MRI', 3000),
(3, 'CT Scan', 4000);

-- 9. Create test table
CREATE TABLE test (
    test_id INT AUTO_INCREMENT,
    treatment_id INT,
    test_name VARCHAR(255),
    test_cost INT,
    PRIMARY KEY (test_id),
    FOREIGN KEY (treatment_id) REFERENCES treatment_plan(treatment_id)
);

-- Insert into test table
INSERT INTO test (treatment_id, test_name, test_cost)
VALUES
(1, 'Blood Test', 1000),
(2, 'Urine Test', 800),
(3, 'ECG', 1200);

-- 10. Create prescription table
CREATE TABLE prescription (
    prescription_id INT AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    medicine_id INT,
    PRIMARY KEY (prescription_id),
    FOREIGN KEY (patient_id) REFERENCES patient_details(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor_details(doctor_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(medicine_id)
);

-- Insert into prescription table
INSERT INTO prescription (patient_id, doctor_id, medicine_id)
VALUES
(1, 1, 1),
(2, 2, 2),
(3, 1, 3);
 
-- 11. Create bill table
CREATE TABLE bill (
    bill_id INT AUTO_INCREMENT,
    treatment_id INT,
    PRIMARY KEY (bill_id),
    FOREIGN KEY (treatment_id) REFERENCES treatment_plan(treatment_id)
);

-- Insert into bill table
INSERT INTO bill (treatment_id)
VALUES
(1),
(2),
(3);
 
-- 12. Create medical_record table
CREATE TABLE medical_record (
    record_id INT AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    PRIMARY KEY (record_id),
    FOREIGN KEY (patient_id) REFERENCES patient_details(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor_details(doctor_id)
);

-- Insert into medical_record table
INSERT INTO medical_record (patient_id, doctor_id)
VALUES
(1, 1),
(2, 2),
(3, 1);

-- 13. Create dept_head table
CREATE TABLE dept_head (
    head_id INT AUTO_INCREMENT,
    doctor_id INT,
    PRIMARY KEY (head_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor_details(doctor_id)
);

-- Insert into dept_head table
INSERT INTO dept_head (doctor_id)
VALUES
(1),
(2);

-- 14. Create regular table
CREATE TABLE regular (
    patient_id INT AUTO_INCREMENT,
    insurance_provider varchar(100),
    policy_number INT,
    PRIMARY KEY (patient_id),
    FOREIGN KEY (patient_id) REFERENCES patient_details(patient_id)
);

-- Insert into regular table
INSERT INTO regular (patient_id, insurance_provider, policy_number)
VALUES 
(1, 'HealthCare Inc.', '12345'),
(2, 'LifeCare Insurance', '98765'),
(3, 'MediSecure', '56789');

-- 15. Create emergency table
CREATE TABLE emergency (
    patient_id INT AUTO_INCREMENT,
    allergies varchar(100),
    conditions varchar(100),
    PRIMARY KEY(patient_id),
    FOREIGN KEY (patient_id) REFERENCES patient_details(patient_id)
);

-- Insert into regular table
INSERT INTO emergency (patient_id, allergies, conditions)
VALUES 
(1, 'Peanuts', 'Severe Headache'),
(2, 'Dust, Pollen', 'Severe Asthma Attack'),
(3, 'Bee Sting', 'Anaphylactic Shock');

COMMIT;