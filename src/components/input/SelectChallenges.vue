<template>
	<q-select
		filled
		v-model="value"
		use-input
		use-chips
		multiple
		input-debounce="0"
		:options="filterOptions"
		@update:model-value="updateFilterOptions"
		@filter="filterFn"
	>
		<template #option="scope">
			<q-item clickable @click="scope.toggleOption(scope.opt)">
				{{ scope.opt.title }}
			</q-item>
		</template>
		<template #selected-item="scope">
			<q-chip removable @remove="scope.removeAtIndex(scope.index)">
				{{ scope.opt.title }}
			</q-chip>
		</template>
	</q-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
import { useChallengeStore } from "@/stores/challenge";
import { competition as comp } from "@/lib/api/competition";
const props = defineProps<{
	modelValue: comp.ChallengeInfo[];
}>();
const emit = defineEmits(["update:modelValue"]);
const value = useVModel(props, "modelValue", emit);

const options = ref<comp.ChallengeInfo[] | null>(null);
const filterOptions = ref<comp.ChallengeInfo[]>([]);
const challenges = useChallengeStore();
let filter_val = "";

function updateFilterOptions(value: comp.ChallengeInfo[]) {
	filterOptions.value =
		options.value?.filter(
			(d) => value.findIndex((v) => d.id === v.id) === -1
		) ?? [];
	filter_val = filter_val.trim();
	if (filter_val !== "")
		filterOptions.value = filterOptions.value.filter(
			(v) => v.title.toLowerCase().indexOf(filter_val) > -1
		);
}

function filterFn(val: string, update: any) {
	const opt = options.value;
	function use_update(opt: comp.ChallengeInfo[]) {
		update(() => {
			if (val === "") {
				filterOptions.value = opt;
			} else {
				const needle = val.toLowerCase();
				filter_val = needle;
				filterOptions.value = opt.filter(
					(v) => v.title.toLowerCase().indexOf(needle) > -1
				);
			}

			filterOptions.value = filterOptions.value.filter(
				(d) => !(value.value.findIndex((v) => v.id === d.id) > -1)
			);
		});
	}
	if (opt !== null) use_update(opt);
	else {
		// load list
		challenges.get_list().then((d) => {
			options.value = d as any;
			use_update(d as any);
		});
	}
}
</script>
