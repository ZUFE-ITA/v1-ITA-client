import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { competition } from "@/lib/api/competition";
import { id2timestamp } from "@/lib/id";

interface ChallengeStatus {
	id: string;
	comp_id: string;
	status: boolean;
}

export const useCompetitionStore = defineStore("competition", () => {
	const challenges = reactive<competition.ChallengeInfo[]>([]);
	const status = reactive<ChallengeStatus[]>([]);

	function update_info(...info: competition.ChallengeInfo[]) {
		for (const i of info) {
			const idx = challenges.findIndex((v) => v.id === i.id);
			if (idx > -1) challenges[idx] = i;
			else challenges.push(i);
		}
		challenges.sort((a, b) => id2timestamp(b.id) - id2timestamp(a.id));
	}

	function load_challenge(comp_id: string, cha_id: string) {
		return new Promise<competition.ChallengeInfo>((resolve, reject) => {
			const idx = challenges.findIndex((v) => v.id === cha_id);
			if (idx > -1) return resolve(challenges[idx]);
			competition
				.get_challenge(comp_id, cha_id)
				.then((d) => {
					update_info(d.data);
					resolve(d.data);
				})
				.catch(reject);
		});
	}
	function get_challenge(comp_id: string, cha_id: string) {
		const info = ref<null | competition.ChallengeInfo>(null);
		load_challenge(comp_id, cha_id).then((d) => (info.value = d));
		return info;
	}

	function get_challenge_list(comp_id: string) {
		return new Promise<competition.ChallengeInfo[]>((resolve, reject) => {
			competition
				.get_challenge_list(comp_id)
				.then((d) => {
					update_info(...d.data);
					resolve(d.data);
				})
				.catch(reject);
		});
	}

	function update_challenges(comp_id: string, ...cha_ids: string[]) {
		return new Promise((resolve, reject) => {
			competition
				.update_challenges(comp_id, ...cha_ids)
				.then(resolve)
				.catch(reject);
		});
	}

	function check_flag(comp_id: string, cha_id: string, flag: string) {
		competition.check(comp_id, cha_id, flag).then();
	}

	return {
		challenges,
		load_challenge,
		get_challenge,
		get_challenge_list,
		update_challenges,
		check_flag,
		status,
	};
});
