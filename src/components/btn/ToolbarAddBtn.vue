<template>
	<q-btn icon="add" round flat>
		<q-menu v-model="showing">
			<q-list style="min-width: 100px">
				<template v-for="opt in options" :key="opt.text">
					<q-item clickable v-close-popup v-if="opt.visible" @click="opt.click">
						<q-item-section>{{ opt.text }}</q-item-section>
					</q-item>
				</template>
			</q-list>
		</q-menu>
	</q-btn>
</template>

<script setup lang="ts">
import { $t } from "@/boot/i18n";
import { useUserStore } from "@/stores/user";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showing = ref(false);
const user = useUserStore();
const options = computed(() => [
	{
		text: $t("btn.create_event"),
		visible: user.permission.Event.canAppend,
		click: () => router.push({ name: "create event" }),
	},
	{
		text: $t("btn.create_article"),
		visible: user.permission.Blog.canAppend,
		click: () => router.push({ name: "create article" }),
	},
	{
		text: $t("btn.create_challenge"),
		visible: user.permission.Challenge.canAppend,
		click: () => router.push({ name: "create challenge" }),
	},
]);
</script>
