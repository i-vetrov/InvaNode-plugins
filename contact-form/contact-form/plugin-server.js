exports.execute = function (_in, data, message, stepFoo)
{
    //
    // nodemailer pack should be installed with your node.js:
    // $ npm install nodemailer
    //
    var nodemailer = require("nodemailer");
    var name = data.name;
    var text = data.text;
    var email = data.email;
    //
    // You have to set up email service proveder to send your messages. 
    // See nodemailer Github page: https://github.com/andris9/Nodemailer
    // 
    var html = '<p><b><i>Message from the site:</i></b></p>';
    html += '<p><b>Form: </b>' + name + '</p>';
    html += '<p><b>Email: </b>' + email + '</p>';
    html += '<p><b>Message: </b><br />' + text + '</p>';
    var smtpTransport = nodemailer.createTransport("SMTP",{
        //
        // Set up your email account parameters:
        //
        service: "Gmail",
        auth: {
            user: "your_email@gmail.com",
            pass: "password"
        }
    });
    var mailOptions = {
        from: name + "<" + email + ">", // sender address
        //
        // Set up your email to recive messages from your site:
        //
        to: "your_email@gmail.com",
        subject: "Hello, receiver", // Subject line
        text: text, // plaintext body
        html: html  // html formated message
    }
    smtpTransport.sendMail(mailOptions, function(error, resp){
        if(error){
            console.log('Error sending email: ' + error);
            stepFoo(message.error);          
        }else{
            stepFoo(message.done);
        }
        smtpTransport.close();
     });
}
