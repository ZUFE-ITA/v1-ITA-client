<template>
	<q-table
		class="my-sticky-dynamic"
		:title="$t('competition.rank')"
		:columns="cols"
		row-key="index"
		:rows="value.map((v, idx) => ({ idx, ...v }))"
		hide-bottom
		v-model:pagination="pagination"
		:rows-per-page-options="[0]"
	/>
</template>

<script setup lang="ts">
import { competition } from "@/lib/api/competition";
import { useUserStore } from "@/stores/user";
import { h, ref } from "vue";
import UserAvatar from "../UserAvatar.vue";
const user = useUserStore();

defineProps<{
	value: competition.RankItem[];
}>();
const pagination = ref({
	rowsPerPage: 0,
});
const cols: any = [
	{
		name: "index",
		label: "#",
		field: "idx",
		align: "center",
	},
	{
		name: "name",
		label: "Name",
		align: "center",
		field: (row: any) => {
			return user.users.find((v) => v.id === row.uid)
				? user.get_info(row.uid).value?.username
				: "loading";
		},
	},
	{
		name: "uid",
		label: "User",
		align: "center",
		field: (row: any) => h(UserAvatar, { id: row.uid }),
	},
	{
		name: "score",
		label: "Score",
		field: "score",
		align: "center",
	},
	{
		name: "count",
		label: "Count",
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
