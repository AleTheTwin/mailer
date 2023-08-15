const express = require("express");
const nodemailer = require("nodemailer");
const { procesarHTML } = require("./convert");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
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

		const { prevent_send, to } = req.query;

		try {
			const html = procesarHTML(body);
			const mailOptions = {
				from: config.email,
				to,
				subject: `Probando correos HTML - Prueba ${counter}`,
				html: body,
			};

			fs.writeFileSync("index.html", html);

			if (!prevent_send) {
				await transporter.sendMail(mailOptions);
			}

			res.status(200).json({
				message: "Correo enviado exitosamente.",
				mailOptions,
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
