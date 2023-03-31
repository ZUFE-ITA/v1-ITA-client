<template>
	<q-list>
		<tree-list-switch
			v-for="(v, i) in value"
			:key="i"
			:value="v"
		></tree-list-switch>
	</q-list>
</template>

<script setup lang="ts">
import { TreeListProps } from "./treelist";
import TreeListSwitch from "./TreeListSwitch.vue";
defineProps<{
	value: TreeListProps[];
}>();
</script>
