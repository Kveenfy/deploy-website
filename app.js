const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbSevice');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


//app.get("/", (request, response)=> response.send("response.send"));

//create
app.post('/add', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data : data }))
    .catch(err => console.log(err));
});



//read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});


//edit
app.put('/update/:id', (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);

    result
    .then(data => response.json({ data : data }))
    .catch(err => console.log(err));
});

//delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteNameById(id);

    result
    .then(isDeleted => {
        if (isDeleted) {
            response.json({ success: true });
        } else {
            response.json({ success: false});
        }
    })
    .catch(err => console.log(err));
});

app.listen(8000, ()=> console.log("Готово"));