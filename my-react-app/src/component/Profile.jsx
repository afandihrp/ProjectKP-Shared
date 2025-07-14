import React, { useState } from 'react';
import './Profile.css';
import { FiCamera } from 'react-icons/fi'; // Using react-icons for a modern camera icon
import defaultpic from '../assets/profile-default-svgrepo-com.svg'

export default function Profile(props) {
    const [name, setName] = useState('John Doe');
    const [phoneNumber, setPhoneNumber] = useState('+1 234 567 890');
    const [password, setPassword] = useState('**********');
    const [profileImage, setProfileImage] = useState(defaultpic); // Placeholder image

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div style={{ marginLeft: props.marginleft + 'px' }}>
            <div className='container'>
                <div className="profile-header">
                    <h2>Profile Settings</h2>
                    <p>Update your photo and personal details.</p>
                </div>

                <div className="profile-card">
                    <div className="profile-image-section">
                        <div className="profile-image-container">
                            <img src={profileImage} alt="Profile" className="profile-image" />
                            <label htmlFor="file-upload" className="camera-icon">
                                <FiCamera />
                            </label>
                            <input id="file-upload" type="file" onChange={handleImageChange} accept="image/*" />
                        </div>
                    </div>

                    <div className="profile-details-section">
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="button-group">
                            <button className="btn-save">Save Changes</button>
                            <button className="btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}