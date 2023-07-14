const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"Felipegb24510@gmail.com",
        pass:"vuzdcdgsjxesxrhz"
}
})
module.exports = transporter