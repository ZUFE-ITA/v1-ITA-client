export type BlogOperation =
	| "Read"
	| "Append"
	| "Vet"
	| "DeleteSelf"
	| "DeleteOthers";
export type EventOperation = BlogOperation | "Join";

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
}

function PermissionParser(per: string | null = null): Permission {
	per ||= "r-----;r----";
	const [e, b] = per.split(";");
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
	};
}

export {
	// check_permission,
	PermissionParser,
};
