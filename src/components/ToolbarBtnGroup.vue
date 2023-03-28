<template>
	<toolbar-add-btn
		v-if="
			user.self.permission.Event.canAppend ||
			user.self.permission.Blog.canAppend
		"
	></toolbar-add-btn>
	<account-btn></account-btn>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import AccountBtn from "./btn/AccountBtn.vue";
import ToolbarAddBtn from "./btn/ToolbarAddBtn.vue";

const user = useUserStore();
</script>
