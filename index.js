const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { crearHTML } = require("./procesar");
require("dotenv").config();
const fs = require("fs/promises");

const app = express();
const PORT = process.env.PORT || 2050;

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
		let { to, html, subject, from } = req.body;
		let errores = [];

		for (let i = 0; i < to.length; i++) {
			const destinatario = to[i];
			try {
				const mailOptions = {
					from,
					to: destinatario,
					subject,
					html: html,
				};

				await transporter.sendMail(mailOptions);
			} catch (error) {
				errores.push({
					destinatario,
					error,
				});
			}
		}

		counter++;

		if (errores.length === 0) {
			res.status(200).json({
				message: "Correos enviados exitosamente.",
			});
			return;
		}
		res.status(200).json({
			errores: errores,
			message: "Correos enviados con errores.",
		});
	});
} catch (error) {
	console.error("No se pudo crear el transportador", error);
}
