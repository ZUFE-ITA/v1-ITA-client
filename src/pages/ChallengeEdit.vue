<template>
	<q-page class="q-pa-md q-gutter-md">
		<basic-card class="q-pa-md">
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
				<q-input
					filled
					v-model="title"
					label="题目名字"
					lazy-rules
					:rules="[(val) => (val && val.length > 0) || 'Please type something']"
				/>
				<q-select
					filled
					v-model="label"
					:options="clg.CHALLENGE_LABELS"
					lazy-rules
					:rules="[
						(val) => (val && val.length > 0) || 'Please choose something',
					]"
					label="类型"
				/>
				<q-input
					filled
					v-model="flag"
					label="flag"
					hint="like: flag{xxxx}"
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
		<basic-card class="q-pa-md">
			<q-card-section>
				<div class="text-h6">简介预览</div>
			</q-card-section>
			<q-separator></q-separator>
			<markdown-block :text="desc"></markdown-block>
		</basic-card>
	</q-page>
</template>

<script setup lang="ts">
import BasicCard from "@/components/card/BasicCard.vue";
import { ref } from "vue";
import { challenge as clg } from "@/lib/api/challenge";
import MarkdownBlock from "@/components/MarkdownBlock.vue";
import { useRoute, useRouter } from "vue-router";
import { useChallengeStore } from "@/stores/challenge";
import { useUserStore } from "@/stores/user";
import notify from "@/lib/notify";
import { notifyErrorResponse } from "@/lib/api";

const title = ref("");
const desc = ref("");
const label = ref("");
const flag = ref("");

const router = useRouter();
const route = useRoute();
const challenge = useChallengeStore();
const user = useUserStore();
const id = route.params.id as string | null;
if (id) {
	challenge.load(id).then((d) => {
		desc.value = d.desc;
		label.value = d.label;
		title.value = d.title;
		flag.value = d.flag;
	});
}
function onSubmit() {
	if (!user.permission.Challenge.canWrite || !user.info) return;
	if (id) {
		challenge
			.update({
				flag: flag.value,
				desc: desc.value,
				title: title.value,
				label: label.value,
				id,
				creator: user.info.id,
			})
			.then((d) => {
				notify.success("更新成功!!!");
				router.replace({ name: "challenge detail", params: { id: d.id } });
			})
			.catch(notifyErrorResponse);
	} else {
		challenge
			.create(user.info.id, {
				flag: flag.value,
				desc: desc.value,
				title: title.value,
				label: label.value,
			})
			.then((d) => {
				notify.success("添加成功!!!");
				router.replace({ name: "challenge detail", params: { id: d.id } });
			})
			.catch(notifyErrorResponse);
	}
}

function onReset() {
	title.value = "";
	desc.value = "";
	label.value = "";
}
</script>
