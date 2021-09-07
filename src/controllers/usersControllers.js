const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const User = require('../models/User');


const controladorUsers = 
{
    login: (req, res) => {
        res.render('users/login')
    },
	processLogin: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if(userToLogin) {
            let comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(comparePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.rememberUser) {
                    res.cookie('userEmail', req.body.email)
                }
                return res.redirect('/infoUser')
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Credenciales inválidas'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'Revisa que la información sea correcta'
                }
            }
        });
	},
    register: (req, res) => {
        res.render('users/register')
    },
    registerUser: (req, res) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        };

        let userInDB = User.findByField('email', req.body.email);

        if(userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.render('users/login');
    },
    infoUser: (req, res) => {
        res.render('users/infoUser', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = controladorUsers;