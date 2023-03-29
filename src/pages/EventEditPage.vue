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

				<div>
					<div class="text-h5">报名截止时间</div>
					<input-date-time v-model="deadline"></input-date-time>
				</div>

				<q-toggle v-model="longtime">长期活动</q-toggle>

				<div v-if="longtime">
					<div class="text-h5">举办时期</div>
					<q-date v-model="range" range />
				</div>

				<div v-else>
					<div class="text-h5">开始时间</div>
					<input-date-time v-model="st"></input-date-time>
				</div>

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
import BasicCard from "@/components/card/BasicCard.vue";
import InputDateTime from "@/components/input/InputDateTime.vue";
import { notifyErrorResponse } from "@/lib/api";
import notify from "@/lib/notify";
import { useEventStore } from "@/stores/event";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "@/lib/dayjs";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const event = useEventStore();
const router = useRouter();
const organizer = ref("");

const title = ref("");
const addr = ref("");

const deadline = ref("");

const need_check = ref(false);

const with_point = ref(false);
const point_detail = ref("");

const with_reward = ref(false);
const reward_detail = ref("");

const limit_count = ref(false);
const max_count = ref();

const desc = ref("");
const longtime = ref(false);
const range = ref<{ from: string | number; to: string | number }>({
	from: "",
	to: "",
});
const st = ref<string>("");

const route = useRoute();
const id = route.params.id as string | undefined | null;

const joined = ref(false);
if (id) {
	event.load(id).then((d) => {
		organizer.value = d.organizer;
		title.value = d.title;
		addr.value = d.addr;
		deadline.value = dayjs(d.deadline).format("YYYY-MM-DD HH:mm");
		need_check.value = d.need_check;
		with_point.value = d.with_point;
		point_detail.value = d.point_detail ?? "";
		with_reward.value = d.with_reward;
		reward_detail.value = d.reward_detail ?? "";
		limit_count.value = d.limit_count;
		max_count.value = d.max_count;
		desc.value = d.desc;
		longtime.value = d.longtime;
		range.value = {
			from: dayjs(d.range?.start).format("YYYY/MM/DD"),
			to: dayjs(d.range?.end).format("YYYY/MM/DD"),
		};
		st.value = dayjs(d.start).format("YYYY-MM-DD HH:mm");
		joined.value = d.joined;
	});
}

function onSubmit() {
	if (!user.self.info?.id || !user.self.permission.Event.canAppend) return;
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
	};
	if (longtime.value) {
		if (range.value.from && range.value.to) {
			data.range = {
				start: range.value.from,
				end: range.value.to,
			};
		} else {
			notify.error("选择时间范围");
		}
	} else {
		if (st.value) {
			data.start = st.value;
		} else {
			notify.error("选择结束时间");
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
				creator: user.self.info.id,
				joined: joined.value,
				...data,
			})
			.then(() => {
				notify.success("更新完成");
				router.replace({ name: "event detail", params: { id } });
			})
			.catch(notifyErrorResponse);
	} else
		event
			.create(user.self.info?.id, data)
			.then(() => {
				notify.success("添加成功");
				router.push("/");
			})
			.catch(notifyErrorResponse);
}
function onReset() {
	title.value = "";
	desc.value = "";
	range.value = { from: "", to: "" };
	st.value = "";
}
</script>
