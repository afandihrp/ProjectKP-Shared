require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const argon2 = require('argon2');
const cors = require('cors');
const db = require('./db');
const { stringify } = require('querystring');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

async function hashPassword(password) 
{
  try 
  {
    const hash = await argon2.hash(password);
    return hash;
  } 
  catch (err) 
  {
    // Handle error
    console.error(err);
  }
}

app.get('/hashexample',(req,res) => {  
  
  // Example usage:
  const myPassword = 'supersecretpassword';
  hashPassword(myPassword).then(hashedPassword => {
    res.status(200).json({hashedPassword});
    console.log('Hashed Password:', hashedPassword);
    // Store the hashedPassword in your database
  });
});

app.get('/hello', (req,res) => {
  res.send('hi!');
});

app.get('/get1', (req,res) => {
  res.status(200).json({status: 'bisa'})  
});

app.post('/logintest',async (req,res) => {
  const {email, password} = req.body;
  // console.log(req.body);
  // console.log(email);
  // console.log(password);
  if(!email || !password )
  {
    console.log(`invalid`);
    return res.status(400).send({status:'please insert valid credential'})
  }
  try
  {
    const {rows} = await db.query(`SELECT email,password FROM logindata WHERE email = $1`, [email]);
    // console.log(req.body);
    // console.log(rows);
    console.log(`${rows[0].email} == ${email}`);
    console.log(rows[0].email === email);
    console.log(`${rows[0].password} == ${password}`);
    console.log(rows[0].password === password);
     
    if(rows[0].email !== email || rows[0].password !== password)
    {
      console.log(`invalid`);
      return res.status(400).send({status:'invalid credential'});
      
      
    }
    else
    {
      console.log('login success')
            
      res.status(200).send({status:'login successful',
                           redirecturl: '/Dashboard'
      });
    }    
   
  }
  catch(err)
  {
    console.log('query failed');
    res.status(500).send({status:'error'})
  }

});

app.post('/submit', async (req,res) => {
  const {email, password} = req.body;
  
  if(!email || !password){
    console.log(`failed`);
    return res.status(400).send({status:'failed'})    
  }  
    
  try{
    await db.query(`INSERT INTO logindata (email, password) VALUES ($1, $2)`, [email, password]);
    console.log(`success add` +` `+ email +` `+ password);
    res.status(200).send({status:'success'})
  }
  catch{
    console.log('query failed');
    res.status(500).send({status:'failed'})
  }
});

app.post('/delete', async (req,res) => {
  const {email, password} = req.body;
  console.log("delete called: "+email);
  if(!email)
  {
    console.log('failed');
    return res.status(400).send({status:'failed'});
  }
  try
  {
    await db.query(`DELETE FROM logindata WHERE email = $1`, [email]);
    console.log(`success delete` +` `+ email +` `+ password);
    res.status(200).send({status:'success'});
  }
  catch(err)
  {
    console.log('query failed');
    res.status(500).send({status:'failed'});
  }
});



app.get('/getdata', async (req, res) => {
  try {
    // 1. Corrected the destructuring from {colums} to {rows}.
    //    Most Node.js database libraries (like 'pg') return results in a 'rows' property.
    const { rows } = await db.query('SELECT email, password FROM logindata');

    // 2. Corrected the logic to check if the 'rows' array exists and is not empty.
    if (rows && rows.length > 0) {
      // console.log(rows);
      // console.log(rows.length);

      // 3. Send the ENTIRE array of rows back as a single JSON response.
      //    This is the standard way to return a list of data.
      // res.status(200).json(rows);
      
      // for(const data of datas )
      // {
      //   res.status(200).send(`<h1>username: ${data[index].username} password: ${data.password}</h1>`);
      // }
      
      // 1. Use .map() to create an array of HTML strings
      // const htmlArray = rows.map(row => 
      //   `<h1>username: ${row.username} password: ${row.password}</h1>`
      // );

      // 2. Use .join('') to combine the array into a single string
      // const htmlString = htmlArray.join('');

      // 3. Send the complete string in one response
      // res.status(200).send(htmlString);

      res.status(200).json(rows);
    } else {
      // If no rows were found, send a 404 Not Found status.
      res.status(404).send('No data found');
    }
  } catch (err) {
    // This catch block is well-written for debugging. No changes needed.
    console.error(err.stack);
    res.status(500).send('Server Error: ' + err.message);
  }
});



app.post('/post1', (req,res) => {
  // res.status(200).json({status: 'bisa'})
  const {data, dataDouble} = req.body;
  if(!data && !dataDouble){
    return res.status(400).send({status:'failed'})
  }
  res.status(200).send({status:'success'})
  console.log(data +":"+ dataDouble)
})



// Change 'python' to 'python3'


// Always add an error handler to see these issues clearly

app.post('/execPython', (req,res) => {
  const {code} = req.body;
  if(!code){
    return res.status(400).send({status:'failed'})
  }

  console.log(code);
  const pythonProcess = spawn('python3', ['-c', code]);

  let scriptOutput = '';
  let scriptError = '';

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

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


