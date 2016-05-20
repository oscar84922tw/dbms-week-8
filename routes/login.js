/**
 * Created by chenhuawei on 5/17/16.
 */
var express = require('express');
var router = express.Router();
var Member = require('../models/Member');

router.get('/', function (req, res) {
    res.render('login', {member: null})
})
router.post('/', function (req, res, next) {
    var user = req.body.account;
    var pwd = req.body.password;
    var member =  Member.get(user)
    Member.get(user, function (err) {
        if (err || pwd != member.password) {
            res.render('failLog', {m: member})
        } else {
            req.session.member = member;
            res.redirect('/');
        }

    })

});

router.get('/logout', function () {
    req.session.member = null;
    res.redirect('/')
})

module.exports = router;
