/**
 * Created by chenhuawei on 5/17/16.
 */
var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var async = require('async');

router.get('/', function(req, res) {
    res.render('login', {
        member: null
    })
})
router.post('/', function(req, res, next) {
    var user = req.body.account;
    var pwd = req.body.password;
    var x = null;
    var member = Member.getAccount(user, function(err, member) {
        if (err) {
            // res.status(err.code);
            // res.json(err);
        } else {
            x = json(member);
        }
    });

    Member.getAccount(user.toString(), function(err,member){
        if (err || pwd != member.password) {
            res.render('failLog', {
                m: member,
                me: user + pwd + " " + member+ "   "+x
            });
            res.json(member);
        } else {
            req.session.member = member;
            res.redirect('/');
        }

    })

});

router.get('/logout', function() {
    req.session.member = null;
    res.redirect('/')
})

module.exports = router;
