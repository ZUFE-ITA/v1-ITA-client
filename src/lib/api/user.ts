import request from "../request";
import md5 from "js-md5";

export namespace user {
	export interface UserInfo {
		username: string;
		id: string;
		mail: string;
		permission: string;
		signature: string | null;
	}

	const base = (key: string) => {
		return `/user/${key}`;
	};
	export function auth() {
		return request.post<UserInfo>(base("auth"));
	}

	export interface LoginForm {
		mail: string;
		psw: string;
		remember: boolean;
	}
	export function login(data: LoginForm) {
		data.psw = md5(data.psw);
		return request.post<UserInfo>(base("login"), data);
	}
	export function logout() {
		return request.post(base("logout"));
	}

	export interface RegisterForm {
		mail: string;
		no: string;
		psw: string;
		username: string;
	}
	export function register(data: RegisterForm) {
		data.psw = md5(data.psw);
		return request.post<UserInfo>(base("register"), data);
	}

	export function info(id: string) {
		return request.get<UserInfo>(base(id));
	}
}
