const client = require('./connection.js')
const express = require('express')
const cors = require('cors')
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
})

client.connect();

app.get('/blogs', (req, res)=>{
    client.query('select * from blogs', (err, result)=>{
        if(!err) {
            res.send(result.rows);
        }
    })
    //client.end;
});

app.get('/blogs/:id', (req, res)=>{
    client.query(`select * from blogs where id=${req.params.id}`, (err, result)=>{
        if(!err) {
            res.send(result.rows);
        }
    })
    //client.end;
});

app.post('/blogs', (req, res)=>{
    const blog = req.body;
    let insertQuery = `insert into blogs(title, content) values ('${blog.title}', '${blog.content}')`
    console.log(blog)

    client.query(insertQuery, (err, result)=>{
        if(!err) {
            res.send('Successful insert')
        } else {
            console.log(err.message)
        }
    })
    //client.end;
})

app.put('/blogs/:id', (req, res)=> {
    let blog = req.body;
    let updateQuery = `update blogs set title = '${blog.title}', content = '${blog.content}' where id=${req.params.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Successful update')
        }
        else{ console.log(err.message) }
    })
    //client.end;
})

app.delete('/blogs/:id', (req, res)=> {
    let insertQuery = `delete from blogs where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Successful deletion')
        }
        else{ console.log(err.message) }
    })
    //client.end;
})