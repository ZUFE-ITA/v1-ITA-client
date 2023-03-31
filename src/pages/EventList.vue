<template>
	<div class="row" v-if="event.list.length">
		<div
			class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md"
			v-for="e in event.list"
			:key="e.id"
		>
			<event-card
				:event="e"
				@click-card="
					$router.push({ name: 'event detail', params: { id: e.id } })
				"
			>
				<template #action>
					<event-join-btn :event="e" />
				</template>
			</event-card>
		</div>
	</div>

	<error-void-page v-else></error-void-page>

	<q-inner-loading :showing="loading">
		<q-spinner-gears size="50px" color="primary" />
	</q-inner-loading>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventStore } from "@/stores/event";
import EventCard from "@/components/card/EventCard.vue";
import EventJoinBtn from "@/components/btn/EventJoinBtn.vue";
import ErrorVoidPage from "./ErrorVoid.vue";

const loading = ref(true);
const event = useEventStore();
event.get_list().then(() => {
	loading.value = false;
});
</script>
