// 根据status-code自动生成error-code

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

function gen_code(raw) {
	const map = {};
	for (const code in raw) {
		const msg = raw[code];
		let [_, dtype, name] = msg.toUpperCase().split(".");
		if (map[dtype] === undefined) {
			map[dtype] = [{ name, code }];
		} else {
			map[dtype].push({ name, code });
		}
	}

	function gen_block(clsName, kvs) {
		let head = `export enum ${clsName}`;
		let body = kvs.map((d) => `${d.name} = ${d.code}`).join(",");
		return `${head}{${body}}`;
	}

	let blocks = [];
	for (const cls in map) {
		blocks.push(gen_block(cls, map[cls]));
	}
	return `export namespace ErrorCode {${blocks.join("\n")}}`;
}

const target = path.resolve(__dirname, "./status-code.ts");
const output = path.resolve(__dirname, "./error-code.ts");

const raw = fs.readFileSync(target, {
	encoding: "utf-8",
});
const dict = /(\{[^}]+\})/i.exec(raw)[0];
let code = gen_code(eval(`(${dict})`));

const opt = eval(`(${fs.readFileSync("./.prettierrc")})`);
code = prettier.format(code, { ...opt, parser: "babel-ts" });
fs.writeFileSync(output, code);
