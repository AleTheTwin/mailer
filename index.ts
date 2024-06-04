import dotenv from "dotenv";
import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import EmailGenerator from "./EmailGenerator";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

// app.use(cors());

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

	app.post("/html", async (req: Request, res: Response) => {
		const { destinatario, from, subject } = req.query;

		const html = req.body;

		try {
			const mailOptions = {
				from: from || config.email,
				to: destinatario,
				subject,
				html: html,
			};
			console.log({
				from: from || config.email,
				to: destinatario,
				subject,
				html: (html as string).slice(0, 20),
			});
			await transporter.sendMail(mailOptions as any);
		} catch (error) {
			console.error(error);
			res.status(500).send(`Error: ${error.message}`);
			return;
		}

		res.send("Correos enviados");
	});

	app.post(
		"/email-generator/generate-html",
		async (req: Request, res: Response) => {
			const emailConfig = req.body;
			const html = EmailGenerator.generateEmail(emailConfig);

			res.send(html);
		}
	);

	app.post("/send-email-test", async (req: Request, res: Response) => {
		const { from, to, subject, emailConfig } = req.body;

		const errores: any[] = [];

		for (const destinatario of to) {
			const html = EmailGenerator.generateEmail(emailConfig);

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
