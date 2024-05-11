import fs from "fs";
import Handlebars from "handlebars";

type EmailConfig = {
	header: EmailHeader;
	body: EmailBody;
	footer: EmailFooter;
};

type EmailHeader = {
	background: string;
	backgroundImage?: string;
	image: string;
};

type EmailBody = {
	background: string;
	backgroundImage?: string;
	content: ContentItem[];
};

type EmailFooter = {
	address: string;
	background: string;
	whatsAppLink: string;
	facebookLink: string;
	linkedInLink: string;
	websiteLink: string;
	email: string;
};

type EmailTitle = {
	type: "title";
	text: string;
	color: string;
};

type EmailParagraph = {
	type: "paragraph";
	text: string;
	color: string;
};

type EmailDivider = {
	type: "divider";
	height: number;
};

type EmailImage = {
	type: "image";
	width: number;
	source: string;
	link?: string;
};

type EmailButton = {
	type: "button";
	link: string;
	color: string;
	backgroundColor: string;
	text: string;
};

type ContentItem =
	| EmailTitle
	| EmailParagraph
	| EmailDivider
	| EmailImage
	| EmailButton;

const Paragraph = (attrs: EmailParagraph) => {
	const template = getCompiledTemplate("./templates/text.hbs");
	return template(attrs);
};

const Title = (attrs: EmailTitle) => {
	const template = getCompiledTemplate("./templates/title.hbs");
	return template(attrs);
};

const Divider = (attrs: EmailDivider) => {
	const template = getCompiledTemplate("./templates/divider.hbs");
	return template(attrs);
};

const Button = (attrs: EmailButton) => {
	const template = getCompiledTemplate("./templates/button.hbs");
	return template(attrs);
};

const Image = (attrs: EmailImage) => {
	const template = getCompiledTemplate("./templates/image.hbs");
	const width = (attrs.width / 100) * 600;
	const sidesWidth = Math.floor((600 - width) / 2);

	return template({
		...attrs,
		width,
		sidesWidth,
	});
};

const Header = (attrs: EmailHeader) => {
	const template = getCompiledTemplate("./templates/header.hbs");
	return template(attrs);
};

const Body = (attrs: EmailBody) => {
	const template = getCompiledTemplate("./templates/body.hbs");

	let content = "";
	for (const item of attrs.content) {
		switch (item.type) {
			case "divider":
				content += Divider(item);
				break;
			case "image":
				content += Image(item);
				break;
			case "paragraph":
				content += Paragraph(item);
				break;
			case "title":
				content += Title(item);
				break;
			case "button":
				content += Button(item);
				break;
			default:
				continue;
		}
	}
	return template({
		background: attrs.background,
		backgroundImage: attrs.backgroundImage,
		content: content,
	});
};

const Footer = (attrs: EmailFooter) => {
	const template = getCompiledTemplate("./templates/footer.hbs");
	return template(attrs);
};
type Envelope = {
	header: string;
	body: string;
	footer: string;
};
const Envelope = (attrs: Envelope) => {
	const template = getCompiledTemplate("./templates/envelope.hbs");
	return template(attrs);
};

const getCompiledTemplate = (path: string) => {
	const template = fs.readFileSync(path, {
		encoding: "utf-8",
	});
	const compiledTemplate = Handlebars.compile(template, {
		noEscape: true,
	});

	return compiledTemplate;
};

const EmailGenerator = {
	generateEmail(emailConfig: EmailConfig): string {
		const header = Header(emailConfig.header);
		const body = Body(emailConfig.body);
		const footer = Footer(emailConfig.footer);

		const email = Envelope({
			header,
			body,
			footer,
		});
		return email;
	},
};

export default EmailGenerator;

const exampleConfig: EmailConfig = {
	header: {
		background: "#20637b",
		backgroundImage:
			"https://mpvuwb.stripocdn.email/content/guids/CABINET_236f9896be25e5243d42810f8b6f2b9d14dd90d336f571f8c84c2c213b89686a/images/fondo_correo_2_4zS.png",
		image: "https://mpvuwb.stripocdn.email/content/guids/CABINET_236f9896be25e5243d42810f8b6f2b9d14dd90d336f571f8c84c2c213b89686a/images/1233444.png",
	},
	body: {
		background: "#065e8e",
		content: [
			{
				type: "title",
				color: "#FFFFFF",
				text: "Esto es u título de prueba",
			},
			{
				type: "image",
				source: "https://mpvuwb.stripocdn.email/content/guids/CABINET_236f9896be25e5243d42810f8b6f2b9d14dd90d336f571f8c84c2c213b89686a/images/1233444.png",
				width: 25,
			},
			{
				type: "divider",
				height: 10,
			},
			{
				type: "paragraph",
				color: "#FFFFFF",
				text: "Mensaje de prueba en un párrafo medianamente largo para probar el comportamiento.",
			},
		],
	},
	footer: {
		address:
			"Goldsmith 40, Polanco, Polanco III Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX",
		background: "#000000",
		email: "alejandro.sanchez@kuantik.mx",
		facebookLink: "https://www.facebook.com/kuantik.mx",
		whatsAppLink: "tel:+5215543501504",
		linkedInLink:
			"https://www.linkedin.com/company/kuantik-dataintelligence",
		websiteLink: "https://www.kua.mx/",
	},
};
