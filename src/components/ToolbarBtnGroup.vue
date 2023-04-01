<template>
	<toolbar-add-btn
		v-if="user.permission.Event.canWrite || user.permission.Blog.canWrite"
	></toolbar-add-btn>
	<switch-theme-btn></switch-theme-btn>
	<account-btn></account-btn>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import AccountBtn from "./btn/AccountBtn.vue";
import SwitchThemeBtn from "./btn/SwitchThemeBtn.vue";
import ToolbarAddBtn from "./btn/ToolbarAddBtn.vue";

const user = useUserStore();
</script>
