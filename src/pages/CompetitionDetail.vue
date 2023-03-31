<template>
	<div class="q-pa-md">
		<challenge-desc-card :event="info ?? undefined"></challenge-desc-card>
	</div>
	<div class="row">
		<div class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md">
			<q-card>题目列表</q-card>
		</div>
		<div class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md">
			<q-card>题目列表</q-card>
		</div>
		<div class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md">
			<q-card>题目列表</q-card>
		</div>
		<div class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md">
			<q-card>题目列表</q-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import ChallengeDescCard from "@/components/card/ChallengeDescCard.vue";
import { useEventStore } from "@/stores/event";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;
const evt = useEventStore();

const info = evt.get(id);
</script>
