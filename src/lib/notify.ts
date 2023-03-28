import { Notify } from "quasar";
const success = function (message: string) {
	Notify.create({
		message,
		type: "positive",
		progress: true,
	});
};
const warn = function (message: string) {
	Notify.create({
		message,
		type: "warning",
		progress: true,
	});
};
const error = function (message: string) {
	Notify.create({
		message,
		type: "negative",
		progress: true,
	});
};
export default {
	success,
	warn,
	error,
};
