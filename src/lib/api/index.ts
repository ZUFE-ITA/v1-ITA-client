import { user } from "./user";
import { event } from "./event";
import { competition as comp } from "./competition";
import { challenge } from "./challenge";

import statusCode from "./status-code";
import notify from "../notify";
import { $t } from "@/boot/i18n";

export namespace api {}

export function getErrResponseData(resp: any) {
	return resp.response.data;
}

export function getErrDetail(resp: any) {
	const d = getErrResponseData(resp);
	return d.detail;
}

export function getErrCodeByResponse(resp: any) {
	const data = getErrResponseData(resp);
	return data.code;
}

export function getErrMsg(resp: any) {
	const code = getErrCodeByResponse(resp);
	return (
		(statusCode as any)[code] ||
		(resp.status == 401
			? "error.request.need_login_first"
			: "error.request.unknown_error")
	);
}

// 只能处理简单的错误, 需要参数的报错信息不可以用!
export function notifyErrorResponse(
	resp: any,
	type: "error" | "warn" | "success" = "warn"
) {
	notify[type]($t(getErrMsg(resp)));
}
