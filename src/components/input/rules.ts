import { $t } from "@/boot/i18n";
import { checkEmail } from "@/lib/regex";
import { checkURL } from "@/lib/regex";

export function non_empty(v: string) {
	return v.length > 0 || $t("error.form.please_type_something");
}

export function is_email(v: string) {
	return checkEmail(v) || $t("error.form.invalid_email");
}

export function is_url(v: string) {
	return checkURL(v) || $t("error.form.invalid_url");
}
