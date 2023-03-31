<template>
	<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
		<input-email v-model:value="email" :label="$t('form.email')"></input-email>
		<input-psw v-model:value="psw" :label="$t('form.psw1')"></input-psw>
		<q-toggle v-model="remember" :label="$t('form.remember')" />

		<div class="justify-between flex">
			<div>
				<q-btn :label="$t('form.submit')" type="submit" color="primary" />
				<q-btn
					:label="$t('form.reset')"
					type="reset"
					color="primary"
					flat
					class="q-ml-sm"
				/>
			</div>
			<div>
				<q-btn
					:label="$t('form.forget_psw')"
					flat
					color="secondary"
					class="q-ml-sm"
					no-caps
					:to="{ name: 'change psw' }"
				/>
			</div>
		</div>
	</q-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import { $t } from "@/boot/i18n";

import InputEmail from "@/components/input/InputEmail.vue";
import InputPsw from "@/components/input/InputPsw.vue";
import { useUserStore } from "@/stores/user";
import { getErrMsg } from "@/lib/api";
import { useRouter } from "vue-router";

const user = useUserStore();
const $q = useQuasar();
const router = useRouter();

function onSubmit() {
	user
		.login({
			mail: email.value,
			psw: psw.value,
			remember: remember.value,
		})
		.then(() => {
			router.replace({ path: "/" }).then(() => {
				$q.notify({
					type: "positive",
					message: $t("form.notify.login_succ"),
					progress: true,
				});
			});
		})
		.catch((resp) => {
			const message = getErrMsg(resp);
			$q.notify({
				type: "negative",
				message: $t(message),
				progress: true,
			});
		});
}
function onReset() {
	email.value = "";
	psw.value = "";
	remember.value = false;
}

const email = ref("");
const psw = ref("");
const remember = ref(false);
</script>
