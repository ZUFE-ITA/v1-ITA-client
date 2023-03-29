<template>
	<q-page class="q-pa-md q-gutter-md">
		<event-detail-card class="event-card" :id="id"></event-detail-card>

		<q-page-sticky
			position="bottom-right"
			:offset="[18, 18]"
			v-if="
				user.self.permission.Event.canAppend &&
				user.self.info?.id === info?.creator
			"
		>
			<q-btn
				color="primary"
				round
				icon="edit"
				size="1.25em"
				@click="edit"
			></q-btn>
		</q-page-sticky>
	</q-page>
</template>

<script setup lang="ts">
import EventDetailCard from "@/components/card/EventDetailCard.vue";
import { useEventStore } from "@/stores/event";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const user = useUserStore();
const event = useEventStore();
const info = event.get(id);

function edit() {
	router.replace({ name: "edit event", params: { id } });
}
</script>

<style scoped>
@media screen and (min-width: 914px) {
	.event-card {
		width: 960px;
		margin: 0 auto;
	}
}
</style>
