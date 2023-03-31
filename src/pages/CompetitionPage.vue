<template>
	<q-page>
		<router-view />
		<q-inner-loading :showing="loading">
			<q-spinner-gears size="50px" color="primary" />
		</q-inner-loading>
	</q-page>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/event";
import { ref } from "vue";

const loading = ref(true);
const evt = useEventStore();
evt.get_list().then(() => (loading.value = false));
</script>

<style scoped>
.content {
	padding-top: 40px;
}
</style>
