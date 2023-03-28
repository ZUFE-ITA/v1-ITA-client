<template>
	<div class="row" style="height: 150px">
		<div class="col-12 col-md-6 q-pa-md" v-for="e in event.list" :key="e.id">
			<event-card :event="e"></event-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/event";
import EventCard from "@/components/card/EventCard.vue";

const event = useEventStore();
event.get_list();
</script>
