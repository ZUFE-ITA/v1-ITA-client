<template>
	<tree-list-expansion
		v-if="value.type == 'expension' && !hidden"
		:value="value"
	></tree-list-expansion>
	<tree-list-item
		v-else-if="value.type == 'item' && !hidden"
		:value="value"
	></tree-list-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TreeListExpansion from "./TreeListExpansion.vue";
import TreeListItem from "./TreeListItem.vue";
import { TreeListProps } from "./treelist";

const props = defineProps<{
	value: TreeListProps;
}>();

const hidden = props.value.hidden ? computed(props.value.hidden) : false;
</script>
