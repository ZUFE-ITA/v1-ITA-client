<template>
	<q-input
		:label="label"
		type="text"
		:model-value="value"
		maxlength="10"
		@update:model-value="(e) => emit('update:value', e)"
		:rules="[
			non_empty,
			(v) => !isNaN(Number(v)) || $t('error.form.invalid_value'),
			...(rules ?? []),
		]"
	/>
</template>

<script setup lang="ts">
import { ValidationRule } from "quasar";
import { non_empty } from "./rules";
defineProps<{
	value: string;
	label: string;
	rules?: ValidationRule<any>[];
}>();
const emit = defineEmits(["update:value"]);
</script>
