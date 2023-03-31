// !这里的接口是给管理员的
// !普通用户获取题目使用competition里的接口
import request from "../request";

export type ChallengeLabel =
	| "Misc"
	| "Pwn"
	| "Crypto"
	| "Web"
	| "Reverse"
	| "Stega"
	| "PPC";
export const CHALLENGE_LABELS: ChallengeLabel[] = [
	"Misc",
	"Pwn",
	"Crypto",
	"Web",
	"Reverse",
	"Stega",
	"PPC",
];

export interface ChallengeCreateForm {
	title: string;
	label: string;
	desc: string;
	flag: string;
}
export interface ChallengeInfo extends ChallengeCreateForm {
	id: string;
	creator: string;
}

export interface ChallengeCreateResult {
	id: string;
}

export namespace challenge {
	const base = (key: string) => {
		return `/challenge/${key}`;
	};

	export function create(data: ChallengeCreateForm) {
		return request.post<ChallengeCreateResult>(base("create"), data);
	}

	export function list(label: ChallengeLabel) {
		return request.post<ChallengeInfo[]>(base(`list/${label}`));
	}

	export function get(id: string) {
		return request.post<ChallengeInfo>(base(id));
	}

	export function update(id: string, form: ChallengeCreateForm) {
		return request.post(base(`update/${id}`), form);
	}
}
