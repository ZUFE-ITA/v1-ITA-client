<template>
	<basic-card>
		<q-card-section
			class="cursor-pointer"
			@click="router.push({ name: 'event detail', params: { id: event.id } })"
		>
			<q-item-label :lines="1" class="text-overline">
				{{ event.organizer }}
			</q-item-label>
			<q-item-label :lines="1" class="text-h5 q-mt-sm q-mb-xs">
				{{ event.title }}
			</q-item-label>
			<q-item-label :lines="1" class="text-caption text-grey">
				{{ stripMarkdown(event.desc) }}
			</q-item-label>
		</q-card-section>

		<q-separator />

		<q-card-actions>
			<q-icon name="event" size="24px" />
			<div class="text-h6 q-pl-md">
				{{
					event.longtime
						? `${dayjs(event.range?.start).format("YYYY-MM-DD")} - ${dayjs(
								event.range?.end
						  ).format("YYYY-MM-DD")}`
						: dayjs(event.start).format("YYYY-MM-DD HH:mm")
				}}
			</div>
			<q-space></q-space>
			<event-join-btn :event="event" />
		</q-card-actions>
	</basic-card>
</template>

<script setup lang="ts">
import { event as evt } from "@/lib/api/event";
import BasicCard from "./BasicCard.vue";
import dayjs from "@/lib/dayjs";
import { stripMarkdown } from "@/lib/markdown";
import { useRouter } from "vue-router";
import EventJoinBtn from "@/components/btn/EventJoinBtn.vue";

defineProps<{
	event: evt.EventInfo;
}>();

const router = useRouter();
</script>
