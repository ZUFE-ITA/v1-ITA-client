<template>
	<basic-card>
		<q-card-section class="q-pt-xs" v-if="event">
			<div class="text-overline">{{ event.organizer }}</div>
			<div class="text-h5 q-mt-sm q-mb-xs break-all">
				<div>{{ event.title }}</div>
			</div>
			<div class="break-all markdown-body" v-html="renderMD(event.desc)"></div>
		</q-card-section>

		<template v-else>
			<q-skeleton
				type="text"
				width="100%"
				v-for="i in 10"
				:key="i"
			></q-skeleton>
		</template>

		<q-separator />
		<q-list>
			<template v-for="opt in options" :key="opt.label">
				<q-item v-if="opt.visible" clickable>
					<q-item-section avatar top>
						<q-icon :color="opt.color" :name="opt.icon" />
					</q-item-section>

					<q-item-section>
						<q-item-label>{{ opt.label }}</q-item-label>
						<q-item-label caption>
							<div v-html="renderText(opt.detail)"></div>
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
		</q-list>

		<q-separator />

		<q-card-actions>
			<q-icon name="event" size="24px" />
			<div class="text-h6 q-pl-md" v-if="event">
				{{
					event.longtime
						? `${dayjs(event.range?.start).format("YYYY-MM-DD")} - ${dayjs(
								event.range?.end
						  ).format("YYYY-MM-DD")}`
						: dayjs(event.start).format("YYYY-MM-DD HH:mm")
				}}
			</div>
			<q-skeleton type="text" width="50%" height="30px" v-else></q-skeleton>
			<q-space></q-space>
			<event-join-btn v-if="event" :event="event" />
		</q-card-actions>
	</basic-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventStore } from "@/stores/event";
import BasicCard from "./BasicCard.vue";
import { $t } from "@/boot/i18n";
import dayjs from "@/lib/dayjs";
import { renderMD } from "@/lib/markdown";
import EventJoinBtn from "../btn/EventJoinBtn.vue";

const props = defineProps<{
	id: string;
}>();
const es = useEventStore();
const event = es.get(props.id);

function renderText(text: string | undefined) {
	if (text) return text.replaceAll("\n", "<br/>");
	return "";
}

const options = computed(() => [
	{
		icon: "room",
		color: "primary",
		label: $t("event.address"),
		detail: event.value?.addr,
		visible: true,
	},
	{
		icon: "star",
		color: "secondary",
		label: $t("event.point"),
		detail: event.value?.point_detail,
		visible: event.value?.with_point,
	},
	{
		icon: "apple",
		color: "red",
		label: $t("event.reward"),
		detail: event.value?.reward_detail,
		visible: event.value?.with_reward,
	},
]);
</script>

<style>
/* @import "@/css/github-markdown-light.css"; */
@import "@/css/event.light.scss";

.break-all {
	word-break: break-all;
}
</style>
