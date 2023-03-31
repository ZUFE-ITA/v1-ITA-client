<template>
	<q-btn
		flat
		color="primary"
		:disable="!canClick"
		@click="onClick"
		:loading="loading"
	>
		{{ btnText }}
	</q-btn>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { event as evt } from "@/lib/api/event";
import { useUserStore } from "@/stores/user";
import { useEventStore } from "@/stores/event";
import { $t } from "@/boot/i18n";
import notify from "@/lib/notify";
import { notifyErrorResponse } from "@/lib/api";
import dayjs from "@/lib/dayjs";

const props = defineProps<{
	event: evt.EventInfo;
}>();

const user = useUserStore();
const es = useEventStore();
const loading = ref(false);
const canClick = computed(() => {
	if (loading.value) return false;
	const deadline = dayjs(props.event.deadline);
	const now = dayjs(new Date());
	if (deadline.unix() < now.unix()) return false;
	return user.permission.Event.canJoin;
});

const btnText = computed(() => {
	if (!user.info) {
		return $t("error.request.need_login_first");
	} else if (user.permission.Event.canJoin) {
		if (es.joined[props.event.id]) return $t("btn.has_joined");
		else {
			const deadline = dayjs(props.event.deadline);
			const now = dayjs(new Date());
			if (deadline.unix() < now.unix())
				return $t("error.event.deadline_has_passed");
			return $t("btn.join");
		}
	} else {
		console.log(user.permission);

		return $t("error.request.permission_denied");
	}
});

function onClick(e: Event) {
	loading.value = true;
	e.preventDefault();
	(es.joined[props.event.id]
		? es.exit(props.event.id).then(() => {
				notify.success($t("operate.notify.exit_succ"));
		  })
		: es
				.join(props.event.id)
				.then(() => notify.success($t("operate.notify.join_succ")))
	)
		.catch(notifyErrorResponse)
		.finally(() => (loading.value = false));
}
</script>
