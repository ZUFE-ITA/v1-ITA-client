<template>
	<q-page class="q-pa-md q-gutter-md">
		<basic-card class="q-pa-md">
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
				<q-input
					filled
					v-model="title"
					label="活动名称"
					lazy-rules
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>
				<q-input
					filled
					v-model="organizer"
					label="主办方"
					lazy-rules
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>
				<q-input
					filled
					v-model="addr"
					label="活动举办地"
					hint="活动的举办地址, 线上直接写线上"
					lazy-rules
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>

				<q-input
					type="textarea"
					filled
					v-model="desc"
					label="活动简介(支持markdown)"
					lazy-rules
					autogrow
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>

				<!-- <div>
					<div class="text-h5">描述</div>
					<markdown-editor
						v-model:value="desc"
						id="create-event-md-editor"
					></markdown-editor>
				</div> -->
				<q-toggle v-model="is_competition">同步创建比赛</q-toggle>
				<select-challenges
					hint="赛题选择"
					v-if="is_competition"
					v-model="challenges"
					@update:model-value="updateChallenges"
				></select-challenges>
				<input-challenge-score
					v-if="challenges.length"
					v-model="scores"
				></input-challenge-score>

				<q-toggle v-model="need_check">需要签到签退</q-toggle>

				<q-toggle v-model="with_point">有学分奖励</q-toggle>
				<q-input
					v-if="with_point"
					filled
					v-model="point_detail"
					label="学分明细"
					hint="说明参加可以加什么分, 可换行"
					lazy-rules
					autogrow
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>

				<q-toggle v-model="with_reward">有奖品</q-toggle>
				<q-input
					v-if="with_reward"
					filled
					v-model="reward_detail"
					label="奖品"
					hint="可换行"
					lazy-rules
					autogrow
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>

				<q-toggle v-model="limit_count">人数限制</q-toggle>
				<q-input
					v-if="limit_count"
					type="number"
					filled
					v-model="max_count"
					label="最多多少人"
					lazy-rules
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>

				<div>
					<div class="text-h5">报名截止时间</div>
					<input-date-time v-model="deadline"></input-date-time>
				</div>

				<q-toggle v-model="longtime">长期活动</q-toggle>

				<div v-if="longtime">
					<div class="text-h5">举办时期</div>
					<q-date v-model="range" range />
				</div>

				<template v-else>
					<div>
						<div class="text-h5">开始时间</div>
						<input-date-time v-model="st"></input-date-time>
					</div>

					<q-toggle v-model="manual_stop">手动停止</q-toggle>

					<div v-show="!manual_stop">
						<div class="text-h5">结束时间</div>
						<input-date-time v-model="ed"></input-date-time>
					</div>
				</template>

				<div>
					<q-btn label="Submit" type="submit" color="primary" />
					<q-btn
						label="Reset"
						type="reset"
						color="primary"
						flat
						class="q-ml-sm"
					/>
				</div>
			</q-form>
		</basic-card>
	</q-page>
</template>

<script setup lang="ts">
import InputChallengeScore, {
	CellScore,
} from "@/components/input/InputChallengeScore.vue";
import BasicCard from "@/components/card/BasicCard.vue";
import InputDateTime from "@/components/input/InputDateTime.vue";
import SelectChallenges from "@/components/input/SelectChallenges.vue";

import { notifyErrorResponse } from "@/lib/api";
import notify from "@/lib/notify";
import { useEventStore } from "@/stores/event";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs, { cvtToUnix } from "@/lib/dayjs";
import { useUserStore } from "@/stores/user";
import { useCompetitionStore } from "@/stores/competition";
import { competition as comp } from "@/lib/api/competition";

const user = useUserStore();
const event = useEventStore();
const competition = useCompetitionStore();

const router = useRouter();
const organizer = ref("");
const title = ref("");
const addr = ref("");

const is_competition = ref(false);
const challenges = ref<comp.ChallengeInfo[]>([]);
const scores = ref<CellScore[]>([]);

const deadline = ref("");

const need_check = ref(false);

const with_point = ref(false);
const point_detail = ref("");

const with_reward = ref(false);
const reward_detail = ref("");

const limit_count = ref(false);
const max_count = ref('');

const desc = ref("");
const longtime = ref(false);
const range = ref<{ from: string | number; to: string | number }>({
	from: "",
	to: "",
});
const st = ref("");
const ed = ref("");
const manual_stop = ref(true);

const route = useRoute();
const id = route.params.id as string | undefined | null;

const joined = ref(false);

watch(longtime, (v) => {
	if (v) {
		range.value = {
			from: dayjs(st.value).format("YYYY/MM/DD"),
			to: dayjs(ed.value).format("YYYY/MM/DD"),
		};
	} else {
		st.value = dayjs(range.value.from).format("YYYY-MM-DD HH:mm");
		ed.value = dayjs(range.value.to).format("YYYY-MM-DD HH:mm");
		manual_stop.value = false;
	}
});

function updateChallenges(cs: comp.ChallengeInfo[]) {
	challenges.value = cs;
	const new_arr: CellScore[] = [];
	for (const c of cs) {
		const cell = scores.value.find((v) => v.id === c.id);
		if (cell) new_arr.push(cell);
		else
			new_arr.push({
				id: c.id,
				title: c.title,
				score: 0,
			});
	}
	scores.value = new_arr;
}

if (id) {
	event.load(id).then((d) => {
		organizer.value = d.organizer;
		title.value = d.title;
		addr.value = d.addr;
		is_competition.value = d.is_competition;
		deadline.value = dayjs(d.deadline).format("YYYY-MM-DD HH:mm");
		need_check.value = d.need_check;
		with_point.value = d.with_point;
		point_detail.value = d.point_detail ?? "";
		with_reward.value = d.with_reward;
		reward_detail.value = d.reward_detail ?? "";
		limit_count.value = d.limit_count;
		max_count.value = d.max_count + '';
		desc.value = d.desc;
		longtime.value = d.longtime;
		range.value = {
			from: dayjs(d.start).format("YYYY/MM/DD"),
			to: dayjs(d.end).format("YYYY/MM/DD"),
		};
		st.value = dayjs(d.start).format("YYYY-MM-DD HH:mm");
		ed.value = dayjs(d.end).format("YYYY-MM-DD HH:mm");
		manual_stop.value = d.manual_stop;
		joined.value = d.joined;
		if (is_competition.value) {
			// 读取题目列表
			competition.get_challenge_list(id).then((d) => {
				challenges.value = d;
				scores.value = d.map((d) => ({
					title: d.title,
					id: d.id,
					score: d.score,
				}));
			});
		}
	});
}

function onSubmit() {
	if (!user.info?.id || !user.permission.Event.canWrite) return;
	const data: any = {
		title: title.value,
		desc: desc.value,
		organizer: organizer.value,
		addr: addr.value,
		need_check: need_check.value,
		longtime: longtime.value,
		with_point: with_point.value,
		with_reward: with_reward.value,
		limit_count: limit_count.value,
		deadline: deadline.value,
		is_competition: is_competition.value,
		manual_stop: longtime.value ? false : manual_stop.value,
	};
	if (!deadline.value) {
		return notify.error("请输入报名截止时间");
	}
	const _dead = cvtToUnix(deadline.value);
	const _now = dayjs().unix();
	if (_dead <= _now && !id) {
		return notify.error("截止时间应该大于当前时间");
	}
	if (longtime.value) {
		if (range.value.from && range.value.to) {
			data.start = range.value.from;
			data.end = range.value.to;
		} else {
			return notify.error("选择时间范围");
		}
	} else {
		if (st.value) {
			data.start = st.value;
		} else {
			return notify.error("选择开始时间");
		}
		if (!manual_stop.value && ed.value) {
			data.end = ed.value;
		} else if (!manual_stop.value) {
			return notify.error("选择结束时间");
		}
		const _s = cvtToUnix(st.value),
			_e = cvtToUnix(ed.value);
		if (_s < _now && !id) {
			return notify.error("开始时间应该大于当前时间");
		}
		if (_s >= _e && !manual_stop.value) {
			return notify.error("结束时间早于开始时间了");
		}
	}
	if (with_point.value) {
		data.point_detail = point_detail.value;
	}
	if (with_reward.value) {
		data.reward_detail = reward_detail.value;
	}
	if (limit_count.value) {
		data.max_count = max_count.value;
	}
	if (id) {
		event
			.update({
				id,
				creator: user.info.id,
				joined: joined.value,
				...data,
			})
			.then(() => {
				notify.success("更新完成");
				update_challenges(id, challenges.value)
					.then(() => router.replace({ name: "event detail", params: { id } }))
					.catch(() =>
						router.replace({ name: "event detail", params: { id } })
					);
			})
			.catch(notifyErrorResponse);
	} else
		event
			.create(user.info?.id, data)
			.then((info) => {
				notify.success("添加成功");
				update_challenges(info.id, challenges.value)
					.then(() => router.push("/"))
					.catch(() => router.push("/"));
			})
			.catch(notifyErrorResponse);
}

function update_challenges(comp_id: string, challenges: comp.ChallengeInfo[]) {
	return new Promise((resolve, reject) => {
		if (is_competition.value) {
			competition
				.update_challenges(
					comp_id,
					...challenges.map((d) => ({
						...d,
						score: scores.value.find((v) => v.id === d.id)?.score ?? 0,
					}))
				)
				.then(resolve)
				.catch(notifyErrorResponse);
		} else reject();
	});
}

function onReset() {
	title.value = "";
	desc.value = "";
	range.value = { from: "", to: "" };
	st.value = "";
}
</script>
