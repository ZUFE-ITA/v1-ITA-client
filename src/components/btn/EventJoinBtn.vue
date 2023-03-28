<template>
	<q-btn flat color="primary" :disable="canClick" @click="onClick">
		{{ btnText }}
	</q-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";
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
const canClick = computed(() => {
	const deadline = dayjs(props.event.deadline);
	const now = dayjs(new Date());
	if (deadline.unix() < now.unix()) return true;
	return !user.self.permission.Event.canJoin;
});

const btnText = computed(() => {
	if (user.self.permission.Event.canJoin) {
		if (es.joined[props.event.id]) return $t("btn.has_joined");
		else {
			const deadline = dayjs(props.event.deadline);
			const now = dayjs(new Date());
			if (deadline.unix() < now.unix())
				return $t("error.event.deadline_has_passed");
			return $t("btn.join");
		}
	} else if (user.self.info) {
		return $t("error.request.permission_denied");
	} else {
		return $t("error.request.need_login_first");
	}
});

function onClick(e: Event) {
	e.preventDefault();
	(es.joined[props.event.id]
		? es.exit(props.event.id).then(() => {
				notify.success($t("operate.notify.exit_succ"));
		  })
		: es
				.join(props.event.id)
				.then(() => notify.success($t("operate.notify.join_succ")))
	).catch(notifyErrorResponse);
}
</script>
