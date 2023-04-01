<template>
	<q-btn round flat @click="$emit('click')">
		<user-avatar :id="id" :size="size"></user-avatar>
	</q-btn>
</template>

<script setup lang="ts">
import UserAvatar from "../UserAvatar.vue";

defineProps<{
	id?: string;
	size?: string;
}>();

defineEmits(["click"]);
</script>
