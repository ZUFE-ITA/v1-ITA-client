<template>
	<q-page class="q-pa-md q-gutter-md">
		<event-detail-card :id="eid as string"></event-detail-card>
	</q-page>
</template>

<script setup lang="ts">
import EventDetailCard from "@/components/card/EventDetailCard.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const eid = route.params.id;
</script>
