<template>
	<basic-card>
		<div @click="$emit('clickCard')">
			<q-card-section>{{ title }}</q-card-section>
			<q-card-section>
				<q-item-label :lines="1">{{ stripMarkdown(desc) }}</q-item-label>
			</q-card-section>
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
import { stripMarkdown } from "@/lib/markdown";
defineProps<{
	title: string;
	desc: string;
}>();
defineEmits(["clickCard"]);
const slot = useSlots();
</script>
