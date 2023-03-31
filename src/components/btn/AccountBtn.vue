<template>
	<div>
		<avatar-btn v-if="user.exists" :id="user.info?.id"></avatar-btn>
		<q-menu v-model="showing">
			<q-list style="min-width: 100px">
				<q-item clickable v-close-popup @click="user.logout()">
					<q-item-section>{{ $t("operate.logout") }}</q-item-section>
				</q-item>
			</q-list>
		</q-menu>
	</div>

	<login-btn v-if="!user.exists"></login-btn>
</template>

<script setup lang="ts">
import LoginBtn from "./LoginBtn.vue";
import AvatarBtn from "./AvatarBtn.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const showing = ref(false);
const user = useUserStore();
</script>
