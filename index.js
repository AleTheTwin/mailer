const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const config = {
	email: process.env.EMAIL_USER,
	password: process.env.EMAIL_PASS,
	host: process.env.EMAIL_SERVER,
	port: Number(process.env.EMAIL_PORT),
};

let counter = 1;

const transporterConfig = {
	host: config.host,
	port: config.port,
	secure: false,
	auth: {
		user: config.email,
		pass: config.password,
	},
};
try {
	const transporter = nodemailer.createTransport(transporterConfig);

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
