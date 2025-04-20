'use client';
import React, { useState } from 'react'
import '../globals.css'
import { employees } from '@/components/Employees';

interface employeeType {
    id: number;
    name: string;
    age: number;
    address: string;
    email: string;
    mobile: string;
    dob: string;
};

function Home() {
    const [employeeList, setEmployeeList] = useState<employeeType[]>(employees);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<employeeType | null>(null);
    const [newEmployee, setNewEmployee] = useState<employeeType>({
        id: 0,
        name: '',
        age: 0,
        address: '',
        email: '',
        mobile: '',
        dob: ''
    });
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchedEmployees, setSearchedEmployees] = useState<employeeType[]>([]);


    const addEmployee = () => {
        setShowForm(true);
    }
    const employeeDetail = (id: number) => {
        const employee = employeeList.find(emp => emp.id === id);
        if (employee) {
            setSelectedEmployee(employee);
            setShowDetail(true);
            setShowForm(false); 
        }
    }
    const deleteEmployee = (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return;

        const updatedList = employeeList.filter(emp => emp.id !== id);
        setEmployeeList(updatedList);

        if (selectedEmployee && selectedEmployee.id === id) {
            setSelectedEmployee(null);
            setShowDetail(false);
        }

        alert("Employee deleted successfully!");
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { placeholder, value } = e.target;
        setNewEmployee((prev) => {
            return {
                ...prev,
                [placeholder.toLowerCase().replace(/ /g, '')]:
                    (placeholder === 'ID' || placeholder === 'Age') ? Number(value) : value
            };
        });


    }
    const handleSubmit = () => {
        if (!newEmployee.id || !newEmployee.name) {
            alert("Id and Name can't be empty")
            return;
        }
        const flag = employeeList.some(emp => emp.id === newEmployee.id);
        if (flag) {
            alert("Employee with this ID already exists! Please use some different id");
            return;
        }
        setEmployeeList([...employeeList, newEmployee]);
        alert("Your Details Added Successfully");
        setNewEmployee(
            {
                id: 0,
                name: '',
                age: 0,
                address: '',
                email: '',
                mobile: '',
                dob: ''
            }
        );
        setShowForm(false);

    }

    const handleSearch = () => {
        const filtered = employeeList.filter(emp =>
            emp.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filtered.length === 0) {
            alert("No result found");
        }
        setSearchQuery("");
        setSearchedEmployees(filtered);

    };

    return (
        <div>
            <div className="header">
                <h1>Employee Database System</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchQuery}
                        placeholder="Search by name"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={() => { setSearchedEmployees([]); setSearchQuery(''); }}>
                        Clear
                    </button>
                </div>
                <button onClick={addEmployee}>Add Employee</button>
            </div>
            <div className="main">
                <div className='left-menu'>
                    <h3 style={{ alignItems: "center", textAlign: "center" }}>Employee List</h3>
                    <ul>
                        {employeeList.map((employee) => {
                            return (
                                <li key={employee.id}>
                                    <div className="employees">
                                        <span className='employee-name'>{employee.name}</span>
                                        <div className="employee-buttons">
                                            <button onClick={() => employeeDetail(employee.id)}>Detail</button>
                                            <button style={{ backgroundColor: "red" }} onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                </div>
                <div className="right-menu">

                    {searchedEmployees.length > 0 && (
                        <div className="search-results">
                            <h3>Search Results</h3>
                            <ul>
                                {searchedEmployees.map((employee) => (
                                    <li key={employee.id}>
                                        <div className="employees">
                                            <span className='employee-name'>{employee.name}</span>
                                            <div className="employee-buttons">
                                                <button onClick={() => employeeDetail(employee.id)}>Detail</button>
                                                <button style={{ backgroundColor: "red" }} onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                    }

                    {showForm &&
                        <div className='user-input-form'>
                            <input type="text" placeholder="ID" value={newEmployee.id === 0 ? '' : newEmployee.id} onChange={(e) => handleChange(e)} />
                            <input type="text" placeholder="Name" value={newEmployee.name} onChange={(e) => handleChange(e)} />
                            <input type="text" placeholder="Age" value={newEmployee.age === 0 ? '' : newEmployee.age} onChange={(e) => handleChange(e)} />
                            <input type="text" placeholder="Address" value={newEmployee.address} onChange={(e) => handleChange(e)} />
                            <input type="text" placeholder="Email" value={newEmployee.email} onChange={(e) => handleChange(e)} />
                            <input type="text" placeholder="Mobile Number" value={newEmployee.mobile} onChange={(e) => handleChange(e)} />
                            <input type="text" placeholder="Date of Birth" value={newEmployee.dob} onChange={(e) => handleChange(e)} />
                            <button onClick={handleSubmit}>Save</button>
                        </div>
                    }
                    {showDetail && selectedEmployee && (
                        <div className='employee-details'>
                            <h3>Employee Details</h3>
                            <img src="ghibli.png" alt="Random Image" style={{ height: "140px", width: "140px", borderRadius: "50%" }} />
                            <p><strong>ID:</strong> {selectedEmployee.id}</p>
                            <p><strong>Name:</strong> {selectedEmployee.name}</p>
                            <p><strong>Age:</strong> {selectedEmployee.age}</p>
                            <p><strong>Address:</strong> {selectedEmployee.address}</p>
                            <p><strong>Email:</strong> {selectedEmployee.email}</p>
                            <p><strong>Mobile:</strong> {selectedEmployee.mobile}</p>
                            <p><strong>Date of Birth:</strong> {selectedEmployee.dob}</p>
                            <button onClick={() => setShowDetail(false)}>Close</button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Home
