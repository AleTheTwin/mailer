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
	const imgWidth = component.width;
	const sidesWidth = Math.floor((100 - imgWidth) / 2);
	return `
		<tr>
			<td>
				<table style="width: 100%">
					<tbody>
						<tr>
							<td style="width: ${sidesWidth}%"></td>
							<td style="width: ${imgWidth}%">
								<a ${component.link ? 'href="' + component.link + '"' : ""}>
									<img
										style="width: 100%; max-width: 100%"
										src="${content}"
										alt="Img"
									/>
								</a>
							</td>
							<td style="width: ${sidesWidth}%"></td>
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
										padding: 10px; text-align: center;color: white;" >${content}</div>
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
module.exports = { title, texto, imagen, subTitle, button, table, spacer };
