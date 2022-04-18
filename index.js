// const express = require("express");
// const joi = require("joi");
// // const res = require("express/lib/response");
// const app = express();
// app.use(express.json());
// const employess = [
//   {
//     id: 1,
//     name: "emp1",
//     salary: 1000,
//   },
//   { id: 2, name: "emp2", salary: 1000 },
//   { id: 3, name: "emp3", salary: 2000 },
//   { id: 4, name: "emp4", salary: 3000 },
// ];
// // console.log(arr);
// app.get("/", (req, res) => {
//   res.send(employess);
// });
// app.get("/api/employess", (req, res) => {
//   res.send(employess);
// });
// // app.get("/employess/:id", (req, res) => {
// //   const filterEmpId = employess.find((emp) => emp.id == req.params.id);

// //   if (!filterEmpId) {
// //     res.send("employe not found");
// //   }
// //   res.send(filterEmpId);
// // });
// app.get("/api/employess/:salary", (req, res) => {
//   const filterEmpSalary = employess.filter(
//     (emp) => emp.salary == req.params.salary
//   );

//   if (filterEmpSalary.length == 0) {
//     res.send("employe not found");
//   } else {
//     res.send(filterEmpSalary);
//   }
// });
// app.post("/api/employess/add", (req, res) => {
//   const schema = joi.object({
//     id: joi.number().integer().required(),
//     name: joi.string().required(),
//     salary: joi.number().integer().required(),
//   });
//   const result = schema.validate(req.body);
//   const resultMessage = result?.error?.message;
//   if (resultMessage) {
//     res.send(resultMessage);
//   } else {
//     employess.push({
//       id: req.body.id,
//       name: req.body.name,
//       salary: req.body.salary,
//     });
//     res.send(JSON.stringify(req.body) + " Added successfully");
//   }
// });

// app.put("/api/employess/update/:id", (req, res) => {
//   const filterdEmp = employess.find((emp) => emp.id == req.params.id);
//   const schema = joi.object({
//     id: joi.number().integer().required(),
//     name: joi.string().required(),
//     salary: joi.number().integer().required(),
//   });
//   const result = schema.validate(req.body);
//   const resultMessage = result?.error?.message;
//   if (resultMessage) {
//     res.send(resultMessage);
//   } else {
//     (filterdEmp.id = req.body.id),
//       (filterdEmp.name = req.body.name),
//       (filterdEmp.salary = req.body.salary),
//       res.send(JSON.stringify(req.body) + " Updated successfully");
//   }
// });

// app.delete("/api/employess/delete/:id", (req, res) => {
//   const filterdEmp = employess.find((emp) => emp.id == req.params.id);
//   const empIndex = employess.indexOf(filterdEmp);
//   employess.splice(empIndex, 1);
//   res.send(JSON.stringify(filterdEmp) + "Deleted successfully");

//   // const schema = joi.object({
//   //   id: joi.number().integer().required(),
//   //   name: joi.string().required(),
//   //   salary: joi.number().integer().required(),
//   // });
//   // const result = schema.validate(req.body);
//   // const resultMessage = result?.error?.message;
//   // if (resultMessage) {
//   //   res.send(resultMessage);
//   // } else {
//   //   (filterdEmp.id = req.body.id),
//   //     (filterdEmp.name = req.body.name),
//   //     (filterdEmp.salary = req.body.salary),
//   //     res.send(JSON.stringify(req.body) + " Updated successfully");
//   // }
// });
// app.listen(3000);

const { array } = require("joi");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/employes");
const empSchemma = new mongoose.Schema({
  id: Number,
  age: { type: Number, min: [18, "age is too small"], required: true },
  department: {
    type: Array,
    validate: {
      validator: function (params) {
        return params.length > 0;
      },
      message: "department is required",
    },
  },
  name: String,
  salary: Number,
});

async function creatEmp() {
  const Employee = mongoose.model("Employee", empSchemma);
  const ahmed = new Employee({
    name: "donia",
    age: 20,
    salary: 1500,
    department: ["IT", "HR"],
  });
  try {
    const result = await ahmed.save();
  } catch (error) {
    console.log(error.message);
  }
}

creatEmp();
