<template>
	<q-item clickable v-ripple :to="value.to">
		<q-item-section v-if="value.icon" avatar>
			<q-icon :name="value.icon" />
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ value.title }}</q-item-label>
			<q-item-label v-if="value.caption" caption>
				{{ value.caption }}
			</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup lang="ts">
import { TreeListItemProps } from "./treelist";
defineProps<{
	value: TreeListItemProps;
}>();
</script>
