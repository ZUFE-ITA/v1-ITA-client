import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { user } from "@/lib/api/user";
import { PermissionParser } from "@/lib/permission";

export const useUserStore = defineStore("user-info", () => {
	const info = ref<null | user.UserInfo>(null);
	const exists = computed(() => info.value !== null);
	const permission = computed(() => PermissionParser(info.value?.permission));
	const loading_queue: any = {}; // uid=>bool 表示是否正在从服务器获取对应用户的info

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

	// load info 方法不对外暴露, 因为要维持一个loading queue
	function load_info(id: string) {
		return new Promise<user.CommonUserInfo>((resolve, reject) => {
			for (const user of users) {
				if (user.id === id) {
					resolve(user);
					return;
				}
			}
			if (!loading_queue[id]) {
				loading_queue[id] = true;
				user
					.info(id)
					.then((d) => {
						const user = d.data;
						users.push(user);
						resolve(user);
					})
					.catch(reject)
					.finally(() => {
						loading_queue[id] = false;
					});
			}
		});
	}

	function get_info(id: string) {
		const info = computed(() => users.find((v) => v.id === id));
		if (!info.value) load_info(id);
		return info;
	}

	return {
		users,
		info,
		permission,
		exists,
		logout,
		login,
		register,
		get_info,
	};
});
