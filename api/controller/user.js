const mongoos = require('mongoose');
const User = require('../model/user');
const bcryot = require('bcrypt');
const jwt = require('jsonwebtoken'); 
// controller function
exports.users_create_user = (req, res, next)=>{
    User.find({email : req.body.email}).exec().then(user =>{
        if (user.length >= 1) {
            return res.status(409).json({
                message : 'mail is already teaken!'
            })
        } else {
            bcryot.hash(req.body.password, 10, (err, hash)=>{
                if (err) {
                    return res.status(500).json({error : err});
                } else {
                    const user = new User({
                        _id : new mongoos.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    });
                    user.save().then(resulat =>{
                        console.log(user);
                        res.status(201).json({message : 'user created done!'})
                    }).catch(err =>{
                        res.status(500).json({error : err})
                    });
                };
            });            
        }
    }).catch();
};

exports.users_login_user =  (req, res, next)=>{
    User.find({email : req.body.email}).exec().then(user =>{
        if (user.length < 1) {
            return res.status(401).json({
                message : 'Auth faild'
            })            
        }
        bcryot.compare(req.body.password, user[0].password, (err , resulat) =>{
            if (user.length < 1) {
                return res.status(401).json({
                    message : 'Auth faild'
                })            
            };
            if (resulat) {
             const token  = jwt.sign({
                    email : user[0].email,
                    userId : user[0]._id
                }, process.env.JWT_KEY , {
                    expiresIn : "1h"
                })
                return res.status(200).json({
                    message : 'Auth Secess',

                    token : token
                });            
            };
        });
    }).catch(err =>{
        res.status(500).json({
            error:err
        });
    });
};

exports.users_delete_user = (req, res, next)=>{
    User.remove({_id : req.params.userId}).exec().then(
        resulat =>{
            res.status(200).json({message : 'user deleted !'});
        }
    ).catch(err =>{
        res.status(500).json({
            error:err
        })
    });
};