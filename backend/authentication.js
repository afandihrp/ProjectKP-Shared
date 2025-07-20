const express = require('express');
const app = express();
const port = 4000;
const db = require('./db');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const SECRET_KEY = '2e4c5d585ea22052d99d9b03205357be872ce2008b13d2f2c94da53ec1db3592'; //'procodecg' encrypted with sha256 
const SECRET_REFRESH_KEY= '48fec683db5cdb61f859f94b123b390340ad4680b000ed96fa92c051cc140cfe'; // 'refreshprocodecg' encrypted with sha256 

let refreshTokens = []

function generateToken(user)
{
    return jwt.sign(user, SECRET_KEY, {expiresIn: '5m'});    
}

function generateRefreshToken(user)
{
    const token = jwt.sign(user, SECRET_REFRESH_KEY);
    refreshTokens.push(token);
    return token;
}

function verifyToken(req,res,next)
{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(!token) app.status(401).send('Unauthorized');
    jwt.verify(token,SECRET_KEY,(err, user) => {
        if(err) return res.status(403).send(`Forbidden: ${err}`);
        req.user = user;
        next();
    });
    
}

function verifyRefreshToken(req,res,next)
{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(!refreshTokens.includes(token) || !token) return res.status(403).send('Forbidden: Invalid refresh token');
    // return res.status(401).send('Unauthorized');
    if(!token) app.status(401).send('Unauthorized');
    jwt.verify(token,SECRET_REFRESH_KEY,(err, user) => {
        if(err) return res.status(403).send(`Forbidden: ${err}`);
        req.user = user;
        next();
    });
    
}


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
        const user = {
            id: rows[0].id,
            email: rows[0].email,
            role: rows[0].role
        }     
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).send({"token": token, "refreshToken": refreshToken});
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send(`Error: ${err.message}`);
    }
});

app.post('/login/refresh', verifyRefreshToken, (req,res) => {
    const token = generateToken(req.user);
    res.status(200).send({"token": token, "user": req.user});
});

app.post('/login/logout', (req,res) =>{
    const refreshToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.send('Refresh token deleted '+ JSON.stringify(refreshTokens));
});

app.get('/getEternalToken',(req,res) => {
    const user = {
            id: 67,
            email: "test@test",
            password: "$argon2id$v=19$m=65536,t=3,p=4$g/MiFcIrSkKXV3AmqNoVMg$O5ZRep559UB0DSEDIzkOG0r39+jdzkehgf8wLtnrxKM",
            role: "student"
        }
    
    const token = jwt.sign(user,SECRET_KEY);
    res.send({token});
});

// anything below this comment requires authentication//
app.use(verifyToken);
// anything below this comment requires authentication//


app.post('/users', async (req,res) => {
    const {rows} = await db.query('SELECT * FROM login_credentials');
    console.log(`User found: ${JSON.stringify(rows[0])}`);
    res.send(rows);
});

app.get('/test', async (req,res) => {
    res.send('Hi :3');

    // try
    // {
    //     const {rows} = await db.query('select id,email,password,role from login_credentials');
    //     console.log(rows);
    //     res.send({status: 'success', data: rows});

    // }
    // catch(err)
    // {
    //     console.error(err);
    //     return res.send(`Error: ${err.message}`);
    // }
});

app.post('/getUserInfo', async (req,res) => {

})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});