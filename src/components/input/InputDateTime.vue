<template>
	<div class="q-gutter-md row items-start">
		<q-date
			v-model="model"
			mask="YYYY-MM-DD HH:mm"
			:color="color ? color : 'primary'"
		/>
		<q-time
			v-model="model"
			mask="YYYY-MM-DD HH:mm"
			:color="color ? color : 'primary'"
		/>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
const props = defineProps<{
	color?: string;
	modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);
</script>
