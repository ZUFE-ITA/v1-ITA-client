<template>
	<basic-info-card
		@click-card="$emit('clickCard')"
		:title="event.title"
		:outline="event.organizer"
	>
		<template #desc>
			<q-item-label :lines="1" class="text-caption text-grey">
				{{ event.desc }}
			</q-item-label>
		</template>
		<template #action>
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
			<slot name="action"></slot>
		</template>
	</basic-info-card>
</template>

<script setup lang="ts">
import BasicInfoCard from "./BasicInfoCard.vue";
import { event as evt } from "@/lib/api/event";
import dayjs from "@/lib/dayjs";

defineProps<{
	event: evt.EventInfo;
}>();
defineEmits(["clickCard"]);
</script>
