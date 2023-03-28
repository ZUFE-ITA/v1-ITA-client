<template>
	<q-input
		:label="label"
		type="text"
		:model-value="value"
		@update:model-value="(e) => emit('update:value', e)"
		:rules="[non_empty, is_url, ...(rules ?? [])]"
	/>
</template>

<script setup lang="ts">
import { ValidationRule } from "quasar";
import { non_empty, is_url } from "./rules";

defineProps<{
	value: string;
	label: string;
	rules?: ValidationRule<any>[];
}>();
const emit = defineEmits(["update:value"]);
</script>
