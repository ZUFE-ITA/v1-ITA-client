<template>
	<basic-card>
		<q-card-section class="cursor-pointer" @click="$emit('clickCard')">
			<q-item-label :lines="1" class="text-overline" v-if="outline">
				{{ outline }}
			</q-item-label>
			<q-item-label :lines="1" class="text-h5 q-mt-sm q-mb-xs" v-if="title">
				{{ title }}
			</q-item-label>
			<slot name="desc"></slot>
		</q-card-section>

		<template v-if="slots.action">
			<q-separator />
			<q-card-actions>
				<slot name="action"></slot>
			</q-card-actions>
		</template>
	</basic-card>
</template>

<script setup lang="ts">
import BasicCard from "./BasicCard.vue";
import { useSlots } from "vue";
defineProps<{
	title?: string;
	outline?: string;
}>();
defineEmits(["clickCard"]);
const slots = useSlots();
</script>
