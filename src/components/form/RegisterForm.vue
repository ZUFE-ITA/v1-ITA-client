<template>
	<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
		<input-username
			v-model:value="username"
			:label="$t('form.username')"
		></input-username>
		<input-no v-model:value="no" :label="$t('form.no')"></input-no>
		<input-email v-model:value="email" :label="$t('form.email')"></input-email>
		<input-psw v-model:value="psw1" :label="$t('form.psw1')"></input-psw>
		<input-psw
			v-model:value="psw2"
			:label="$t('form.psw2')"
			:rules="[(v) => v == psw1 || $t('error.form.inconsistent_psw')]"
		></input-psw>

		<div>
			<q-btn label="Submit" type="submit" color="primary" />
			<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
		</div>
	</q-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { $t } from "@/boot/i18n";

import { getErrMsg } from "@/lib/api";
import notify from "@/lib/notify";

import InputNo from "../input/InputNo.vue";
import InputEmail from "@/components/input/InputEmail.vue";
import InputPsw from "@/components/input/InputPsw.vue";
import InputUsername from "@/components/input/InputUsername.vue";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(["onSuccess"]);

const user = useUserStore();
const email = ref("");
const username = ref("");
const no = ref("");
const psw1 = ref("");
const psw2 = ref("");

function onSubmit() {
	user
		.register({
			mail: email.value,
			psw: psw1.value,
			no: no.value,
			username: username.value,
		})
		.then(() => {
			notify.success($t("form.notify.reg_succ"));
			emit("onSuccess");
		})
		.catch((resp) => {
			notify.error(getErrMsg(resp));
		});
}
function onReset() {
	email.value = "";
	username.value = "";
	psw1.value = "";
	psw2.value = "";
	no.value = "";
}
</script>
