<template>
	<div class="row" style="height: 150px">
		<div class="col-12 col-md-6 q-pa-md" v-for="e in event.list" :key="e.id">
			<event-card :event="e"></event-card>
		</div>
	</div>

	<q-inner-loading :showing="loading">
		<q-spinner-gears size="50px" color="primary" />
	</q-inner-loading>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventStore } from "@/stores/event";
import EventCard from "@/components/card/EventCard.vue";
const loading = ref(true);
const event = useEventStore();
event.get_list().then(() => {
	loading.value = false;
});
</script>
