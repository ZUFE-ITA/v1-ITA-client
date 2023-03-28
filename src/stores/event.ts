import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { event } from "@/lib/api/event";
import { id2timestamp } from "@/lib/id";

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

	function get(id: string) {
		const info = computed(() => {
			const idx = list.findIndex((v) => v.id === id);
			if (idx > -1) return list[idx];
			return null;
		});
		if (info.value === null) {
			event.get(id).then((d) => update_event_info(d.data));
		}
		return info;
	}

	function get_list() {
		event.list().then((d) => {
			update_event_info(...d.data);
		});
	}

	function create(data: event.EventCreateForm) {
		return new Promise<event.EventInfo>((resolve, reject) => {
			event
				.create(data)
				.then((d) => {
					const id = d.data.id;
					const info = {
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
	return { list, joined, get_list, create, join, exit, get };
});
