<template>
	<div class="q-pa-md">
		<q-table
			:rows="value"
			:columns="columns"
			title="分值"
			:rows-per-page-options="[]"
			hide-bottom
		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td key="title" :props="props">
						{{ props.row.title }}
					</q-td>
					<q-td key="score" :props="props">
						{{ props.row.score }}
						<q-popup-edit
							v-model.number="props.row.score"
							:validate="caloriesRangeValidation"
							@hide="caloriesRangeValidation"
							v-slot="scope"
						>
							<q-input
								type="number"
								v-model.number="scope.value"
								:hint="props.row.title"
								:error="errorCalories"
								:error-message="errorMessageCalories"
								dense
								autofocus
								@keyup.enter="scope.set"
							/>
						</q-popup-edit>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { ref } from "vue";
export interface CellScore {
	id: string;
	title: string;
	score: number;
}
const props = defineProps<{
	modelValue: CellScore[];
}>();
const emit = defineEmits(["update:modelValue"]);
const value = useVModel(props, "modelValue", emit);

const columns: any = [
	{ name: "title", align: "center", label: "title", field: "title" },
	{ name: "score", align: "center", label: "score", field: "score" },
];

const errorCalories = ref(false);
const errorMessageCalories = ref("");
function caloriesRangeValidation(val: any) {
	if (val < 0) {
		errorCalories.value = true;
		errorMessageCalories.value = "得大于0吧";
		return false;
	}
	errorCalories.value = false;
	errorMessageCalories.value = "";
	return true;
}
</script>
