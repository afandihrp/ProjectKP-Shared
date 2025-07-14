import React, { useState, useEffect } from 'react';
import { FiCamera, FiUser, FiPhone, FiLock } from 'react-icons/fi';
import './Profile.css';

export default function Profile(props) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('data:image/png;base64,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');

    useEffect(() => {
        // Simulated cookie data
        setName('John Doe');
        setPhoneNumber('+1 (555) 123-4567');
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = () => {
        // Handle save logic here
        console.log('Profile saved:', { name, phoneNumber, password });
    };

    const handleCancel = () => {
        // Handle cancel logic here
        console.log('Changes cancelled');
    };

    return (
        <div style={{ marginLeft: props.marginleft + 'px' }}>
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Profile Settings</h1>
                    <p>Manage your account information and preferences</p>
                </div>

                <div className="profile-card">
                    <div className="profile-image-section">
                        <div className="profile-image-container">
                            <img src={profileImage} alt="Profile" className="profile-image" />
                            <label htmlFor="file-upload" className="camera-overlay">
                                <FiCamera size={20} />
                            </label>
                            <input 
                                id="file-upload" 
                                type="file" 
                                onChange={handleImageChange} 
                                accept="image/*" 
                                className="file-input"
                            />
                        </div>
                        <div className="image-text">
                            <h3>Profile Photo</h3>
                            <p>Click to update your profile picture</p>
                        </div>
                    </div>

                    <div className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">
                                <FiUser size={16} />
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">
                                <FiPhone size={16} />
                                Phone Number
                            </label>
                            <input 
                                type="tel" 
                                id="phone" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <FiLock size={16} />
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="button-group">
                            <button className="btn-primary" onClick={handleSave}>
                                Save Changes
                            </button>
                            <button className="btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}