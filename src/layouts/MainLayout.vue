<template>
	<q-layout view="lHh Lpr lFf">
		<q-header reveal class="bg-header-auto">
			<q-toolbar class="text-primary">
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
			<tree-list :value="treelist_props"></tree-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { $t } from "@/boot/i18n";
import { useThemeStore } from "@/stores/theme";
import { TreeListProps } from "@/components/list/treelist";
import TreeList from "@/components/list/TreeList.vue";
import ToolbarBtnGroup from "@/components/ToolbarBtnGroup.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const theme = useThemeStore();
const treelist_props: TreeListProps[] = [
	{
		type: "item",
		title: $t("sidebar.event.title"),
		caption: $t("sidebar.event.caption"),
		icon: "signal_cellular_alt",
		to: "/",
	},
	{
		type: "expension",
		title: $t("sidebar.competition.title"),
		// caption: $t("sidebar.competition.caption"),
		icon: "emoji_events",
		children: [
			{
				type: "item",
				title: $t("competition.ongoing"),
				// caption: $t("sidebar.event.caption"),
				icon: "directions_run",
				to: { name: "competition list", params: { type: "ongoing" } },
			},
			{
				type: "item",
				title: $t("competition.future"),
				// caption: $t("sidebar.event.caption"),
				icon: "update",
				to: { name: "competition list", params: { type: "future" } },
			},
			{
				type: "item",
				title: $t("competition.expired"),
				// caption: $t("sidebar.event.caption"),
				icon: "last_page",
				to: { name: "competition list", params: { type: "expired" } },
			},
		],
	},
	{
		type: "expension",
		title: $t("sidebar.manage.title"),
		icon: "admin_panel_settings",
		hidden: () =>
			!(
				user.permission.Challenge.canWrite || user.permission.Challenge.canRead
			),
		children: [
			{
				type: "item",
				title: $t("sidebar.challenge.title"),
				icon: "question_mark",
				to: { name: "challenge list" },
				hidden: () =>
					!(
						user.permission.Challenge.canWrite ||
						user.permission.Challenge.canRead
					),
			},
		],
	},
	{
		type: "item",
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
