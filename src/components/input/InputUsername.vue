<template>
	<q-input
		:label="label"
		type="text"
		:model-value="value"
		@update:model-value="(e) => emit('update:value', e)"
		:rules="[
			(v) => v.length > 0 || $t('error.form.please_type_something'),
			...(rules ?? []),
		]"
	/>
</template>

<script setup lang="ts">
import { ValidationRule } from "quasar";

defineProps<{
	value: string;
	label: string;
	rules?: ValidationRule<any>[];
}>();
const emit = defineEmits(["update:value"]);
</script>
