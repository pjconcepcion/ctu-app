const router = require('express').Router();
const e = require('express');
const sql = require("mssql/msnodesqlv8")

/**
 * Index
 */
router.route('/').get((req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM USERS', (err,result) => {
        if(err){
            res.status(400).json(`Error: ${err}`)
        }else{
            res.json(result.recordsets[0]);
        }
    });
});

/**
 * Add new person
 */
router.route('/add').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const birthdate = req.body.birthdate;
    const address = req.body.address;
    const gender = req.body.gender;

    const ps = new sql.PreparedStatement();
    ps.input('name', sql.NVarChar);
    ps.input('email', sql.NVarChar);
    ps.input('birthdate', sql.Date);
    ps.input('address', sql.NVarChar);
    ps.input('gender', sql.Int);
    ps.prepare('INSERT INTO USERS (name, email, birthdate, address, gender) VALUES (@name, @email, @birthdate, @address, @gender)', (err) => {
        if(err) {
            res.status(400).json('Prepare:' + err);
        }else{
            ps.execute({name, email, birthdate, address, gender}, (err, result) => {
                if(err){
                    res.status(400).json('Execute:' + err);
                }else{
                    ps.unprepare((err) =>{
                        if(err) {
                            res.status(400).json(err);
                        }else {
                            res.json(result);
                        }
                    })
                }
            });
        }
    })
});

/**
 * Get person by id
 * @param id _id of the person
 */
router.route('/:id').get((req,res) => {
    const id = req.params.id;
    const ps = new sql.PreparedStatement();
    ps.input('id', sql.Int);
    ps.prepare('SELECT * FROM USERS WHERE ID=@id', (err)=> {
        if(err) {
            res.status(400).json(`Error: ${err}`);
        }else{
            ps.execute({id}, (err, result) => {
                if(err){
                    res.status(400).json('Execute:' + err);
                }else{
                    ps.unprepare((err) =>{
                        if(err) {
                            res.status(400).json(err);
                        }else {
                            res.json(result.recordsets[0]);
                        }
                    })
                }
            });
        }
    })
});

/**
 * Delete person by id
 */
 router.route('/:id/update').put((req,res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const birthdate = req.body.birthdate;
    const address = req.body.address;
    const gender = req.body.gender;
    
    const ps = new sql.PreparedStatement();
    ps.input('id', sql.Int);
    ps.input('name', sql.NVarChar);
    ps.input('email', sql.NVarChar);
    ps.input('birthdate', sql.Date);
    ps.input('address', sql.NVarChar);
    ps.input('gender', sql.Bit);
    ps.prepare('UPDATE USERS SET NAME=@name, EMAIL=@email, BIRTHDATE=@birthdate, ADDRESS=@address, GENDER=@gender WHERE ID=@id', (err)=> {
        if(err) {
            res.status(400).json(`Error: ${err}`);
        }else{
            ps.execute({name, email, birthdate, address, gender, id}, (err, result) => {
                if(err){
                    res.status(400).json('Execute:' + err);
                }else{
                    ps.unprepare((err) =>{
                        if(err) {
                            res.status(400).json(err);
                        }else {
                            res.json(result);
                        }
                    })
                }
            });
        }
    })
});

/**
 * Delete person by id
 */
router.route('/:id/delete').put((req,res) => {
    const id = req.params.id;
    const ps = new sql.PreparedStatement();
    ps.input('id', sql.Int);
    ps.prepare('DELETE FROM USERS WHERE ID=@id', (err)=> {
        if(err) {
            res.status(400).json(`Error: ${err}`);
        }else{
            ps.execute({id}, (err, result) => {
                if(err){
                    res.status(400).json('Execute:' + err);
                }else{
                    ps.unprepare((err) =>{
                        if(err) {
                            res.status(400).json(err);
                        }else {
                            res.json(result);
                        }
                    })
                }
            });
        }
    })
});

module.exports = router;