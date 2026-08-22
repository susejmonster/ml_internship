import pg from 'pg'
const { Pool } = pg
import 'dotenv/config'
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
})

const getUsers = async (request, response) => {
  try {
    const results = await pool.query('SELECT * FROM employees ORDER BY employeeid ASC')
    response.status(200).json(results.rows)
  } catch (error) {
    throw error
  }
}


const createEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    departmentId,
    salary,
    hireDate,
  } = req.body;

  try {
    const query = `
      INSERT INTO Employees (FirstName, LastName, DateOfBirth, Gender, DepartmentID, Salary, HireDate)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      firstName,
      lastName,
      dateOfBirth,
      gender,
      departmentId,
      salary,
      hireDate,
    ];

    const results = await pool.query(query, values);

    res.status(201).json({
      message: `Employee added with ID: ${results.rows[0].employeeid}`,
      employee: results.rows[0],
    });
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json({ error: error.message });
  }
};


export {
  getUsers,
  createEmployee
}