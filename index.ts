import cors from "cors";
import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import EmailGenerator from "./EmailGenerator";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

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

	app.post("/send-email-test", async (req: Request, res: Response) => {
		const { from, to, subject, emailConfig } = req.body;

		const errores: any[] = [];

		for (const destinatario of to) {
			const html = EmailGenerator.generateEmail(emailConfig);
			// fs.writeFile("result.html", html, (err) => {
			// 	if (err) {
			// 		console.log("No fue posible escribir el archivo");
			// 	}
			// });
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
				console.error(error);
			}
		}
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
	console.error(error);
}
