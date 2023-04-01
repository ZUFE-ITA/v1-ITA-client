<template>
	<basic-card>
		<q-item v-if="event">
			<q-item-section>
				<q-item-label class="text-overline">{{ event.organizer }}</q-item-label>
				<q-item-label class="text-h6">{{ event.title }}</q-item-label>
			</q-item-section>
		</q-item>
		<q-skeleton v-else type="text" width="100%"></q-skeleton>
		<q-separator></q-separator>
		<q-expansion-item icon="info_outline" :label="$t('competition.desc')">
			<q-card-section>
				<markdown-block v-if="event" :text="event.desc"></markdown-block>
				<q-skeleton
					v-else
					type="text"
					width="100%"
					v-for="i in 5"
					:key="i"
				></q-skeleton>
			</q-card-section>
		</q-expansion-item>
	</basic-card>
</template>

<script setup lang="ts">
import BasicCard from "./BasicCard.vue";
import MarkdownBlock from "../MarkdownBlock.vue";
import { event as evt } from "@/lib/api/event";

defineProps<{
	event?: evt.EventInfo;
}>();
</script>
