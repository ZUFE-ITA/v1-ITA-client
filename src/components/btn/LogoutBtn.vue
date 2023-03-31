<template>
	<q-btn color="negative" outline @click="logout">
		{{ $t("btn.logout") }}
	</q-btn>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useQuasar } from "quasar";
import { $t } from "@/boot/i18n";

const $q = useQuasar();
const user = useUserStore();

function logout() {
	$q.dialog({
		title: $t("operate.confirm.logout.title"),
		message: $t("operate.confirm.logout.message"),
		cancel: true,
		persistent: true,
	}).onOk(() =>
		user.logout().then(() => {
			$q.notify({
				type: "positive",
				progress: true,
				message: $t("operate.notify.logout_succ"),
			});
		})
	);
}
</script>
