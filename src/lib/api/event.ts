import request from "../request";
// TODO: 把比赛相关的API迁移到 competition.ts
import dayjs, { cvtToUnix } from "../dayjs";

export function switch_type(v: event.EventInfo) {
	const now = dayjs(new Date()).unix();
	if (v.longtime) {
		if (cvtToUnix(v.range?.start) > now) {
			return "future";
		} else if (cvtToUnix(v.range?.end) > now) {
			return "ongoing";
		} else {
			return "expired";
		}
	}
	if (cvtToUnix(v.start) > now) {
		return "future";
	} else if ((v.manual_stop && !v.end) || cvtToUnix(v.end) > now) {
		return "ongoing";
	} else {
		return "expired";
	}
}

export namespace event {
	const base = (key: string) => {
		return `/event/${key}`;
	};

	export interface EventCreateForm {
		title: string;
		desc: string;
		organizer: string;
		addr: string;
		longtime: boolean;
		range?: { start: number; end: number };
		start?: number;
		end?: number;
		manual_stop: boolean;
		with_point: boolean;
		point_detail?: string;
		with_reward: boolean;
		reward_detail?: string;
		limit_count: boolean;
		max_count?: number;
		need_check: boolean;
		deadline: number;
		is_competition: boolean;
	}

	export interface EventCreateResult {
		id: string;
	}
	export function create(data: EventCreateForm) {
		return request.post<EventCreateResult>(base("create"), data);
	}

	export interface EventInfo extends EventCreateForm {
		id: string;
		creator: string;
		joined: boolean;
	}
	// TODO: 根据范围显示
	export function list() {
		return request.post<EventInfo[]>(base("list"));
	}

	export function joined() {
		return request.post<string[]>(base("joined"));
	}

	export function join(id: string) {
		return request.post(base("join"), { id });
	}
	export function exit(id: string) {
		return request.post(base("exit"), { id });
	}

	export function get(id: string) {
		return request.post<EventInfo>(base(id));
	}

	export function update(id: string, form: EventCreateForm) {
		return request.post(base(`update/${id}`), form);
	}

	export function stop(id: string) {
		return request.post(base(`stop/${id}`));
	}
	export function restart(id: string) {
		return request.post(base(`restart/${id}`));
	}
}
