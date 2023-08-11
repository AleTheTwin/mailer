const styles = {
	"bg-verde": "background-color: #50c495;",
	grid: "display: grid;",
	"h-full": "height: 100%;",
	"grid-rows-6": "grid-template-rows: repeat(6, minmax(0, 1fr));",
	"grid-cols-5": "grid-template-columns: repeat(5, minmax(0, 1fr));",
	"justify-center": "justify-content: center;",
	"items-center": "align-items: center;",
	"bg-indigo-900": "background-color: #362f78;",
	"text-slate-200": "color: #e2e8f0;",
	"bg-orange-400": "background-color: rgb(255 138 76);",
	flex: "display: flex;",
	"flex-col": "flex-direction: column;",
	"items-center": "align-items: center;",
	"bg-white/5": "background-color: rgb(255 255 255 / 0.05);",
	"min-w-[50%]": "min-width: 50%;",
	"col-span-3": "grid-column: span 3 / span 3;",
	"h-20": "height: 5rem /* 80px */;",
	"p-2": "padding: 0.5rem /* 8px */;",
	"py-3": "padding-top: 0.75rem /* 12px */;padding-bottom: 0.75rem /* 12px */;",
	"max-h-[60%]": "max-height: 60%;",
	"px-10":
		"padding-left: 2.5rem /* 40px */;padding-right: 2.5rem /* 40px */;",
	"max-h-[40%]": "max-height: 40%;",
	"px-24": "padding-left: 6rem /* 96px */;padding-right: 6rem /* 96px */;",
	"my-3": "margin-top: 0.75rem /* 12px */;margin-bottom: 0.75rem /* 12px */;",
	"row-span-4": "grid-row: span 4 / span 4;",
	"text-white":
		"--tw-text-opacity: 1;color: rgb(255 255 255 / var(--tw-text-opacity));",
	"bg-slate-100": "background-color: rgb(241, 245, 249);",
	"grid-cols-5": "grid-template-columns: repeat(5, minmax(0, 1fr));",
	"overflow-hidden": "overflow: hidden;",
	"bg-white": "background-color: rgb(255 255 255);",
	"row-span-4": "grid-row: span 4 / span 4;",
	"grid-rows-6": "grid-template-rows: repeat(6, minmax(0, 1fr));",
	"gap-2": "gap: 0.5rem /* 8px */;",
	"text-black":
		"--tw-text-opacity: 1;color: rgb(0 0 0 / var(--tw-text-opacity));",
	"col-span-3": "grid-column: span 3 / span 3;",
	"px-3": "padding-left: 0.75rem /* 12px */;padding-right: 0.75rem /* 12px */;",
	"py-3": "padding-top: 0.75rem /* 12px */;padding-bottom: 0.75rem /* 12px */;",
	"text-3xl":
		"font-size: 1.875rem /* 30px */;line-height: 2.25rem /* 36px */;",
	"text-center": "text-align: center;",
	"font-medium": "font-weight: 500;",
	truncate: "overflow: hidden;text-overflow: ellipsis;white-space: nowrap;",
	"w-full": "width: 100%;",
	"row-span-2": "grid-row: span 2 / span 2;",
	"p-3": "padding: 0.75rem /* 12px */;",
	"text-slate-600": "--tw-text-opacity: 1;color: rgb(71, 85, 105);",
	"text-lg":
		"font-size: 1.125rem /* 18px */;line-height: 1.75rem /* 28px */;",
	"overflow-y-auto": "overflow-y: auto;",
	"overflow-x-hidden": "overflow-x: hidden;",
	"h-[140px]": "height: 140px;",
	"overflow-auto": "overflow: auto;",
	"p-4": "padding: 1rem /* 16px */;",
	"mx-auto": "margin-left: auto;margin-right: auto;",
	"gap-4": "gap: 1rem /* 16px */;",
	"rounded-full": "border-radius: 9999px;",
	"h-10": "height: 2.5rem /* 40px */;",
	"w-10": "width: 2.5rem /* 40px */;",
	"bg-orange-400": "background-color: rgb(255 138 76);",
	"max-h-full": "max-height: 100%;",
	"py-2": "padding-top: 0.5rem /* 8px */;padding-bottom: 0.5rem /* 8px */;",
	"bg-gray-900": "background-color: rgb(17 24 39);",
	"col-span-3": "grid-column: span 3 / span 3;",
	"grid-cols-4": "grid-template-columns: repeat(4, minmax(0, 1fr));",
	"gap-2": "gap: 0.5rem /* 8px */;",
	"py-2": "padding-top: 0.5rem /* 8px */;padding-bottom: 0.5rem /* 8px */;",
	"px-4": "padding-left: 1rem /* 16px */;padding-right: 1rem /* 16px */;",
	"min-w-[50%]": "min-width: 50%;",
	underline: "text-decoration-line: underline;",
	"h-12": "height: 3rem/* 48px */;",
};

// Función que reemplaza el contenido de las clases según ciertas condiciones
function reemplazarContenidoClases(html) {
	const nuevoHTML = html.replace(/class="([^"]*)"/g, (match, classStr) => {
		let clases = classStr.split(" ");
		let estilos = [];
		for (let i = 0; i < clases.length; i++) {
			const clase = clases[i];
			console.log("🚀 ~ ", clase);
			if (styles[clase] !== undefined) {
				estilos.push(styles[clase]);
			}
		}
		return `style="${estilos.join(" ")}"`;
	});
	return nuevoHTML;
}

// Función principal que recibe el texto HTML, aplica el reemplazo y devuelve el resultado
function procesarHTML(inputHTML) {
	const nuevoHTML = reemplazarContenidoClases(inputHTML);

	return nuevoHTML;
}

// Ejemplo de texto HTML de entrada
module.exports = {
	procesarHTML,
};
