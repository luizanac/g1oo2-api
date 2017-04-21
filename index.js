const mysql = require('mysql')
const express = require('express')
const app = express()
const parser = require('body-parser')
const validator = require('express-validator')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imgs')
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1)
        cb(null, Date.now() + '.' + ext)
    }
})

let upload = multer({storage: storage})

app.use(validator())
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'g1oo2'
});

app.listen(3000, ()=>{
    console.log('TA NO AR BARALHO, PORTA 3000')
})

/* START CLASS */
app.post('/v1/class', (req, res) => {
    req.checkBody('name', 'O campo nome não pode ser vazio').notEmpty()

    req.getValidationResult().then(function(result) {
        let errors = result.useFirstErrorOnly().mapped()

        if (!result.isEmpty()) {
            res.status(400).json(errors)
            return

        }else{
            clas = {
                name: req.body.name,
            }

            connection.query(`INSERT INTO classes SET ?`, clas, (err, result) => {

                if(err){
                    console.log(err)
                    res.status(500).json({
                        response:{
                            msg: 'Houve um problema no servidor, entre em contato'
                        } 
                    })
                }else{
                    connection.query('SELECT * FROM classes', (err, result) => {
                        res.status(200).json(JSON.parse(JSON.stringify(result)))
                    })
                }
            })
        }
    })
})

app.put('/v1/class', (req, res) => {
    req.checkBody('id', 'Id não pode ser nulo').notEmpty()
    req.checkBody('name', 'O campo nome não pode ser vazio').notEmpty()

    req.getValidationResult().then(function(result) {
        let errors = result.useFirstErrorOnly().mapped()

        if (!result.isEmpty()) {
            res.status(400).json(errors)
            return

        }else{

            connection.query(`UPDATE classes SET name = ? WHERE id_class = ?`, [req.body.name, req.body.id], (err, result) => {

                if(err){ 
                    res.status(500).json({
                        response:{
                            msg: 'Houve um problema no servidor, entre em contato'
                        } 
                    })
                }else{
                    res.status(201).json({
                        response:{
                            msg: 'Classe alterada com sucesso!'
                        } 
                    })
                }
            })
        }
    })
})

app.delete('/v1/class/:id_class', (req, res) => {


    if (!req.params.id_class) {
        res.status(400)
        return

    }else{

        connection.query(`DELETE FROM classes WHERE id_class = ?`, req.params.id_class, (err, result) => {

            if(err){ 
                res.status(500).json({
                    response:{
                        msg: 'Houve um problema no servidor, entre em contato'
                    } 
                })
            }else{
                res.status(201).json({
                    response:{
                        msg: 'Classe deletada com sucesso!'
                    } 
                })
            }
        })
    }
})


app.get('/v1/class', (req, res) => {

    connection.query('SELECT * FROM classes', (err, result) => {
        res.status(200).json(JSON.parse(JSON.stringify(result)))
    })
    
})
/* END CLASS */

/* START PEOPLE */
app.post('/v1/people',(req, res) => {
    req.checkBody('name', 'O campo nome não pode ser vazio').notEmpty()
    req.checkBody('stars', 'O campo estrelas não pode ser vazio').notEmpty()

    req.getValidationResult().then(function(result) {
        let errors = result.useFirstErrorOnly().mapped()

        if(!result.isEmpty()){

            res.status(400).json(errors)
            return
        }else{

            person = {
                name: req.body.name,
                stars: req.body.stars,
                id_class: req.body.id_class
            }

            connection.query(`INSERT INTO people SET ?`, person, (err, result) => {
              
                if(err){    

                    res.status(500).json({
                        response:{
                            msg: 'Houve um problema no servidor, entre em contato'
                        } 
                    })
                }else{

                    res.status(201).json({
                        response:{
                            msg: 'Classe cadastrada com sucesso!'
                        } 
                    })
                }
            })
        }
    })
})

app.put('/v1/people', (req, res) => {
    req.checkBody('id', 'Id não pode ser nulo').notEmpty()
    req.checkBody('name', 'O campo nome não pode ser vazio').notEmpty()
    req.checkBody('stars', 'O campo nome não pode ser vazio').notEmpty()

    console.log(req.body)

    req.getValidationResult().then(function(result) {
        let errors = result.useFirstErrorOnly().mapped()

        if (!result.isEmpty()) {
            res.status(400).json(errors)
            return

        }else{

            connection.query(`UPDATE people SET name = ?, stars = ? WHERE id_person = ?`, [req.body.name, req.body.stars,req.body.id], (err, result) => {

                if(err){ 
                    res.status(500).json({
                        response:{
                            msg: 'Houve um problema no servidor, entre em contato'
                        } 
                    })
                }else{
                    res.status(201).json({
                        response:{
                            msg: 'Aluno alterado com sucesso!'
                        } 
                    })
                }
            })
        }
    })
})

app.get('/v1/people/:id_class', (req, res) => {

    connection.query('SELECT * FROM people p  WHERE p.id_class = ?', req.params.id_class,(err, result) => {
        res.status(200).json(JSON.parse(JSON.stringify(result)))
    })
})

app.delete('/v1/people/:id_person', (req, res) => {

    if(!req.params.id_person) {
        res.status(400);
        return

    }else{
        connection.query('DELETE FROM people WHERE id_person = ?',req.params.id_person, (err, result) => {

            if(err){ 
                res.status(500).json({
                    response:{
                        msg: 'Houve um problema no servidor, entre em contato'
                    } 
                })
            }else{
                res.status(200).json({
                    response:{
                        msg: 'Aluno deletado com sucesso!'
                    } 
                })
            }
        })
    }
})
/* END PEOPLE */
