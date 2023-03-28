<template>
	<q-input
		:label="label"
		type="email"
		:model-value="value"
		@update:model-value="(e) => emit('update:value', e)"
		:rules="[non_empty, is_email, ...(rules ?? [])]"
	/>
</template>

<script setup lang="ts">
import { ValidationRule } from "quasar";
import { non_empty, is_email } from "./rules";

defineProps<{
	value: string;
	label: string;
	rules?: ValidationRule<any>[];
}>();
const emit = defineEmits(["update:value"]);
</script>
