<template>
	<q-card>
		<q-tabs
			active-color="primary"
			indicator-color="primary"
			narrow-indicator
			dense
			v-model="tab"
			inline-label
			:align="'left'"
		>
			<q-tab name="login" icon="login" :label="$t('form.login')" />
			<q-tab
				name="register"
				icon="app_registration"
				:label="$t('form.register')"
			/>
		</q-tabs>
		<q-tab-panels v-model="tab" animated :keep-alive="true">
			<q-tab-panel name="login">
				<login-form></login-form>
			</q-tab-panel>

			<q-tab-panel name="register">
				<register-form @on-success="router.replace('/')"></register-form>
			</q-tab-panel>
		</q-tab-panels>
	</q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { $t } from "@/boot/i18n";
import { useRouter } from "vue-router";

import LoginForm from "@/components/form/LoginForm.vue";
import RegisterForm from "@/components/form/RegisterForm.vue";

const router = useRouter();
const tab = ref("login");
</script>
