import dayjs from "./dayjs";

export function randomString(len: number) {
	const charset = "0123456789abcdefghijklmnopqrstuvwxyz";
	let res = "";
	for (let i = 0; i < len; ++i) {
		res += charset[Math.floor(Math.random() * charset.length)];
	}
	return res;
}

export function genUUID() {
	return Math.floor(Date.now() / 1000).toString(16) + randomString(8);
}

/** `_id` 或者uuid转化为Unix时间戳 */
export function id2timestamp(id: string) {
	const hex = id.slice(0, 8);
	return Number.parseInt(hex, 16);
}

export function id2datetime(id: string) {
	const u = id2timestamp(id);
	return dayjs.unix(u);
}
