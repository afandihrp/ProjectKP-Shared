const express = require('express');
const app = express();
const port = 4000;
const db = require('./db');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const cors = require('cors');
const { spawn } = require('child_process');

app.use(express.json());
app.use(cors());

const SECRET_KEY = '2e4c5d585ea22052d99d9b03205357be872ce2008b13d2f2c94da53ec1db3592'; //'procodecg' encrypted with sha256 
const SECRET_REFRESH_KEY= '48fec683db5cdb61f859f94b123b390340ad4680b000ed96fa92c051cc140cfe'; // 'refreshprocodecg' encrypted with sha256 

const userss = {
    "id": 67,
    "email": "test@test",
    "role": "student",
}

let refreshTokens = []

function generateToken(user)
{
    return jwt.sign(user, SECRET_KEY, {expiresIn: '10s'});    
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
    const user = {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
    }  
    const token = generateToken(user);
    console.log(`new token: ${token}`);
    res.status(200).send({"token": token, "user": user});
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
    
    const token = jwt.sign(user, SECRET_KEY);
    const refreshToken = generateRefreshToken(user)
    res.send({token, refreshToken});
});

// anything below this comment requires authentication//
app.use(verifyToken);
// anything below this comment requires authentication//

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

app.get('/test', async (req,res) => {
    res.status(200).send({message: "hi!"});
});

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

})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});