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
	<q-page-sticky
		class="z-notify"
		position="bottom-right"
		:offset="[18, 18]"
		v-if="info && user.permission.Event.canWrite"
	>
		<q-fab
			vertical-actions-align="right"
			color="primary"
			icon="keyboard_arrow_up"
			direction="up"
		>
			<q-fab-action
				label-position="left"
				color="primary"
				:icon="info.end ? 'start' : 'stop'"
				:label="info.end ? 'start' : 'stop'"
				@click="toggleEventStatus"
			/>
			<q-fab-action
				label-position="left"
				color="secondary"
				icon="edit"
				@click="$router.push({ name: 'edit event', params: { id } })"
				:label="$t('competition.edit')"
			/>
		</q-fab>
	</q-page-sticky>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { notifyErrorResponse } from "@/lib/api";
import notify from "@/lib/notify";
import { useEventStore } from "@/stores/event";
import { useUserStore } from "@/stores/user";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const tab = ref("");
const route = useRoute();
const user = useUserStore();
const id = route.params.id as string;
const evt = useEventStore();
const info = computed(() => evt.list.find((v) => v.id === id));

function toggleEventStatus() {
	if (!info.value?.manual_stop) {
		notify.error("此活动非手动停止");
		return;
	}
	let op: "restart" | "stop" = info.value.end ? "restart" : "stop";
	evt[op](id)
		.then(() => {
			notify.success(op);
		})
		.catch(notifyErrorResponse);
}
</script>
