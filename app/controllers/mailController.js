const transporter = require("../models/sendMailModel");

const sendMailUser = async (req, res) => {
const {email} = req.body;
console.log(email);

  try {
    const user = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Compra realizada User",
      text: "Hola, esta fue tu compra",
    });
    console.log({ user });
    const admin = await transporter.sendMail({
      from: process.env.EMAIL,
      to: "l.gonzalez1@utp.edu.co",
      subject: "Compra realizada Admin",
      text: "Hola, esta fue tu compra realizada por luis",
    });
    console.log({ admin });
    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};

module.exports = sendMailUser;
