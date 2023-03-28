<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title>ITA@ZUFE</q-toolbar-title>

				<toolbar-btn-group></toolbar-btn-group>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="200">
			<q-list>
				<EssentialLink
					v-for="link in essentialLinks"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { $t } from "@/boot/i18n";

import EssentialLink, {
	EssentialLinkProps,
} from "components/EssentialLink.vue";
import ToolbarBtnGroup from "@/components/ToolbarBtnGroup.vue";

const essentialLinks: EssentialLinkProps[] = [
	{
		title: $t("sidebar.event.title"),
		caption: $t("sidebar.event.caption"),
		icon: "signal_cellular_alt",
		to: "/",
	},
	{
		title: $t("sidebar.article.title"),
		caption: $t("sidebar.article.caption"),
		icon: "article",
		to: "/article",
	},
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
