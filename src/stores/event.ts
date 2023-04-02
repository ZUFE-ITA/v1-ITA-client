import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { event } from "@/lib/api/event";
import { id2timestamp } from "@/lib/id";
import { ErrorCode } from "@/lib/api/error-code";
import dayjs from "@/lib/dayjs";
import { getErrCodeByResponse } from "@/lib/api";

export const useEventStore = defineStore("event", () => {
	const list = reactive<event.EventInfo[]>([]);
	const joined = computed(() => {
		const res: any = {};
		for (const li of list) {
			res[li.id] = li.joined;
		}
		return res;
	});

	function update_event_info(...info: event.EventInfo[]) {
		for (const i of info) {
			const idx = list.findIndex((v) => v.id === i.id);
			if (idx > -1) list[idx] = i;
			else list.push(i);
		}
		list.sort((a, b) => id2timestamp(b.id) - id2timestamp(a.id));
	}

	function load(id: string, force = false) {
		return new Promise<event.EventInfo>((resolve, reject) => {
			if (!force) {
				const idx = list.findIndex((v) => v.id === id);
				if (idx > -1) return resolve(list[idx]);
			}
			event
				.get(id)
				.then((d) => {
					update_event_info(d.data);
					resolve(d.data);
				})
				.catch(reject);
		});
	}
	function get(id: string) {
		const info = ref<null | event.EventInfo>(null);
		load(id).then((d) => (info.value = d));
		return info;
	}

	function get_list() {
		return new Promise<event.EventInfo[]>((resolve, reject) => {
			event
				.list()
				.then((d) => {
					update_event_info(...d.data);
					resolve(d.data);
				})
				.catch(reject);
		});
	}

	function create(creator: string, data: event.EventCreateForm) {
		return new Promise<event.EventInfo>((resolve, reject) => {
			event
				.create(data)
				.then((d) => {
					const id = d.data.id;
					const info = {
						creator,
						id,
						...data,
						joined: false,
					};
					update_event_info(info);
					resolve(info);
				})
				.catch(reject);
		});
	}

	function update(info: event.EventInfo) {
		return new Promise<event.EventInfo>((resolve, reject) => {
			event
				.update(info.id, info)
				.then(() => {
					update_event_info(info);
					resolve(info);
				})
				.catch(reject);
		});
	}

	function update_join_status(id: string, status: boolean) {
		const idx = list.findIndex((v) => v.id === id);
		if (idx > -1) list[idx].joined = status;
	}

	function join(id: string) {
		return new Promise((resolve, reject) => {
			if (!joined.value[id]) {
				event
					.join(id)
					.then(() => {
						update_join_status(id, true);
						resolve(void 0);
					})
					.catch(reject);
			}
		});
	}

	function exit(id: string) {
		return new Promise((resolve, reject) => {
			if (joined.value[id]) {
				event
					.exit(id)
					.then(() => {
						update_join_status(id, false);
						resolve(void 0);
					})
					.catch(reject);
			}
		});
	}

	function stop(id: string) {
		return new Promise((resolve, reject) => {
			load(id)
				.then((info) => {
					if (!info.end)
						event
							.stop(id)
							.then(() => {
								update_event_info({ ...info, end: dayjs(new Date()).unix() });
								resolve(void 0);
							})
							.catch((resp) => {
								if (getErrCodeByResponse(resp) == ErrorCode.EVENT.HAS_STOPPED) {
									load(id, true).then((d) => {
										update_event_info(d);
										reject(resp);
									});
								} else reject(resp);
							});
				})
				.catch(reject);
		});
	}

	function restart(id: string) {
		return new Promise((resolve, reject) => {
			load(id)
				.then((info) => {
					if (info.end)
						event
							.restart(id)
							.then(() => {
								update_event_info({ ...info, end: undefined });
								resolve(void 0);
							})
							.catch((resp) => {
								// 同步信息
								if (getErrCodeByResponse(resp) == ErrorCode.EVENT.NOT_STOP) {
									load(id, true).then((d) => {
										update_event_info(d);
										reject(resp);
									});
								} else reject(resp);
							});
				})
				.catch(reject);
		});
	}

	return {
		list,
		joined,
		get_list,
		create,
		join,
		exit,
		get,
		load,
		update,
		stop,
		restart,
	};
});
