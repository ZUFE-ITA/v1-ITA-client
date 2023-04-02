<template>
	<basic-card>
		<div @click="$emit('clickCard')">
			<q-card-section class="text-h6">
				{{ title }}
				<q-badge
					v-if="status == 'positive'"
					color="positive"
					floating
					transparent
				>
					HACKED
				</q-badge>
			</q-card-section>
			<q-card-section>
				<q-item-label :lines="1">
					{{ desc }}
				</q-item-label>
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

defineProps<{
	title: string;
	desc: string;
	status?: "positive" | "negative";
}>();
defineEmits(["clickCard"]);
const slot = useSlots();
</script>
