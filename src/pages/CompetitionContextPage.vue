<template>
	<div class="q-pa-md">
		<competition-desc-card :event="info ?? undefined"></competition-desc-card>
	</div>
	<div class="row">
		<div
			class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md"
			v-for="cha in challenges"
			:key="cha.id"
		>
			<challenge-card
				:title="cha.title"
				:desc="cha.desc"
				:status="
					competition.status[id]?.[cha.id] === true ? 'positive' : 'negative'
				"
			>
				<q-btn
					rounded
					flat
					color="primary"
					@click="
						$router.push({
							name: 'competition challenge detail',
							params: { cid: id, id: cha.id },
						})
					"
				>
					{{ $t("btn.view") }}
				</q-btn>
			</challenge-card>
		</div>
	</div>

	<q-inner-loading :showing="loading">
		<q-spinner-gears size="50px" color="primary" />
	</q-inner-loading>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CompetitionDescCard from "@/components/card/CompetitionDescCard.vue";
import { useEventStore } from "@/stores/event";
import { useRoute } from "vue-router";
import ChallengeCard from "@/components/card/ChallengeCard.vue";
import { useCompetitionStore } from "@/stores/competition";
import { competition as comp } from "@/lib/api/competition";

const route = useRoute();
const id = route.params.id as string;
const evt = useEventStore();
const loading = ref(true);

const competition = useCompetitionStore();
const challenges = ref<comp.ChallengeInfo[]>([]);

competition
	.get_challenge_list(id)
	.then((d) => {
		challenges.value = d.sort((a, b) => a.score - b.score);
	})
	.finally(() => (loading.value = false));
const info = evt.get(id);

onMounted(() => {
	competition.load_statuses(id);
});
</script>
