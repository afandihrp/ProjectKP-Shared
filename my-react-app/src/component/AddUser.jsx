import style from './AddUser.module.css';
import { tokenAPI } from '../App.jsx';
import { FaEdit, FaTrash } from 'react-icons/fa';
import React, { useState, useContext, useEffect } from 'react';



export default function AddUser(props) {
    const { getToken, newRefreshToken } = useContext(tokenAPI);

    // State for the input form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [mode, setMode] = useState('add');

    // State for the table data
    const [userdata, setUserdata] = useState([]);

    useEffect(() => {
        // ... (your data fetching logic remains the same)
        newRefreshToken().then(async () => {
            try {
                const res = await fetch('http://environment-relief.gl.at.ply.gg:24588/get/userData', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken().token}`
                    }
                });
                const response = await res.json();
                setUserdata(response);
            } catch (err) {
                console.log(`==error==\n` + err);
            }
        });
    }, []);

    const submitData = () => {
        newRefreshToken().then(async () => {
            try{
                const res = await fetch('http://environment-relief.gl.at.ply.gg:24588/post/submitUserData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken().token}`
                        }
                    });
            }
            catch(err){
                console.log(`==error==\n` + err);
            }
        });        
    }

    

    function edit(user) {
        // Set the state for each input field with the user's data
        setEmail(user.email);
        setName(user.name);
        setPhoneNumber(user.phonenumber);
        setRole(user.role);
        // Intentionally leave password blank for security
        setPassword('');
        setMode('edit');
    }

    function deleteData(user) {
        alert(`Deleting user with ID: ${user.id}`);
        // Here you would add your API call to delete the user
    }
    
    function clearForm() {
        setEmail('');
        setPassword('');
        setName('');
        setPhoneNumber('');
        setRole('');
        setMode('add');
    }

    function renderTable() {
        return userdata.map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>********</td>
                <td>{user.name}</td>
                <td>{user.phonenumber}</td>
                <td>{user.role}</td>
                <td>
                    <div className="button-group">
                        <button onClick={() => edit(user)} className="icon-button edit-button" aria-label="Edit item">
                            <FaEdit />
                        </button>
                        <button onClick={() => deleteData(user)} className="icon-button trash-button" aria-label="Delete item">
                            <FaTrash />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    }

    function Submit(){
        if(mode == 'add')
        {

        }
        else
        {

        }
    }

    return (
        <div className={style.container} style={{ marginLeft: props.marginleft + 'px' }}>
            <header>
                <h1>Add / Edit Users</h1>
            </header>
            
            {/* INPUT FORM - NOW CONTROLLED BY STATE */}
            <div className={style.inputForm}>
                <input className="box" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="box" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="box" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="box" type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <input className="box" type="text" placeholder="role" value={role} onChange={(e) => setRole(e.target.value)} />
                
                <input id="submit" type="submit" value={mode == 'add'? 'Submit' : 'Edit'} onClick={() => Submit()}/>
                <button type="button" onClick={clearForm}>Clear</button> {/* Added Clear Button */}
            </div>

            <div className={style.table}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}