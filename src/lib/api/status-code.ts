export default {
	// 错误码格式: aabb

	// 10xx: 登录/注册表单错误
	// 注册
	1000: "error.form.invalid_username",
	1001: "error.form.invalid_psw",
	1002: "error.form.invalid_email",
	1003: "error.form.inconsistent_psw",
	1004: "error.form.username_conflict",
	1005: "error.form.email_conflict",
	1006: "error.form.psw_too_simple",
	1007: "error.form.no_format_error",
	1008: "error.form.no_conflict",
	// 登录
	1010: "error.form.unknown_account",
	1011: "error.form.unknown_email",
	1012: "error.form.psw_wrong",
	// 验证邮箱
	1020: "error.form.code_wrong",
	1021: "error.form.try_again_after_",
	1022: "error.form.already_verified",
	1023: "error.form.need_verification",
	1024: "error.form.code_expired",
	// 更新信息
	1030: "error.form.signature_too_long",
	1031: "error.form.username_too_long",

	// 11xx: BBS问题
	1100: "error.bbs.unknown_article",
	1101: "error.bbs.unknown_comment",
	1103: "error.bbs.already_checked_in",

	// 20xx: 错误请求
	2000: "error.request.missing_param",
	2001: "error.request.out_of_range",
	2002: "error.request.permission_denied",

	// 30xx: User问题
	3000: "error.user.not_found",

	// 31xx: Event问题
	3101: "error.event.not_found",
	3102: "error.event.has_joined",
	3103: "error.event.exceeded_the_upper_limit",
	3104: "error.event.not_joined",
	3105: "error.event.deadline_has_passed",
	3106: "error.event.is_not_manual_stop",
	3107: "error.event.has_stopped",
	3108: "error.event.not_stop",

	// 32xx: Challenge问题
	3200: "error.challenge.not_found",
	3201: "error.challenge.flag_wrong",
	// 33xx: Competition问题
	3300: "error.competition.not_found",
	3301: "error.competition.already_passed",
	3302: "error.competition.forbidden",
	3303: "error.competition.submission_closed",
};

import { ErrorCode } from "./error-code";

export interface ErrorMsg {
	code: ErrorCode.BBS | ErrorCode.FORM | ErrorCode.REQUEST;
	detail: string;
}

export { ErrorCode };
