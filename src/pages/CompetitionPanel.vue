<template>
	<div class="row" v-if="list.length">
		<div
			class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md"
			v-for="e in list"
			:key="e.id"
		>
			<event-card
				:event="e"
				@click-card="
					$router.push({ name: 'event detail', params: { id: e.id } })
				"
			>
				<template #action>
					<q-btn
						v-if="e.joined && switch_type(e) === 'ongoing'"
						rounded
						color="accent"
						@click="
							$router.push({ name: 'competition detail', params: { id: e.id } })
						"
					>
						{{ $t("competition.enter") }}
					</q-btn>
					<event-join-btn
						v-else-if="switch_type(e) === 'future'"
						:event="e"
					></event-join-btn>
				</template>
			</event-card>
		</div>
	</div>
	<error-void-page v-else></error-void-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventStore } from "@/stores/event";
import EventCard from "@/components/card/EventCard.vue";
import ErrorVoidPage from "./ErrorVoid.vue";
import { useRoute } from "vue-router";
import dayjs from "@/lib/dayjs";
import { cvtToUnix } from "@/lib/dayjs";
import { event } from "@/lib/api/event";
import EventJoinBtn from "@/components/btn/EventJoinBtn.vue";
const route = useRoute();
const evt = useEventStore();

function switch_type(v: event.EventInfo) {
	const now = dayjs(new Date()).unix();
	if (v.longtime) {
		if (cvtToUnix(v.range?.start) > now) {
			return "future";
		} else if (cvtToUnix(v.range?.end) > now) {
			return "ongoing";
		} else {
			return "expired";
		}
	}
	if (cvtToUnix(v.start) > now) {
		return "future";
	} else if ((v.manual_stop && !v.end) || cvtToUnix(v.end) > now) {
		return "ongoing";
	} else {
		return "expired";
	}
}
const list = computed(() =>
	evt.list.filter((d) => {
		if (!d.is_competition) return false;
		return switch_type(d) === route.params.type;
	})
);
// const type = route.params.type as string;
</script>
