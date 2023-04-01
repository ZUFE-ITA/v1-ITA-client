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
		score: number;
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

	// export function append_challenge(comp_id: string, cha_id: string) {
	// 	return request.post(base("append_challenge"), { comp_id, cha_id });
	// }

	export interface Score {
		id: string;
		score: number;
	}

	export function update_challenges(comp_id: string, ...scores: Score[]) {
		return request.post(base("update_challenges"), { comp_id, scores });
	}

	export function get_challenge_status(comp_id: string) {
		return request.post(base(`challenge_status/${comp_id}`));
	}

	export interface RankItem {
		uid: string;
		avg_time: number;
		count: number;
		score: number;
	}
	export function get_rank(comp_id: string) {
		return request.get<RankItem[]>(base(`rank/${comp_id}`));
	}

	// export function update_score(comp_id: string, scores: )
}
