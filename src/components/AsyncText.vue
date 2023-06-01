<template>
	<template v-if="text">
		{{ text }}
	</template>
	<q-skeleton v-else type="text" height="2.5em"></q-skeleton>
</template>

<script setup lang="ts">
defineProps<{
	text?: string;
}>();
</script>

<script lang="ts">
export default {
	name: "AsyncText",
};
</script>
