<template>
	<q-page ref="pageRef">
		<q-card>
			<q-tabs
				dense
				align="left"
				v-model="tab"
				active-color="primary"
				indicator-color="primary"
				narrow-indicator
				ref="tabsRef"
			>
				<q-tab
					v-for="t in clg.CHALLENGE_LABELS"
					:key="t"
					:label="t"
					:name="t"
				/>
			</q-tabs>
			<q-scroll-area
				:style="{ height: `${scroll_height}px`, maxWidth: '100vw' }"
				class="bg-page-auto"
			>
				<div class="row" style="max-width: 100vw">
					<div
						v-for="(c, i) in clgs"
						:key="i"
						class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-md"
					>
						<challenge-card
							:title="c.title"
							:desc="c.desc"
							@click-card="
								$router.push({ name: 'challenge detail', params: { id: c.id } })
							"
						>
							<q-btn
								flat
								rounded
								color="primary"
								@click="
									$router.push({ name: 'edit challenge', params: { id: c.id } })
								"
							>
								修改
							</q-btn>
						</challenge-card>
					</div>
				</div>

				<q-inner-loading :showing="loading">
					<q-spinner-gears size="50px" color="primary" />
				</q-inner-loading>
				<error-void v-if="!loading && !clgs.length"></error-void>
			</q-scroll-area>
		</q-card>

		<q-resize-observer @resize="updateScrollHeight" />
	</q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { challenge as clg } from "@/lib/api/challenge";
import { useChallengeStore } from "@/stores/challenge";
import { notifyErrorResponse } from "@/lib/api";
import ChallengeCard from "@/components/card/ChallengeCard.vue";
import ErrorVoid from "./ErrorVoid.vue";

const challenge = useChallengeStore();
const tab = ref<clg.ChallengeLabel>(clg.CHALLENGE_LABELS[0]);
const loading = ref(false);
const clgs = ref<clg.ChallengeInfo[]>([]);
watch(
	tab,
	(t) => {
		loading.value = true;
		challenge
			.get_list(t)
			.then((d) => {
				clgs.value = d;
			})
			.catch(notifyErrorResponse)
			.finally(() => {
				loading.value = false;
			});
	},
	{ immediate: true }
);

const scroll_height = ref(0);
const pageRef = ref<any>(null);
const tabsRef = ref<any>(null);
function updateScrollHeight() {
	scroll_height.value =
		document.body.clientHeight -
		(pageRef.value.$el as HTMLElement).offsetTop -
		(tabsRef.value.$el as HTMLElement).clientHeight;
}

onMounted(() => {
	updateScrollHeight();
});
</script>
