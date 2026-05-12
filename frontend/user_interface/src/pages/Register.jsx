import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/register`, formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (error) {
            alert("Registration failed: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-section">
            <h1>Create Account</h1>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Choose a username" required 
                            onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password" required 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Register;
