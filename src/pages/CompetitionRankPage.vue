<template>
	<q-page>
		<rank-card :value="rank" />
		<q-inner-loading :showing="loading">
			<q-spinner-gears size="50px" color="primary" />
		</q-inner-loading>
	</q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { competition } from "@/lib/api/competition";
import RankCard from "@/components/card/RankCard.vue";

const route = useRoute();
const id = route.params.id as string;
const loading = ref(true);
const rank = ref<competition.RankItem[]>([]);

onMounted(() => {
	competition.get_rank(id).then((d) => {
		loading.value = false;
		d.data.sort((a, b) => {
			if (a.score != b.score) {
				return b.score - a.score;
			} else if (a.count != a.count) {
				return b.count - a.count;
			} else {
				return a.avg_time - b.avg_time;
			}
		});
		rank.value = d.data;
	});
});
</script>
