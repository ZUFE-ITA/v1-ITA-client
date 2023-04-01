<template>
	<q-avatar
		v-if="username"
		:size="size || '32px'"
		color="secondary"
		text-color="white"
	>
		{{ username[0] }}
	</q-avatar>
	<q-skeleton v-else :type="'QAvatar'" :size="size || '32px'"></q-skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const props = defineProps<{
	id?: string;
	size?: string;
}>();

defineEmits(["click"]);
const user = useUserStore();
const username = ref("");

onMounted(() => {
	if (props.id)
		user.get_info(props.id).then((d) => (username.value = d.username));
});
</script>

<script lang="ts">
export default {
	name: "UserAvatar",
};
</script>
