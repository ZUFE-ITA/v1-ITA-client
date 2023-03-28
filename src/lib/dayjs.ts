import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { id2datetime } from "./id";

dayjs.extend(relativeTime);

dayjs.locale("zh-cn");

export function fromId2RelativeTime(id: string) {
	return id2datetime(id).fromNow();
}

export function cvtToUnix(
	t: string | number | dayjs.Dayjs | Date | null | undefined
) {
	return dayjs(t).unix();
}

export default dayjs;
