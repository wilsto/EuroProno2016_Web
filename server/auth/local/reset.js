var url = require('url');
var postmark = require('postmark');
var jwt = require('jsonwebtoken');
var clientMail = new postmark.Client('29e166e9-7166-4623-a39e-21c5c9e33ae9');
var config = require('../../config/environment');
import User from '../../api/user/user.model';

function resetPassword(req, res) {
    var token = req.query.token;
    var password = req.query.password;
    var confirm = req.query.confirm;

    var decoded = jwt.verify(token, config.secrets.session);
    var email = decoded.email;
    var iatdate = decoded.iat;
    var expdate = decoded.exp;
    var now = Date.now() / 1000;
    var valid = now - expdate < 0;

    if (password !== confirm) {
        res.end('Your passwords do not match');
    } else {
        // update db here
        User.findOne({
            email: email
        }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
            if (user === null) {
                res.send(200, 'User not found. Please retry or contact admin.');
            } else {
                user.password = password;
                user.save(function(err) {
                    clientMail.send({
                        'From': process.env.MAILFROM,
                        'To': email,
                        'Subject': 'EuroProno2016 Changed Password Confirmation',
                        'HtmlBody': 'Hello ' + user.name + ', <br/><br/> The password for your EuroProno2016 account was recently changed.<br/><br/> If you made this change, then we\'re all set!<br/><br/> If not, please contact us at contact@europrono2016.com ' +
                            '<br><br>EuroProno2016'
                    }, function(err, to) {
                        if (err) {
                            res.send(200, err);
                        } else {
                            res.send(200, 'Your password has been updated, please login.');
                        }
                    });
                });
            }
        });
    }
}

exports.resetPassword = resetPassword;
