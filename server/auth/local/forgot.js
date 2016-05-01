var url = require('url');
var jwt = require('jsonwebtoken');
var postmark = require('postmark')
var clientMail = new postmark.Client('29e166e9-7166-4623-a39e-21c5c9e33ae9');
var config = require('../../config/environment');
import User from '../../api/user/user.model';

/**
 * Set token cookie directly for oAuth strategies
 */
function forgotPassword(req, res) {
    var email = req.query.email;
    console.log('req.query', req.query);
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    User.findOne({
        email: email
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (user === null) {
            res.send(200, 'User not found. Verify your email address.');
        } else {
            var token = jwt.sign({
                email: email
            }, config.secrets.session, {
                expiresIn: 60 * 60 * 1
            });

            var uri = url.parse('http://' + req.headers.host + '/reset/' + token);
            console.log('From' + process.env.MAILFROM,
                'To' + email,
                'Subject' + 'EuroProno2016 Password Reset Link',
                'HtmlBody' + 'Hello ' + user.name + ', <br/><br/> You recently requested a link to reset your EuroProno2016 password. <br/>Please set a new password by following the link below+ <br/><br/>' +
                '<a href="' + uri.href + '">' + uri.href + '</a>' +
                '<br><br>EuroProno2016');
            clientMail.send({
                'From': process.env.MAILFROM,
                'To': email,
                'Subject': 'EuroProno2016 Password Reset Link',
                'HtmlBody': 'Hello ' + user.name + ', <br/><br/> You recently requested a link to reset your EuroProno2016 password. <br/>Please set a new password by following the link below: <br/><br/>' +
                    '<a href="' + uri.href + '">' + uri.href + '</a>' +
                    '<br><br>EuroProno2016'
            }, function(err, to) {
                if (err) {
                    res.send(200, err);
                } else {
                    res.send(200, 'You\'ve got mail. Check your inbox for a password reset link, valid 1 hour.');
                }
            });
        }
    });
}

exports.forgotPassword = forgotPassword;
