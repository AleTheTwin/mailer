const express = require("express");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

const config = {
	email: process.env.GMAIL_USER,
	password: process.env.GMAIL_PASS,
};

let counter = 1;
try {
	// Configura el transporte de correo
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: config.email, // Reemplaza con tu dirección de Gmail
			pass: config.password, // Reemplaza con tu contraseña de Gmail
		},
	});

	app.listen(PORT, () => {
		console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
	});

	app.post("/send-email", async (req, res) => {
		// const { to, subject, html } = req.body;
		let body = req.body;
		try {
			// Configura el correo
			const mailOptions = {
				from: config.email, // Reemplaza con tu dirección de Gmail
				to: "alethetwin@icloud.com",
				subject: `Probando correos HTML - Prueba ${counter}`,
				html: body,
			};

			// Envía el correo
			await transporter.sendMail(mailOptions);

			res.status(200).json({ message: "Correo enviado exitosamente." });
		} catch (error) {
			console.error("Error al enviar el correo:", error);
			res.status(500).json({
				error: "Hubo un error al enviar el correo.",
				detail: JSON.stringify(error),
			});
		} finally {
			counter++;
		}
	});
} catch (error) {
	console.error("No se pudo crear el transportador", error);
}
