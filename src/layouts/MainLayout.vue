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

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="210">
			<!-- <tree-list :value="treelist_props"></tree-list> -->
			<q-tree
				default-expand-all
				:nodes="options"
				node-key="label"
				color="primary"
				dense
			>
				<template v-slot:default-header="prop">
					<q-item
						:to="prop.node.to"
						class="full-width rounded-borders"
						@click="$router.push(prop.node.to)"
					>
						<q-item-section avatar v-if="prop.node.icon">
							<q-icon :name="prop.node.icon" size="30px" />
						</q-item-section>
						<q-item-section>
							{{ prop.node.label }}
						</q-item-section>
					</q-item>
				</template>
			</q-tree>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { $t } from "@/boot/i18n";
// import { TreeListProps } from "@/components/list/treelist";
// import TreeList from "@/components/list/TreeList.vue";
import ToolbarBtnGroup from "@/components/ToolbarBtnGroup.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

const options = computed(() =>
	[
		{
			label: $t("sidebar.event.title"),
			caption: $t("sidebar.event.caption"),
			icon: "signal_cellular_alt",
			to: "/",
		},
		{
			label: $t("sidebar.competition.title"),
			icon: "emoji_events",
			children: [
				{
					label: $t("competition.ongoing"),
					icon: "directions_run",
					to: { name: "competition list", params: { type: "ongoing" } },
				},
				{
					label: $t("competition.future"),
					icon: "update",
					to: { name: "competition list", params: { type: "future" } },
				},
				{
					label: $t("competition.expired"),
					icon: "last_page",
					to: { name: "competition list", params: { type: "expired" } },
				},
			],
		},
		{
			label: $t("sidebar.manage.title"),
			icon: "admin_panel_settings",
			visible: user.permission.Challenge.canWrite,
			children: [
				{
					label: $t("sidebar.challenge.title"),
					icon: "question_mark",
					to: { name: "challenge list" },
					visible: user.permission.Challenge.canWrite,
				},
			],
		},
		{
			label: $t("sidebar.article.title"),
			caption: $t("sidebar.article.caption"),
			icon: "article",
			to: "/article",
		},
	].filter((d) => (d.visible === undefined ? true : d.visible))
);

// const treelist_props: TreeListProps[] = [
// 	{
// 		type: "item",
// 		title: $t("sidebar.event.title"),
// 		caption: $t("sidebar.event.caption"),
// 		icon: "signal_cellular_alt",
// 		to: "/",
// 	},
// 	{
// 		type: "expension",
// 		title: $t("sidebar.competition.title"),
// 		// caption: $t("sidebar.competition.caption"),
// 		icon: "emoji_events",
// 		children: [
// 			{
// 				type: "item",
// 				title: $t("competition.ongoing"),
// 				// caption: $t("sidebar.event.caption"),
// 				icon: "directions_run",
// 				to: { name: "competition list", params: { type: "ongoing" } },
// 			},
// 			{
// 				type: "item",
// 				title: $t("competition.future"),
// 				// caption: $t("sidebar.event.caption"),
// 				icon: "update",
// 				to: { name: "competition list", params: { type: "future" } },
// 			},
// 			{
// 				type: "item",
// 				title: $t("competition.expired"),
// 				// caption: $t("sidebar.event.caption"),
// 				icon: "last_page",
// 				to: { name: "competition list", params: { type: "expired" } },
// 			},
// 		],
// 	},
// 	{
// 		type: "expension",
// 		title: $t("sidebar.manage.title"),
// 		icon: "admin_panel_settings",
// 		hidden: () => !user.permission.Challenge.canWrite,
// 		children: [
// 			{
// 				type: "item",
// 				title: $t("sidebar.challenge.title"),
// 				icon: "question_mark",
// 				to: { name: "challenge list" },
// 				hidden: () => !user.permission.Challenge.canWrite,
// 			},
// 		],
// 	},
// 	{
// 		type: "item",
// 		title: $t("sidebar.article.title"),
// 		caption: $t("sidebar.article.caption"),
// 		icon: "article",
// 		to: "/article",
// 	},
// ];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
