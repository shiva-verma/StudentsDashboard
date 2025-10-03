import React, { useState, useEffect } from 'react';
import './CreateAdmin.css';

const CreateAdmin = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeName: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Role check (replace with your auth system)
  useEffect(() => {
    if (currentUser?.role !== 'super-admin') {
      setError('Unauthorized access. Only Super Admins can create admins.');
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser?.role !== 'super-admin') {
      setError('Access denied');
      return;
    }

    // TODO: Submit to your backend API
    console.log('Creating admin:', formData);
    setSuccess('Admin created successfully!');
    setError('');
    setFormData({
      fullName: '',
      email: '',
      collegeName: '',
      username: '',
      password: '',
    });
  };

  if (currentUser?.role !== 'super-admin') {
    return <div className="unauthorized">🚫 Access Denied</div>;
  }

  return (
    <div className="create-admin-container">
      <form className="create-admin-form" onSubmit={handleSubmit}>
        <h2>Create New Admin</h2>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>College Name</label>
        <input
          type="text"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          required
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
};

export default CreateAdmin;
