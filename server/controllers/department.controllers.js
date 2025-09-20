import Department from "../models/department.models.js";

export const createDepartment = (req, res) => {
    Department.create(req.body, (err, results) => {
        if(err){
            console.log("Error inserting data: ", err)
            return res.status(500).json({error: "Database error"})
        }

        res.status(201).json({
            message: "Department created successfully",
            departmentId: results.insertId
        })
    })
}

export const readDepartment = (req, res) => {
    Department.read((err, results) => {
        if(err){
            console.log("Error reading data: ", err)
            return res.status(500).json({error: "Database error"})
        }

        res.json(results)
    })
}

export const updateDepartment = (req, res) => {
    Department.update(req.params.id, req.body, (err, results) => {
        if(err){
            console.log("Error updating data: ", err)
            return res.status(500).json({error: "Database error"})
        }

        if(results.affectedRows === 0){
            return res.status(404).json({error: "Department not found"})
        }

        res.json({
            message: "Department updated successfully"
        })
    })
}

export const deleteDepartment = (req, res) => {
    Department.delete(req.params.id, (err, results) => {
        if(err){
            console.log("Error deleting department", err)
            return res.status(500).json({error: "Database error"})
        }

        if(results.affectedRows === 0){
            return res.status(404).json({error: "Department not found"})
        }

        res.json({
            message: "Department deleted successfully"
        })
    })
}