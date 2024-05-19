import React, { useEffect, useState } from 'react';
import Axios from './Config';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Form, Table } from 'react-bootstrap';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await Axios.get('/employees');
            setEmployees(response.data);
        } catch (error) {
            if (error.response?.status === 403) {
                navigate('/');
            } else {
                console.error('Error fetching employees:', error);
            }
        }
    };
    const handleLogin = async () => {
        try {

            navigate('/')
        } catch (error) {
            console.error(error); // Handle errors (optional)
        }
    };

    const handleAddEmployee = async () => {
        try {
            await Axios.post('/employees', { name, position, department });
            setName('');
            setPosition('');
            setDepartment('');
            fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleUpdateEmployee = async (id) => {
        try {
            await Axios.put(`/employees/${id}`, { name, position, department });
            setName('');
            setPosition('');
            setDepartment('');
            fetchEmployees();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await Axios.delete(`/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await Axios.post('/logout');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={handleLogin} >Let's DriEv</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <h2 className="main-heading text-center">Welcome to the Dashboard</h2>
                <Form className="mt-4">
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPosition" className="mt-2">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDepartment" className="mt-2">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="success" className="mt-3" onClick={handleAddEmployee}>
                        Add Employee
                    </Button>
                </Form>
                <h3 className="heading mt-5">Employee List</h3>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleUpdateEmployee(employee._id)}
                                    >
                                        Update
                                    </Button>
                                    {' '}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteEmployee(employee._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default Dashboard;
