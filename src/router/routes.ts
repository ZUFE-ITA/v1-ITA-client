import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "event",
		component: () => import("pages/EventListPage.vue"),
	},
	{
		path: "/event/create",
		name: "create event",
		component: () => import("@/pages/EventEditPage.vue"),
	},
	{
		path: "/event/edit/:id",
		name: "edit event",
		component: () => import("@/pages/EventEditPage.vue"),
	},
	{
		path: "/event/:id",
		name: "event detail",
		component: () => import("@/pages/EventPage.vue"),
	},
	// { path: "article", component: () => import("pages/ArticlePage.vue") },
	{
		path: "/user",
		children: [
			{
				path: "login",
				name: "login",
				component: () => import("@/pages/LoginPage.vue"),
			},
		],
	},
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
