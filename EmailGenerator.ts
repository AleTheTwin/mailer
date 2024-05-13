import fs from "fs";
import Handlebars from "handlebars";
import StyleBuilder from "./style";

export type EmailConfig = {
	header?: EmailHeader;
	body: EmailBody;
	footer: EmailFooter;
};

export type EmailHeader = {
	background: string;
	backgroundImage?: string;
	image?: string;
};

export type EmailBody = {
	backgroundImage?: string;
	content: ContentItem[];
	style?: Record<string, string>;
};

export type EmailFooter = {
	address: string;
	whatsAppLink: string;
	facebookLink: string;
	linkedInLink: string;
	websiteLink: string;
	email: string;
	style?: Record<string, string>;
};

export type EmailTitle = {
	type: "title";
	text: string;
	style?: Record<string, string>;
};

export type EmailParagraph = {
	type: "paragraph";
	text: string;
	style?: Record<string, string>;
};

export type EmailDivider = {
	type: "divider";
	height: number;
};

export type EmailImage = {
	type: "image";
	width: number;
	source: string;
	link?: string;
	style?: Record<string, string>;
};

export type EmailButton = {
	type: "button";
	link: string;
	text: string;
	style?: Record<string, string>;
};

export type ContentItem =
	| EmailTitle
	| EmailParagraph
	| EmailDivider
	| EmailImage
	| EmailButton;

const Paragraph = (attrs: EmailParagraph) => {
	const template = getCompiledTemplate("./templates/text.hbs");

	let defaultStyle = new StyleBuilder();

	defaultStyle.setPropertyValue("font-size", "1rem");
	defaultStyle.setPropertyValue("line-height", "1.5rem");
	defaultStyle.setPropertyValue("margin", "0 0 10px 0");
	defaultStyle.setPropertyValue("text-align", "center");
	defaultStyle.setPropertyValue("color", "#000000");

	if (attrs.style !== undefined) {
		let style = new StyleBuilder(attrs.style);

		for (const [styleAttr, value] of style.items) {
			defaultStyle.setPropertyValue(styleAttr, value);
		}
	}

	return template({
		...attrs,
		style: defaultStyle,
	});
};

const Title = (attrs: EmailTitle) => {
	const template = getCompiledTemplate("./templates/title.hbs");

	const defaultStyle = new StyleBuilder();

	if (attrs.style !== undefined) {
		let style = new StyleBuilder(attrs.style);
		for (const [styleAttr, value] of style.items) {
			defaultStyle.setPropertyValue(styleAttr, value);
		}
	}

	return template({
		...attrs,
		style: defaultStyle,
	});
};

const Divider = (attrs: EmailDivider) => {
	const template = getCompiledTemplate("./templates/divider.hbs");
	return template(attrs);
};

const Button = (attrs: EmailButton) => {
	const template = getCompiledTemplate("./templates/button.hbs");

	const defaultStyles = {
		"background-color": "#065e8e",
		"border-radius": "40px",
		"padding-bottom": "15px",
		"padding-top": "15px",
		"padding-right": "20px",
		"padding-left": "20px",
		"text-align": "center",
		"font-size": "large",
		color: "#FFFFFF",
	};

	let style = new StyleBuilder({
		...defaultStyles,
		...(attrs.style || {}),
	});
	return template({
		...attrs,
		style: style,
	});
};

const Image = (attrs: EmailImage) => {
	const template = getCompiledTemplate("./templates/image.hbs");
	const width = (attrs.width / 100) * 600;
	const sidesWidth = Math.floor((600 - width) / 2);

	const style = new StyleBuilder(attrs.style);

	return template({
		...attrs,
		width,
		sidesWidth,
		style,
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

	let defaultStyle = new StyleBuilder();
	defaultStyle.setPropertyValue("margin", "0");
	defaultStyle.setPropertyValue("backgroundColor", "#FFFFFF");

	if (attrs.backgroundImage) {
		defaultStyle.setPropertyValue(
			"backgroundImage",
			`url(${attrs.backgroundImage})`
		);
		defaultStyle.setPropertyValue("backgroundRepeat", "no-repeat");
		defaultStyle.setPropertyValue("backgroundPosition", "left top");
		defaultStyle.setPropertyValue("backgroundSize", "cover");
	}

	if (attrs.style !== undefined) {
		const style = new StyleBuilder(attrs.style);
		for (const [styleAttr, value] of style.items) {
			defaultStyle.setPropertyValue(styleAttr, value);
		}
	}

	return template({
		style: String(defaultStyle),
		content: content,
	});
};

const Footer = (attrs: EmailFooter) => {
	const template = getCompiledTemplate("./templates/footer.hbs");

	const defaultStyles = {
		"background-color": "#065e8e",
		color: "#FFFFFF",
		margin: " 0",
		"padding-left": " 15px",
		"padding-right": " 15px",
		"padding-top": " 20px",
		"padding-bottom": " 20px",
	};

	const style = new StyleBuilder({
		...defaultStyles,
		...(attrs.style || {}),
	});
	return template({
		...attrs,
		style: style,
	});
};
export type Envelope = {
	header?: string;
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
		const body = Body(emailConfig.body);
		const footer = Footer(emailConfig.footer);

		const email = Envelope({
			header: emailConfig.header ? Header(emailConfig.header) : undefined,
			body,
			footer,
		});
		return email;
	},
};

export default EmailGenerator;
