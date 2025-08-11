const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;
const db = require('./db');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const cors = require('cors');
const { spawn } = require('child_process');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './pictureStorage')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  
})

const upload = multer({ storage: storage });


app.use(express.json());
app.use(cors({
  origin: ['http://thing-fountain.gl.at.ply.gg:49108','http://localhost:5173'], // The exact frontend URL
  credentials: true
}));
app.use(cookieParser());

const SECRET_KEY = '2e4c5d585ea22052d99d9b03205357be872ce2008b13d2f2c94da53ec1db3592'; //'procodecg' encrypted with sha256 
const SECRET_REFRESH_KEY= '48fec683db5cdb61f859f94b123b390340ad4680b000ed96fa92c051cc140cfe'; // 'refreshprocodecg' encrypted with sha256 

let refreshTokens = [`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTcsImVtYWlsIjoiYWRtaW5AYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTQ1NTQzODd9.riJnLobCWwVVa-o4CH9G4nJM2AdtA0huybxmd8YpI4k`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTcsImVtYWlsIjoiYWRtaW5AYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTQ1NjM1ODV9.zVv9k7xhF8wTOVfMHJd4Bybn4HmiDGuPUVX1dn2G9Q0`]

app.use((req, res, next) => {
    console.log(`\n\n//========NEW REQUEST========//`);
    console.log(`URL: ${req.url}`);
    console.log(`Method: ${req.method}`);
    console.log(`Date: ${JSON.stringify(Date())}`);
    const cookies = req.headers.cookie&&req.headers.cookie.split(';');
    console.log(`Cookies: ${cookies}`);
    const body = req.body && req.body;
    if(body != undefined)
    {
        console.log(`Body: ${JSON.stringify(body)}`);
    }
    console.log(`//===========================//\n`);
    next();
});

//==============================================================//=>

function generateToken(user)
{
    return jwt.sign(user, SECRET_KEY, {expiresIn: '10s'});    
}

//==============================================================//=>

function generateRefreshToken(user)
{
    const token = jwt.sign(user, SECRET_REFRESH_KEY);
    refreshTokens.push(token);
    return token;
}

//==============================================================//=>

function verifyToken(req,res,next)
{
    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];'
    const token = req.cookies.token&&req.cookies.token || req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send('Unauthorized');
    jwt.verify(token,SECRET_KEY,(err, user) => {
        if(err) return res.status(403).send(`Forbidden: ${err}`);
        req.user = user;
        next();
    });
    
}

//==============================================================//=>
//=> verify the refresh token
//==============================================================//=>

function verifyRefreshToken(req,res,next)
{
    
    // console.log(`\n\nokeee\n\n`);

    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(`refreshToken: ${req.cookies.refreshToken}`)
    const token = req.cookies.refreshToken&&req.cookies.refreshToken || req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(!refreshTokens.includes(token) || !token){ 
        console.log('Unauthorized: Invalid refresh token'); 
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        // res.redirect('https://www.google.com');
        return res.status(401).send('Unauthorized: Invalid refresh token'); 
        // return res.status(302).redirect('https://www.google.com')
    }
    jwt.verify(token,SECRET_REFRESH_KEY,(err, user) => {
        if(err) return res.status(403).send(`Forbidden: ${err}`);
        req.user = user;
        next();
    });
    
}

//==============================================================//=>
//=> setcookie
//==============================================================//=>
    

/**
 * @param {object} response res obj
 * @param {string} cookieValue cookie value in string.
 * @param {string} cookieName cookie name in string.
 * @param {number} cookieAge cookie age in seconds, when set to null then the age is infinite.
 * @example -> setCookie( response , cookieValue , cookieName , cookieAge )
 */
function setCookie(res, cookieValue, cookieName, cookieAge)
{  
    if(!cookieValue || !cookieName) return false;

    const option ={
        httpOnly: true,
        secure: false,
        path: '/',
        // domain: '.gl.at.ply.gg',
        // sameSite: 'strict'
    }

    if(cookieAge != null)
    {
        option.maxAge = cookieAge * 1000;
    }
    res.cookie(cookieName, cookieValue, option);
    return true;

}

//==============================================================//=>
//=>                           require admin
//==============================================================//=> 

function requireAdmin(req,res,next){
    console.log(req.user.role);
    req.user.role === 'admin' ? next() : res.status(403).send('Forbidden');
}

//==============================================================//=>
//=>                             /login/auth
//==============================================================//=>

app.post('/login/auth', async (req,res) => {
    const {email, password} = req.body;
    try
    {   
        // console.log(`email: ${email}, password: ${password}`);
        const {rows} = await db.query('SELECT * FROM login_credentials WHERE email = $1', [email]);
        if(!rows) return res.status(404).send('User not found');
        const verifyPassword = await argon2.verify(rows[0].password, password);     
        if(!verifyPassword)
        {
            return res.status(400).send('Invalid password');  
        } 
        // id.push(rows[0].id);
        const user = {
            id: rows[0].id,
            email: rows[0].email,
            role: rows[0].role
        }     
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        setCookie(res,token,'token',10);
        setCookie(res,refreshToken,'refreshToken',null);
        res.status(200).send({"token": token, "refreshToken": refreshToken});
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send(`Error: ${err.message}`);
    }
});

//==============================================================//=>
//=> /login/refresh
//==============================================================//=> 

app.get('/login/refresh', verifyRefreshToken, (req,res) => {
    // console.log(req.cookies.refreshToken);
    const user = {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
    }  
    const token = generateToken(user);
    console.log(`new token: ${token}`);
    setCookie(res,token,'token',10);
    res.status(200).send({"token": token, "user": user});
});

//==============================================================//=>
//=> logout
//==============================================================//=>

app.get('/login/logout', (req,res) =>{
    console.log('ok');
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.send('Refresh token deleted ');
});

//==============================================================//=>
//=>
//==============================================================//=>

app.get('/getEternalToken',(req,res) => {
    const user = {
            id: 67,
            email: "test@test",
            password: "$argon2id$v=19$m=65536,t=3,p=4$g/MiFcIrSkKXV3AmqNoVMg$O5ZRep559UB0DSEDIzkOG0r39+jdzkehgf8wLtnrxKM",
            role: "admin"
        }
    
    const token = jwt.sign(user, SECRET_KEY);
    const refreshToken = generateRefreshToken(user)
    res.send({token, refreshToken});
});


//============================================================================================//=>
// anything below this comment requires authentication//
//   _______    _              _____                  _              _ 
//  |__   __|  | |            |  __ \                (_)            | |
//     | | ___ | | _____ _ __ | |__) |___  __ _ _   _ _ _ __ ___  __| |
//     | |/ _ \| |/ / _ \ '_ \|  _  // _ \/ _` | | | | | '__/ _ \/ _` |
//     | | (_) |   <  __/ | | | | \ \  __/ (_| | |_| | | | |  __/ (_| |
//     |_|\___/|_|\_\___|_| |_|_|  \_\___|\__, |\__,_|_|_|  \___|\__,_|
//                                           | |                       
//                                           |_|                       
app.use(verifyToken);
//============================================================================================//=>

app.get('/testing',(req,res)=>{
    console.log('hellow');
    return res.status(200).send({message: `hi!`});

})

//==============================================================//=>
//=> get the user information coresponding to that id
//==============================================================//=>

app.post('/users', async (req,res) => {
    const id = req.user.id;
    try
    {
        const {rows} = await db.query('SELECT id,email,name,phonenumber,role FROM login_credentials where id = $1', [id]);
        console.log(`User found: ${JSON.stringify(rows[0])}`);
        res.status(200).send(rows);
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send(`Error: ${err.message}`);
    }    
});

//==============================================================//=>
//=> execute python codes
//==============================================================//=>


app.post('/execPython', (req,res) => {
  const {code} = req.body;
  if(!code){
    return res.status(400).send({status:'failed'})
  }
  console.log(code);
  let scriptOutput = '';
  let scriptError = '';

  setTimeout(() => {
    const pythonProcess = spawn('python3', ['-c', code]);

    pythonProcess.on('error', (err) => {
      console.error('Failed to start subprocess.', err);
      res.status(500).json({
          status: 'error', 
          Output: '', 
          Error: `Failed to start subprocess: ${err.message}`
      });
    });

    // Listen for data on stdout
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data.toString()}`);
        scriptOutput += data.toString();
    });

    // Listen for data on stderr
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        scriptError += data.toString();
    });

    // Wait for the process to close before sending response
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        console.log('Captured output:', scriptOutput);
        console.log('Captured error:', scriptError);
        
        // Send response after process is complete
        res.status(200).json({
            status: code === 0 ? 'success' : 'error',
            Output: scriptOutput,
            Error: scriptError
        });
    });

    // Handle process exit
    pythonProcess.on('exit', (code, signal) => {
        if (signal) {
            console.log(`Python process was killed by signal ${signal}`);
        }
    });

  }, 1000);  

});

//==============================================================//=>
//=> get front page data for that specific id
//==============================================================//=>

app.get('/frontpage/:id',async (req,res) => {
    const id = req.params.id;
    // console.log(id);
    try{
        const query=`SELECT * FROM frontpage WHERE user_id = $1`;                             
        const values = [id];
        const { rows, rowCount } = await db.query(query,values);
        // console.log(rows);
        if (rowCount > 0) {
                       
            res.status(201).json({ 
                message: rows[0]
            });
        } 
        else {
            // No row was inserted, which means the email already exists.
            res.status(409).json({ error: 'user with that id didn`t exist' });
        } 
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
})

app.post('/frontpage/:parameter/:id',async (req,res) => {
    const id = req.params.id;
    const parameter = req.params.parameter;
    if(parameter === 'id') return res.status(403).send('forbidden');
    const data = req.body != null ? req.body: null;
    console.log(id);
    console.log(data);
    try{
        const query=`  
            UPDATE frontpage
            SET ${parameter} = $1::jsonb
            WHERE user_id = $2        
        `;                             
        const values = [JSON.stringify(data),id];
        const { rows, rowCount } = await db.query(query,values);
        // console.log(rows);
        if (rowCount > 0) {
            // The user was successfully created.
            
            res.status(201).json({ 
                message: 'ok'
            });
        } 
        else {
            // No row was inserted, which means the email already exists.
            res.status(409).json({ error: 'user with that id didn`t exist' });
        } 
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
})

app.get('/Course',async (req,res)=>{
    try{
        const {rows} = await db.query('SELECT id, title, description, icon, color, available, modules FROM course');
        res.status(200).send(rows);
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }

})

app.patch('/frontpage/:id',async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    const path = req.query.path.split('_');
    console.log(id);
    console.log(JSON.stringify(path));
    res.send(`id: ${id} path: ${path}`);
    try{
        const query=`  
            UPDATE frontpage
            SET quickstats = jsonb_set(quickstats, $1::text[], $2::jsonb)
            WHERE user_id = $2        
        `;                             
        const values = [JSON.stringify(data),id];
        const { rows, rowCount } = await db.query(query,values);
        console.log(rows);
        if (rowCount > 0) {
            // The user was successfully created.
            
            res.status(201).json({ 
                message: 'ok'
            });
        } 
        else {
            // No row was inserted, which means the email already exists.
            res.status(409).json({ error: 'user with that id didn`t exist' });
        } 
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
})


//============================================================================================//=>
// anything below this comment requires admin Permissions
//               _           _         _____                  _              _ 
//      /\      | |         (_)       |  __ \                (_)            | |
//     /  \   __| |_ __ ___  _ _ __   | |__) |___  __ _ _   _ _ _ __ ___  __| |
//    / /\ \ / _` | '_ ` _ \| | '_ \  |  _  // _ \/ _` | | | | | '__/ _ \/ _` |
//   / ____ \ (_| | | | | | | | | | | | | \ \  __/ (_| | |_| | | | |  __/ (_| |
//  /_/    \_\__,_|_| |_| |_|_|_| |_| |_|  \_\___|\__, |\__,_|_|_|  \___|\__,_|
//                                                   | |                       
//                                                   |_|                       
app.use(requireAdmin);
//============================================================================================//=>





app.post('/Course', async (req,res) =>{
    const {title, description, icon, color, available, modules} = req.body;
    console.log(req.body);
    // res.json(`title: ${title}\ndescription: ${description}\nicon: ${icon}\ncolor: ${color}\navailable: ${available}\n `);

    try{
        const query =  `INSERT INTO course (title, description, icon, color, available, modules) 
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING id;`;
        const values = [title, description, icon, color, available, JSON.stringify(modules)];
        const result = await db.query(query, values);
        const {rows, rowCount} = result;
        res.status(200).send('ok\n'+ rows[0]);        
        console.log(rows[0]);
        
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(`==Error==: ${err.message}`);
    
    }

})

app.patch('/Course/:id', async (req,res)=>{
    const id = req.params.id && req.params.id;
    // if(!id) return res.status(400).send('bad request, id is missing');
    const {title, description, icon, color, available, modules=[]} = req.body;
    console.log(req.body);
    // Validasi harus memeriksa keberadaan properti, bukan truthiness-nya.
    // 'available: false' adalah input yang valid.
    if (title === undefined || description === undefined || icon === undefined || color === undefined || available === undefined) {
        return res.status(400).send('Bad request: Missing one or more required fields (title, description, icon, color, available).');
    }

    try
    {
        const query = ` UPDATE course
                        SET title = $1, description = $2, icon = $3, color = $4, available = $5, modules = $6
                        WHERE id = $7;`;
        const values = [title, description, icon, color, available, JSON.stringify(modules), id];
        const result = await db.query(query, values);
        // console.log(result);
        const {rows, rowCount} = result;
        if(rowCount>0){
            res.status(200).send('ok');
        }
        else{
            res.status(404).send('course with that id was not found');
        }     

    }
    catch(err)
    {
        res.status(500).send(`==Error==: ${err.message}`);
    }

});

app.patch('/Course/modules/:id', async (req,res) =>{
    const id = req.params.id;
    const {modules} = req.body;
    console.log(req.body);
    // res.json(modules);
    try{
        const query =  `UPDATE course 
                        SET modules = $1::jsonb
                        WHERE id = $2;`;
        const values = [JSON.stringify(modules),id];
        const result = await db.query(query, values);
        const {rowCount} = result;
        if(rowCount>0){
            res.status(200).send('ok');
        }
        else{
            res.status(404).send('fail');
        }
        
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
})

app.patch('/Course/modules/:id/:operation', async (req,res) =>{

    const id = req.params.id;
    const operation = req.params.operation;
    const operations = [
        'add_module_title',
        'delete_module_title',
        'add_lesson',
        'test'
    ];
    if(!operations.includes(operation)) return res.status(400).send('bad request');

    // switch 

    // let template1 = [
    //     {
    //         id: 0,
    //         moduleTitle: "Hi!",
    //         lessons: []
    //     },
    // ]
    // const lesson = [];
    // template1[0].moduleTitle = req.body.moduleTitle;
    // console.log(template[0].moduleTitle);

    // SELECT jsonb_build_object(
    //   'id', 0,
    //   'moduleTitle', 'Hi!',
    //   'lessons', '[]'::jsonb
    // );

    // SELECT
    //   COALESCE(MAX((element ->> 'id')::integer), 0) + 1 AS next_module_id
    // FROM
    //   courses,
    //   jsonb_array_elements(modules) AS element;

    try{
        let query = '';
        let values = [];
        
        switch (operation){
            case `add_module_title`:
                // template1[0].moduleTitle = req.body.moduleTitle;
                // query =  `UPDATE course
                //         SET modules = modules || $1::jsonb
                //         WHERE id = $2;`;
                query =`WITH new_module_data AS (
                        
                        SELECT
                            COALESCE(MAX((elem ->> 'id')::integer), 0) + 1 AS next_id
                        FROM
                            course,
                            LATERAL jsonb_array_elements(modules) AS elem
                        WHERE
                            id = $2 
                        )
                        UPDATE course
                        SET
                        
                        modules = modules || jsonb_build_object(
                            'id', (SELECT next_id FROM new_module_data),
                            'moduleTitle', $1::text,
                            'lessons', '[]'::jsonb
                        )
                        WHERE id = $2
                        RETURNING modules;`;
                values = [req.body.moduleTitle,id];

            break;

            case 'delete_module_title':
                const module_id = req.body.id;
                if(module_id === undefined) return res.status(400).send('bad request: module id missing');
                query=`UPDATE course
                        SET modules = COALESCE(
                            (
                                SELECT jsonb_agg(element)
                                FROM jsonb_array_elements(modules) AS element
                                WHERE (element ->> 'id')::integer <> $1::integer
                            ),
                            '[]'::jsonb
                        )
                        WHERE id = $2
                        RETURNING modules;`;
                values = [module_id, id]
            break;

            case `add_lesson`:
                const lesson = req.body.content || [];
                const module_id1 = req.body.id&&req.body.id;
                if(!module_id1) return res.status(400).send('bad request: module id missing');

                query =`UPDATE course
                        SET modules = (
                        
                            SELECT
                                jsonb_agg(
                                CASE
                                    WHEN (element ->> 'id')::integer = $1 THEN
                                    
                                    jsonb_set(element, '{lessons, -1}', $2::jsonb, true)
                                    ELSE
                                    element
                                END
                                )
                            FROM
                                jsonb_array_elements(modules) AS element -- This FROM belongs to the subquery
                        )
                        WHERE
                        id = $3; -- This WHERE filters which course row to update`;
                values = [module_id1,JSON.stringify(lesson),id];

            break;
            case `test`:
                query =`SELECT
                        MAX((element ->> 'id')::integer) + 1 AS next_module_id
                        FROM
                        course,jsonb_array_elements(modules) AS element;`;
                values = [];
            break
        }
        const result = await db.query(query, values);
        const {rows,rowCount} = result;
        if(rowCount>0){
            // Kirim kembali objek modul yang sudah diperbarui
            res.status(200).json(rows[0]);
        }
        else{
            res.status(404).send('fail');
        }
        
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
})

app.delete('/Course/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const query = `DELETE FROM course WHERE id = $1`;
        const values = [id];
        const { rowCount } = await db.query(query, values);
        if (rowCount > 0) {
            res.status(200).json({ 
                message: 'Course deleted successfully', 
            });
        } 
        else {
            res.status(404).json({ 
                message: 'Course not found'
            });
        }

    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
    
})
        




app.post('/submit', async (req,res) => {
    const {email, password, name, phonenumber,role} = req.body;
    console.log(req.body);
    if(!email || !password) return res.status(400).send({status:'please insert correct credentials'});
    const trimmedEmail = email.trimLeft();
    const trimmedPassword = password.trimLeft();
    // console.log(email,password,name,phonenumber,role);

    const template = [
        {
        title: "Active Courses",
        value: "0"
        },
        {
        title: "Progress",
        value: "0%"
        },
        {
        title: "Study Time",
        value: "0h"
        }    
    ];


    try{
        const hashedPassword = await argon2.hash(trimmedPassword); 
        console.log(hashedPassword);
        
        const query1 = `INSERT INTO login_credentials (email, password, name, phonenumber, role)
                        VALUES ($1, $2, $3, $4, $5)
                        ON CONFLICT (email) DO NOTHING

                        RETURNING id;`;
        const values1 = [trimmedEmail, hashedPassword, name, phonenumber,role];
        const res1 = await db.query(query1, values1);
        if(!res1.rowCount > 0) return res.status(409).json({status:'that email already exist'+res1.rows[0].id})

        const query2 = `INSERT INTO frontpage (user_id, quickstats, continuelearnig, recentActivity) 
                        VALUES ($1, $2, $3, $4)
                        ON CONFLICT (user_id) DO NOTHING;`;

        const values2 = [res1.rows[0].id, JSON.stringify(template),[],[]];
        const res2 = await db.query(query2, values2);

        console.log(res1.rows[0].id);
        console.log(res2);

        res.status(200).json({status:'query success'});
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
})

app.delete(`/submit/:id`, async (req,res) => {
    const id = req.params.id;
    try{
        const query = `delete from login_credentials where id = $1`;
        const values = [id];
        const { rowCount } = await db.query(query, values);
        if (rowCount > 0) {
            // The user was successfully deleted.
            res.status(200).json({ 
                message: 'User deleted successfully', 
            });
        } 
        else {
             res.status(404).json({ 
                message: 'User not found', 
            });
        }
        
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
})

app.patch(`/submit/:id`, async (req,res) => {
    const id = req.params.id;
    const {email, name, phonenumber,role} = req.body;
    try{
        const query = `update login_credentials set email = $1, name = $2, phonenumber = $3, role = $4 where id = $5`;
        const values = [email,name, phonenumber, role, id];
        const { rowCount } = await db.query(query, values);
        if (rowCount > 0) {
            // The user was successfully deleted.
            res.status(200).json({ 
                message: 'User Updated successfully', 
            });
        } 
        else {
             res.status(404).json({ 
                message: 'User not found', 
            });
        }
        
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }
});

app.get('/get/userData', async (req,res) => {
    try
    {
        const {rows} = await db.query('SELECT * FROM login_credentials');
        if(!rows) return res.status(404).send('no data');
        res.status(200).send(rows);

    }
    catch(err)
    {
        res.status(500).send(`==Error==:\n ${err.message}`);
    }
})

app.post('/post/submitUserData', async (req,res) => {
    const {id, email, phoneNumber, name, role} = req.body;
    try{
        const status = await db.query('UPDATE login_credentials SET name = $1, email = $2, phonenumber = $3, role = $4 WHERE id = $5', [name, email, phoneNumber, role, id]);
        console.log(status);
    }
    catch(err){
        res.status(500).send(`==Error==: ${err.message}`);
    }

})




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});