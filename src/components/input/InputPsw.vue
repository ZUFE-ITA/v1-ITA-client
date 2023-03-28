<template>
	<q-input
		:label="label"
		type="password"
		:model-value="value"
		@update:model-value="(e) => emit('update:value', e)"
		:rules="[non_empty, ...(rules ?? [])]"
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
