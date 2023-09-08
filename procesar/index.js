const componentBuilder = require("./componentes.js");

/**
 * @typedef {Object} EmailTemplateConfig
 * @property {Array} componentes
 * @property {string} accentColor
 */

/**
 * Description
 * @author alethetwin
 * @param {EmailTemplateConfig} data
 * @returns {any}
 */
const crearHTML = (data) => {
	const componentes = data.componentes.map((componente) => {
		const componentFunction = componentBuilder[componente.key];

		const clases = componente.stylesValue.map((styleObj) => ({
			class: styleObj.class,
			style: styleObj.value,
		}));

		if (!(componentFunction instanceof Function)) {
			return;
		}
		return componentFunction(
			componente.content,
			clases,
			componente,
			data.accentColor
		);
	});
	const contenido = componentes.join("");

	const html = componentBuilder.plantilla(data.accentColor, contenido);
	return html;
};

module.exports = { crearHTML };
