import { defineStore } from "pinia";
import { ref, computed, reactive, watch } from "vue";
import { user } from "@/lib/api/user";
import { PermissionParser } from "@/lib/permission";

export const useUserStore = defineStore("user-info", () => {
	const self_info = ref<null | user.UserInfo>(null);
	const self_exists = computed(() => self_info.value !== null);
	const permission = reactive(PermissionParser());
	const self = {
		permission,
		info: self_info,
		exists: self_exists,
		login(info: user.LoginForm) {
			return new Promise<user.UserInfo>((resolve, reject) => {
				user
					.login(info)
					.then((d) => {
						const user = d.data;
						self.info.value = user;
						resolve(user);
					})
					.catch(reject);
			});
		},
		logout() {
			return new Promise((resolve, reject) => {
				user
					.logout()
					.then(() => {
						self_info.value = null;
						resolve(void 0);
					})
					.catch(reject);
			});
		},
		register(form: user.RegisterForm) {
			return new Promise<user.UserInfo>((resolve, reject) => {
				user
					.register(form)
					.then((d) => {
						const user = d.data;
						self.info.value = user;
						resolve(user);
					})
					.catch(reject);
			});
		},
		update_permission(per: string | undefined = undefined) {
			const new_p = PermissionParser(per);
			for (const k in new_p) {
				const group = (new_p as any)[k];
				for (const q in group) {
					(permission as any)[k][q] = group[q];
				}
			}
		},
	};
	const users = reactive<user.UserInfo[]>([]);

	// auth
	user.auth().then((d) => {
		self_info.value = d.data;
		users.push(d.data);
	});

	watch(self_info, (v) => self.update_permission(v?.permission));

	function get_info(id: string) {
		return new Promise<user.UserInfo>((resolve, reject) => {
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
	return { self, users, get_info };
});
