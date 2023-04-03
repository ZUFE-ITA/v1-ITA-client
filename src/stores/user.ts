import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { user } from "@/lib/api/user";
import { PermissionParser } from "@/lib/permission";

export const useUserStore = defineStore("user-info", () => {
	const info = ref<null | user.UserInfo>(null);
	const exists = computed(() => info.value !== null);
	const permission = computed(() => PermissionParser(info.value?.permission));

	function login(form: user.LoginForm) {
		return new Promise<user.UserInfo>((resolve, reject) => {
			user
				.login(form)
				.then((d) => {
					const user = d.data;
					info.value = user;
					resolve(user);
				})
				.catch(reject);
		});
	}
	function logout() {
		return new Promise((resolve, reject) => {
			user
				.logout()
				.then(() => {
					info.value = null;
					resolve(void 0);
				})
				.catch(reject);
		});
	}
	function register(form: user.RegisterForm) {
		return new Promise<user.UserInfo>((resolve, reject) => {
			user
				.register(form)
				.then((d) => {
					const user = d.data;
					info.value = user;
					resolve(user);
				})
				.catch(reject);
		});
	}
	const users = reactive<user.CommonUserInfo[]>([]);

	// auth
	user.auth().then((d) => {
		info.value = d.data;
		users.push(d.data);
	});

	function get_info(id: string) {
		return new Promise<user.CommonUserInfo>((resolve, reject) => {
			for (const user of users) {
				if (user.id === id) {
					resolve(user);
					return;
				}
			}
			user
				.info(id)
				.then((d) => {
					const user = d.data;
					users.push(user);
					resolve(user);
				})
				.catch(reject);
		});
	}
	return { users, info, permission, exists, logout, login, register, get_info };
});
