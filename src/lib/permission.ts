export type BaseOperation =
	| "Append"
	| "Vet"
	| "DeleteSelf"
	| "DeleteOthers"
	| "Read";
export type BlogOperation = BaseOperation;
export type EventOperation = BaseOperation | "Join";
export type ChallengeOperation = BaseOperation;

export class BlogPermission {
	static Read = "r";
	static Append = "a";
	static Vet = "v";
	static DeleteSelf = "d";
	static DeleteOthers = "D";

	static check(per: Permission, op: BlogOperation) {
		return per.Blog[`can${op}`];
	}
}

export class ChallengePermission {
	static Read = "r";
	static Append = "a";
	static Vet = "v";
	static DeleteSelf = "d";
	static DeleteOthers = "D";

	static check(per: Permission, op: ChallengeOperation) {
		return per.Challenge[`can${op}`];
	}
}

export class EventPermission {
	static Read = "r";
	static Append = "a";
	static Vet = "v";
	static DeleteSelf = "d";
	static DeleteOthers = "D";
	static Join = "j";

	static check(per: Permission, op: EventOperation) {
		return per.Event[`can${op}`];
	}
}

export interface Permission {
	Blog: {
		canRead: Boolean;
		canAppend: Boolean;
		canVet: Boolean;
		canDeleteSelf: Boolean;
		canDeleteOthers: Boolean;
	};
	Event: {
		canRead: Boolean;
		canAppend: Boolean;
		canVet: Boolean;
		canDeleteSelf: Boolean;
		canDeleteOthers: Boolean;
		canJoin: Boolean;
	};
	Challenge: {
		canRead: Boolean;
		canAppend: Boolean;
		canVet: Boolean;
		canDeleteSelf: Boolean;
		canDeleteOthers: Boolean;
	};
}
const DEFAULT_PERMISSION = "r-----;r----;r----";
const DEFAULT_GROUPS = DEFAULT_PERMISSION.split(";");
function PermissionParser(per: string | null = null): Permission {
	per ||= DEFAULT_PERMISSION;
	const groups = per.split(";");
	if (groups.length < DEFAULT_GROUPS.length) {
		for (let i = groups.length; i < DEFAULT_GROUPS.length; ++i) {
			groups.push(DEFAULT_GROUPS[i]);
		}
	}
	const [e, b, challenge] = groups;
	return {
		Event: {
			canRead: e[0] === EventPermission.Read,
			canAppend: e[1] === EventPermission.Append,
			canVet: e[2] === EventPermission.Vet,
			canDeleteSelf: e[3] === EventPermission.DeleteSelf,
			canDeleteOthers: e[4] === EventPermission.DeleteOthers,
			canJoin: e[5] === EventPermission.Join,
		},
		Blog: {
			canRead: b[0] === BlogPermission.Read,
			canAppend: b[1] === BlogPermission.Append,
			canVet: b[2] === BlogPermission.Vet,
			canDeleteSelf: b[3] === BlogPermission.DeleteSelf,
			canDeleteOthers: b[4] === BlogPermission.DeleteOthers,
		},
		Challenge: {
			canRead: challenge[0] === ChallengePermission.Read,
			canAppend: challenge[1] === ChallengePermission.Append,
			canVet: challenge[2] === ChallengePermission.Vet,
			canDeleteSelf: challenge[3] === ChallengePermission.DeleteSelf,
			canDeleteOthers: challenge[4] === ChallengePermission.DeleteOthers,
		},
	};
}

export { PermissionParser };
