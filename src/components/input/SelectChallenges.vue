<template>
	<q-select
		filled
		v-model="value"
		use-input
		use-chips
		multiple
		input-debounce="0"
		:options="filterOptions"
		@filter="filterFn"
		style="width: 250px"
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

function filterFn(val: string, update: any) {
	const opt = options.value;
	function use_update(opt: comp.ChallengeInfo[]) {
		update(() => {
			if (val === "") {
				filterOptions.value = opt;
			} else {
				const needle = val.toLowerCase();
				filterOptions.value = opt.filter(
					(v) => v.title.toLowerCase().indexOf(needle) > -1
				);
			}
		});
	}
	if (opt !== null) use_update(opt);
	else {
		// load list
		challenges.get_list().then((d) => {
			options.value = d;
			use_update(d);
		});
	}
}
</script>
