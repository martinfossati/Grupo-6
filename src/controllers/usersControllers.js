const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');

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
                    res.redirect('/infoUser')
                } else {
                    res.render('users/login', {
                        errors: {
                            email: {
                                msg: 'El email o la contraseña no coinciden'
                            }
                        },
                        oldData: req.body
                    });
                }
            }
            res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Revisa que la información sea correcta'
                    }
                },
                oldData: req.body
            });
        });
	},
    register: (req, res) => {
        res.render('users/register')
    },
    processRegister: (req, res) => {
        let resultValidation = validationResult(req);
        
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {
            if(usuario){
                res.render('users/register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                })
            } else {
                if(resultValidation.errors.length == 0){
                    db.Usuarios.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        fecha_nacimiento: req.body.fechaNacimiento,
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        avatar: req.file.filename
                    }).then(() => {
                        res.redirect('/login');
                    });
                } else {
                    res.render('users/register', {
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    });
                }
            }
        })
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