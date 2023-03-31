<template>
	<basic-card>
		<div @click="$emit('clickCard')">
			<q-card-section>{{ title }}</q-card-section>
			<q-card-section>{{ desc }}</q-card-section>
		</div>
		<template v-if="slot.default">
			<q-separator></q-separator>
			<q-card-actions>
				<slot></slot>
			</q-card-actions>
		</template>
	</basic-card>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import BasicCard from "./BasicCard.vue";

defineProps<{
	title: string;
	desc: string;
}>();
defineEmits(["clickCard"]);
const slot = useSlots();
</script>
