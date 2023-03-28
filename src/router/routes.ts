import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "event",
				component: () => import("pages/EventListPage.vue"),
			},
			{
				path: "event/create",
				name: "create event",
				component: () => import("@/pages/EventCreatePage.vue"),
			},
			{
				path: "event/:id",
				name: "event detail",
				component: () => import("@/pages/EventPage.vue"),
			},
			// { path: "article", component: () => import("pages/ArticlePage.vue") },
			{
				path: "user",
				children: [
					{
						path: "login",
						name: "login",
						component: () => import("@/pages/LoginPage.vue"),
					},
				],
			},
		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
