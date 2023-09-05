const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { procesarHTML } = require("./procesar");
require("dotenv").config();
const fs = require("fs/promises");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const config = {
	email: process.env.GMAIL_USER,
	password: process.env.GMAIL_PASS,
};

let counter = 1;
try {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: config.email,
			pass: config.password,
		},
	});

	app.listen(PORT, () => {
		console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
	});

	app.post("/send-email-test", async (req, res) => {
		let body = req.body;

		const { prevent_send, to, procesar } = req.query;

		try {
			let html = body;
			if (procesar) {
				html = procesarHTML(body.data);
			}
			const mailOptions = {
				from: config.email,
				to,
				subject: `(${Date.now()}) | Probando correos HTML - Prueba ${counter}`,
				text: "Correo de prueba de plantilla.",
				html: html,
			};

			await fs.writeFile("index.html", html);
			if (!prevent_send) {
				await transporter.sendMail(mailOptions);
			}

			res.status(200).json({
				message: "Correo enviado exitosamente.",
			});
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
