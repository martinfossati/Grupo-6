const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const db = require('../database/models');
const Op = db.Sequelize.Op;


const controladorUsers = 
{
    login: (req, res) => {
        res.render('users/login')
    },
	processLogin: (req, res) => {
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {
            if(usuario) {
                let comparePassword = bcryptjs.compareSync(req.body.password, usuario.password);
                if(comparePassword) {
                    delete usuario.password;
                    req.session.userLogged = usuario;
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

        db.Usuarios.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fecha_nacimiento: req.body.fechaNacimiento,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        });

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