import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { competition } from "@/lib/api/competition";
import { id2timestamp } from "@/lib/id";

export const useCompetitionStore = defineStore("competition", () => {
	const challenges = reactive<competition.ChallengeInfo[]>([]);
	const status = reactive<any>({});

	function load_statuses(comp_id: string) {
		return new Promise<boolean>((resolve, reject) => {
			if (status[comp_id] !== undefined) {
				resolve(status[comp_id]);
			} else {
				competition
					.get_challenge_status(comp_id)
					.then((d) => {
						status[comp_id] = d.data;
						resolve(d.data);
					})
					.catch(reject);
			}
		});
	}

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

	function update_challenges(comp_id: string, ...scores: competition.Score[]) {
		return new Promise((resolve, reject) => {
			competition
				.update_challenges(comp_id, ...scores)
				.then(resolve)
				.catch(reject);
		});
	}

	function check_flag(comp_id: string, cha_id: string, flag: string) {
		return new Promise((resolve, reject) => {
			competition
				.check(comp_id, cha_id, flag)
				.then(() => {
					status[comp_id][cha_id] = true;
					resolve(void 0);
				})
				.catch(reject);
		});
	}

	return {
		challenges,
		load_challenge,
		get_challenge,
		get_challenge_list,
		update_challenges,
		check_flag,
		status,
		load_statuses,
	};
});
