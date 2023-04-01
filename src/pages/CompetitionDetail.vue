<template>
	<q-tabs
		dense
		align="left"
		v-model="tab"
		active-color="primary"
		indicator-color="primary"
		narrow-indicator
		ref="tabsRef"
		class="bg-header-auto"
	>
		<q-route-tab
			:label="$t('competition.context')"
			:to="{ name: 'competition detail', params: { id } }"
		/>
		<q-route-tab
			:label="$t('competition.rank')"
			:to="{
				name: 'competition rank',
				params: { id },
			}"
		/>
	</q-tabs>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
const tab = ref("");
const route = useRoute();
const id = route.params.id as string;
</script>
