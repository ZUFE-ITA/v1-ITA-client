const url =
	/^((((https?|ftp|file):\/\/)?(([\w]+\.)*[\w]+)(:((6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])|[0-5]?\d{0,4}))?\/?(([^?#]+)*)?)|(\/[^#?]+))(((#[^?]+)?)((\?.*)?))$/i;

const email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i;

const multilevelDir = /^\/*[^/]+(\/+[^/]+)+\/*$/i;

export function checkEmail(str: string) {
	return email.test(str);
}

export function resolveURL(str: string, strict = false) {
	function _resolve(str: string, strict = false) {
		const res = url.exec(str);
		if (res) {
			const scheme = res[4] === undefined && !strict ? "http" : res[4];
			const domain = res[5];
			const _port = res[7] ?? "";
			const port = res[8];
			const path = res[10] ?? "";
			const local_site = res[12];
			const hash = res[14] ?? "";
			const query = res[16] ?? "";
			const suffix = res[13] ?? "";
			return {
				scheme,
				domain,
				_port,
				port,
				path,
				local_site,
				suffix,
				hash,
				query,
			};
		}
		return null;
	}
	const tgt = _resolve(str, strict);
	if (tgt === null) return null;
	if (tgt.local_site === undefined) {
		const root = `${tgt.scheme}://${tgt.domain}${tgt._port}/`;
		const href = `${root}${tgt.path}${tgt.suffix}`;
		return { ...tgt, href, root };
	}
	const local_res = _resolve(location.href);
	const { suffix, hash, query } = tgt;
	const root = `${local_res?.scheme}://${local_res?.domain}${local_res?._port}`;
	return { ...local_res, suffix, hash, query, path: str, href: str, root };
}

export function checkURL(str: string) {
	return url.test(str);
}

/**检测path是否包含一个以上的目录 */
export function checkMultilevelDir(str: string) {
	return multilevelDir.test(str);
}

export function checkInt(str: string, length: number | undefined = undefined) {
	const t = /^[0-9]+$/i.test(str);
	if (length === undefined) return t;
	else return t && str.length === length;
}
