const title = (content = "", clases) => {
	return createTextElement("h1", content, clases);
};

const subTitle = (content = "", clases) => {
	return createTextElement("h2", content, clases);
};

const texto = (content = "", clases) => {
	return createTextElement("p", content, clases);
};

const imagen = (content = "", clases, component) => {
	const imgWidth = (component.width / 100) * 600;
	const sidesWidth = Math.floor((600 - imgWidth) / 2);
	return `
		<tr>
			<td>
				<table style="width: 100%; max-width: 600px;">
					<tbody>
						<tr>
							<td style="width: ${sidesWidth}px"></td>
							<td style="width: ${imgWidth}px">
								<a ${component.link ? 'href="' + component.link + '"' : ""}>
									<img
										width="${imgWidth}"
										src="${content}"
										alt="Img"
									/>
								</a>
							</td>
							<td style="width: ${sidesWidth}px"></td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>`;
};

const button = (content = "", clases, component, accentColor) => {
	const buttonWidth = 34;
	const sidesWidth = 33;
	return `
		<tr><td style="height: 5px"></td></tr>
		<tr>
			<td>
				<table style="width: 100%">
					<tbody>
						<tr>
							<td style="width: ${sidesWidth}%"></td>
							<td style="width: ${buttonWidth}%">
								<a href="${component.link}" style="text-decoration: none; color: white;">
									<div style="background: ${accentColor}; 
										border-radius: 20px;
										padding: 20px; text-align: center;color: white;" >${content}</div>
								</a>
							</td>
							<td style="width: ${sidesWidth}%"></td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr><td style="height: 5px"></td></tr>`;
};

const table = (content = []) => {
	const tableWidth = 80;
	const sidesWidth = 10;
	return `
		<tr>
			<td>
				<table style="width: 100%">
					<tbody>
						<tr>
							<td style="width: ${sidesWidth}%"></td>
							<td style="width: ${tableWidth}%">
								<table style="width: 100%;">
									<tbody>
										${content.map(getRow).join("")}
									</tbody>
								</table>
							</td>
							<td style="width: ${sidesWidth}%"></td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>`;
};

const spacer = (content = "", clases, component) => {
	return `<tr><td style="height: ${component.height}px"></td></tr>`;
};

const plantilla = (accentColor, contenido) => {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html
		xmlns="http://www.w3.org/1999/xhtml"
		xmlns:o="urn:schemas-microsoft-com:office:office"
	>
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="x-apple-disable-message-reformatting" />
			<style type="text/css">
				body {
					margin: 0;
					background-color: rgb(241, 245, 249);
				}
				table {
					border-spacing: 0;
				}
				td {
					padding: 0;
				}
				img {
					border: 0;
				}
				.wrapper {
					width: 100%;
					table-layout: fixed;
					background-color: rgb(249, 250, 251);
					padding-bottom: 60px;
				}
				.main {
					background-color: #ffffff;
					margin: 0;
					width: 100%;
					max-width: 600px;
					border-spacing: 0;
				}
				.three-column {
					text-align: center;
					font-size: 0;
				}
				.column {
					width: 33%;
					display: inline-block;
					vertical-align: top;
				}
				h1 {
					text-align: center;
				}
				.mensaje {
					padding-left: 2.5rem;
					padding-right: 2.5rem;
				}
			</style>
		</head>
		<body
			style="
				width: 100%;
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
				font-family: 'Open Sans', sans-serif;
				padding: 0;
				margin: 0;
			"
		>
			<center style="" class="wrapper">
				<table style="" class="main" width="100%">
					<tr>
						<td
							style="
								padding-top: 1rem /* 16px */;
								padding-bottom: 1rem /* 16px */;
								background-color: ${accentColor};
							"
							class="py-[1rem]"
						>
							<table style="width: 100%; max-width: 600px;">
								<tbody>
									<tr>
										<td style="width: 33%; max-width: 200px;"></td>
										<td style="width: 34%; max-width: 200px;">
											<a>
												<img
													style="
														width: 100%;
														max-width: 200px;
													"
													width="200"
													src="https://mpvuwb.stripocdn.email/content/guids/CABINET_7a0283caf08a47ab6827e9f04ca34e11f07f4080796e6a1d4959aa78daea471a/images/dummy.png"
													alt="Logo Kuantik"
												/>
											</a>
										</td>
										<td style="width: 33%; max-width: 200px;"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr><td style="height: 10px"></td></tr>
					${contenido}
					<tr><td style="height: 10px"></td></tr>
					<tr >
						<td
							style="
								background-color: rgb(17, 24, 39);
								text-align: center;
							"
						>
							<table align="center" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding: 14px 0px">
										<a
											target="_blank"
											href="https://www.facebook.com/kuantik.mx"
											><img
												src="https://mpvuwb.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png"
												alt="Facebook"
												title="Facebook"
												width="32"
												height="32"
										/></a>
									</td>
									<td style="padding: 14px 0px">
										<a
											target="_blank"
											href="https://www.linkedin.com/company/kuantik-dataintelligence"
											><img
												src="https://mpvuwb.stripocdn.email/content/assets/img/social-icons/logo-white/linkedin-logo-white.png"
												alt="LinkedIn"
												title="LinkedIn"
												width="32"
												height="32"
										/></a>
									</td>
									<td style="padding: 14px 0px">
										<a
											target="_blank"
											href="https://www.instagram.com/kuantik.mx/"
											><img
												src="https://mpvuwb.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png"
												alt="Instagram"
												title="Instagram"
												width="32"
												height="32"
										/></a>
									</td>
									<td style="padding: 14px 0px">
										<a target="_blank" href="tel:+5215543501504"
											><img
												src="https://mpvuwb.stripocdn.email/content/assets/img/messenger-icons/logo-white/whatsapp-logo-white.png"
												alt="Whatsapp"
												title="Whatsapp"
												width="32"
												height="32"
										/></a>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td
							style="
								text-align: center;
								color: rgb(226, 232, 240);
								background-color: rgb(17, 24, 39);
							"
						>
							<p>
								Río Mixcoac 216, Acacias, Benito Juárez, Ciudad de
								México
							</p>
							<p>
								<a
									style="
										color: white;
										text-decoration-line: underline;
									"
									style="
										color: white;
										text-decoration-line: underline;
									"
									class="text-white underline"
									href="mailto:soporte@kuantik.mx"
									>soporte@kuantik.mx</a
								>
							</p>
						</td>
					</tr>
				</table>
			</center>
		</body>
	</html>
	`;
};

const createTextElement = (element, content, clases) => {
	return `
		<tr>
			<td>
				<${element}
				class="mensaje"
					style="${convertClasesToStyle(clases)}"
				>
					${content}
				</${element}>
			</td>
		</tr>`;
};

const getRow = (row) => {
	const celdas = row.map(getCell);
	return `<tr>${celdas.join("")}</tr>`;
};

const getCell = (cellInfo) => {
	const styles = cellInfo.stylesValue.map((styleObj) => ({
		class: styleObj.class,
		style: styleObj.value,
	}));

	let estilos = convertClasesToStyle(styles);
	if (estilos.includes("border")) {
		estilos += "border-style: solid; padding: 4px;";
	}

	return `<td style="${estilos}">${cellInfo.content}</td>`;
};

const ignoreClases = [];
const convertClasesToStyle = (clases = []) => {
	let styles = [];
	for (let i = 0; i < clases.length; i++) {
		const clase = clases[i];
		if (ignoreClases.includes(clase.class)) {
			// do something
		} else {
			styles.push(clase.style);
		}
	}
	return styles.join("");
};
module.exports = {
	title,
	texto,
	imagen,
	subTitle,
	button,
	table,
	spacer,
	plantilla,
};
