export default class StyleBuilder {
	private attrs: Record<string, string> = {};
	get length() {
		return Object.keys(this.attrs).length;
	}

	constructor(attrs?: Record<string, string>) {
		if (attrs !== undefined) {
			for (const [attr, value] of Object.entries(attrs)) {
				this.setPropertyValue(attr, value);
			}
		}
	}

	get items() {
		return Object.entries(this.attrs);
	}

	setPropertyValue(property: string, value: string) {
		this.attrs[property] = value;
	}

	removeProperty(property: string) {
		delete this.attrs[property];
	}

	toString() {
		return this.items
			.map(([attr, value]) => `${toSerpentCase(attr)}: ${value};`)
			.join("");
	}
}

function toSerpentCase(str: string) {
	return str.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
}
