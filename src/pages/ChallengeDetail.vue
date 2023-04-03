<template>
	<q-page class="q-pa-md q-gutter-md">
		<challenge-detail-card
			:value="info"
			:status="color"
		></challenge-detail-card>
		<submit-flag-card
			v-if="cid && !status"
			:comp_id="cid"
			:cha_id="id"
		></submit-flag-card>
	</q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { competition as comp } from "@/lib/api/competition";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";
import { useEventStore } from "@/stores/event";
import { notifyErrorResponse } from "@/lib/api";
import ChallengeDetailCard from "@/components/card/ChallengeDetailCard.vue";
import { ref } from "vue";
import { useCompetitionStore } from "@/stores/competition";
import { useChallengeStore } from "@/stores/challenge";
import SubmitFlagCard from "@/components/card/SubmitFlagCard.vue";

const route = useRoute();
const router = useRouter();
/**
 * cid: competition id
 * id:  challenge id
 * 没有cid则表示以管理员身份进入题目的预览, 不需要显示提交框
 * 有cid则表示为参赛者, 需要判断是否参加了这个比赛(或者是否有读写权限), 然后再显示题目详情, 还有提交框
 */
const cid = route.params.cid as string | null;
const id = route.params.id as string;
const user = useUserStore();
const evt = useEventStore();
const competition = useCompetitionStore();
const clg = useChallengeStore();
const status = computed(() => (cid ? competition.status[cid]?.[id] : null));
const color = computed(() => (status.value ? "positive" : undefined));
const info = ref<comp.ChallengeInfo | undefined>();

function forbidden() {
	router.replace({ name: "403" });
}

if (!id) {
	router.replace({ name: "404" });
} else if (!cid) {
	if (
		!(user.permission.Challenge.canRead || user.permission.Challenge.canWrite)
	) {
		forbidden();
	} else clg.load(id).then((d) => (info.value = d as any));
	// !如果要展示score的话就不能用clg.load接口了
} else {
	evt
		.load(cid)
		.then((d) => {
			if (!d.joined) forbidden();
			if (!d.is_competition) forbidden();
			competition.load_challenge(cid, id).then((d) => (info.value = d));
			competition.load_statuses(cid);
		})
		.catch((resp) => {
			notifyErrorResponse(resp);
			router.replace({ name: "404" });
		});
}
</script>
