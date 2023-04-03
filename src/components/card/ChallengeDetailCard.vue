<template>
	<basic-card v-if="value">
		<q-card-section class="text-h6 justify-between flex">
			{{ value.title }}
			<q-btn
				flat
				round
				icon="edit"
				color="secondary"
				v-if="user.permission.Challenge.canWrite"
				@click="
					$router.push({ name: 'edit challenge', params: { id: value?.id } })
				"
			/>
			<q-badge
				v-if="status == 'positive'"
				color="positive"
				floating
				transparent
			>
				HACKED
			</q-badge>
		</q-card-section>
		<q-separator></q-separator>
		<q-card-section>
			<markdown-block :text="value.desc"></markdown-block>
		</q-card-section>
	</basic-card>
	<basic-card v-else>
		<q-skeleton type="rect" width="100%" height="300px"></q-skeleton>
	</basic-card>
</template>
<script setup lang="ts">
import { competition as comp } from "@/lib/api/competition";
import BasicCard from "./BasicCard.vue";
import MarkdownBlock from "../MarkdownBlock.vue";
import { useUserStore } from "@/stores/user";
defineProps<{
	value?: comp.ChallengeInfo;
	status?: "positive" | "negative";
}>();

const user = useUserStore();
</script>
