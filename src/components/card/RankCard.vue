<template>
	<q-table
		class="my-sticky-dynamic"
		:title="$t('competition.rank')"
		:columns="cols"
		row-key="index"
		:rows="value.map((v, idx) => ({ idx, ...v }))"
		hide-bottom
	/>
</template>

<script setup lang="ts">
import { competition } from "@/lib/api/competition";
import { h } from "vue";
import UserAvatar from "../UserAvatar.vue";
defineProps<{
	value: competition.RankItem[];
}>();
const cols: any = [
	{
		name: "index",
		label: "#",
		field: "idx",
		align: "center",
	},
	{
		name: "uid",
		label: "uid",
		align: "center",
		field: (row: any) => h(UserAvatar, { id: row.uid }),
	},
	{
		name: "score",
		label: "score",
		field: "score",
		align: "center",
	},
	{
		name: "count",
		label: "count",
		field: "count",
		align: "center",
	},
	// {
	// 	name: "AVG Time",
	// 	label: "AVG Time",
	// 	field: "avg_time",
	// 	align: "center",
	// },
];
</script>
