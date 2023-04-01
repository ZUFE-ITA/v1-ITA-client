import request from "../request";

export namespace competition {
	const base = (key: string) => {
		return `/competition/${key}`;
	};

	export interface ChallengeInfo {
		id: string;
		creator: string;
		title: string;
		desc: string;
	}

	export function get_challenge(comp_id: string, cha_id: string) {
		return request.post<ChallengeInfo>(base(`${comp_id}/${cha_id}`));
	}

	export function check(comp_id: string, cha_id: string, flag: string) {
		return request.post(base("check"), {
			comp_id,
			cha_id,
			flag: flag.trim(),
		});
	}

	export function get_challenge_list(cid: string) {
		return request.post<ChallengeInfo[]>(base(`challenges/${cid}`));
	}

	export function append_challenge(comp_id: string, cha_id: string) {
		return request.post(base("append_challenge"), { comp_id, cha_id });
	}

	export function update_challenges(comp_id: string, ...cha_id: string[]) {
		return request.post(base("update_challenges"), { comp_id, cha_id });
	}

	export function get_challenge_status(comp_id: string) {
		return request.post(base(`challenge_status/${comp_id}`));
	}
}
