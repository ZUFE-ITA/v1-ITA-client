<template>
	<q-expansion-item
		:icon="value.icon"
		:label="value.title"
		:caption="value.caption"
	>
		<!-- <template v-slot:header>
			<q-item-section avatar>
				<q-avatar :icon="value.icon" color="primary" text-color="white" />
			</q-item-section>

			<q-item-section v-if="value.caption">
				<q-item-label>{{ value.title }}</q-item-label>
				<q-item-label caption>{{ value.caption }}</q-item-label>
			</q-item-section>
			<q-item-section v-else>{{ value.title }}</q-item-section>
		</template> -->

		<q-card>
			<tree-list-switch
				v-for="(v, i) in value.children"
				:value="v"
				:key="i"
			></tree-list-switch>
		</q-card>
	</q-expansion-item>
</template>

<script setup lang="ts">
import TreeListSwitch from "./TreeListSwitch.vue";
import { TreeListExpensionProps } from "./treelist";
defineProps<{
	value: TreeListExpensionProps;
}>();
</script>
