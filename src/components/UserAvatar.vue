<template>
	<q-avatar
		v-if="info"
		:size="size || '32px'"
		color="secondary"
		text-color="white"
	>
		{{ info.username[0] }}
	</q-avatar>
	<q-skeleton v-else :type="'QAvatar'" :size="size || '32px'"></q-skeleton>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const props = defineProps<{
	id?: string;
	size?: string;
}>();

defineEmits(["click"]);
const user = useUserStore();
const info = user.get_info(props.id as string);
</script>

<script lang="ts">
export default {
	name: "UserAvatar",
};
</script>
