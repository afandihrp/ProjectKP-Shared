import style from './AddUser.module.css';

import { FaEdit, FaTrash } from 'react-icons/fa';
import React, { useState, useContext, useEffect } from 'react';
import dataFetch from '../handleFetching.js'



export default function AddUser(props) {
    // State for the input form fields
    const [id, setId] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('student');
    const [mode, setMode] = useState('add');
    const [error, setError] = useState('');
    const [isDataReady, setIsDataReady] = useState(false);



    // State for the table data
    const [userdata, setUserdata] = useState([]);

    const refreshData = async() => {
        const payload = new dataFetch('/get/userData',null,'GET');
        const response = await payload.makeRequest();  
        if(!response.err)
        {
            setUserdata(response.data);                
        }
        setIsDataReady(true);
    }

    useEffect(() => {
        refreshData();        
    }, []);
   

    function edit(user) {
        // Set the state for each input field with the user's data
        setId(user.id);
        setEmail(user.email);
        setName(user.name);
        setPhoneNumber(user.phonenumber);
        setRole(user.role);
        // Intentionally leave password blank for security
        setPassword('');
        setMode('edit');
    }

    function deleteData(user) {
        // alert(`Deleting user with ID: ${user.id}`);
        
        if(window.confirm('Are you sure to delete this user? this action is irreversible')){
            newRefreshToken().then(async () => {
                const deleteUser = new dataFetch(`/submit/${user.id}`,null,`DELETE`);
                const response = await deleteUser.makeRequest();
                console.log(response);

            }).finally(()=>{
                clearForm();
                refreshData();
            })
            
        }   
    }
    
    function clearForm() {
        setEmail('');
        setPassword('');
        setName('');
        setPhoneNumber('');
        setRole('student');
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

    async function Submit(){

        if(mode == 'add')
        {
            const body = {
                email: email,
                password: password,
                name: name,
                phonenumber: phonenumber,
                role: role
            }
            
            const submitAdd = new dataFetch(`/submit/${id}`,body,`POST`);
            await submitAdd.makeRequest().then((response)=> {
                console.log(JSON.stringify(response));
                setError(response.data.message);

            }).finally(() => {
                clearForm();
                refreshData();

            })
            

        }
        else if(mode == 'edit')
        {
            const body = {
                email: email,
                name: name,
                phonenumber: phonenumber,
                role: role
            }
            
            const Edit = new dataFetch(`/submit/${id}`,body,`PATCH`);
            await Edit.makeRequest().then((response)=> {
                console.log(JSON.stringify(response));

            }).finally(() => {
                clearForm();
                refreshData();

            })
                
            
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
                <input className="box" type="text" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <select 
                    className="box" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                
                <input id="submit" type="submit" value={mode == 'add'? 'Submit' : 'Edit'} onClick={() => Submit()}/>
                <input id="clear" type="submit" value="Clear" onClick={clearForm} />
                <p>{error}</p>

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
                        {isDataReady? renderTable() : (<tr><td>Loading...</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}