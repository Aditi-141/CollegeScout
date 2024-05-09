// src/Applications.js
import React, { useState, useEffect } from 'react';

const Applications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Fetch application data from the backend
        fetch('http://localhost:8000/applications') // Adjust the URL to your backend endpoint
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h2>Student Applications</h2>
            <ul>
                {applications.map((app, index) => (
                    <li key={index}>{app.student_nam}, {app.college_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Applications;
