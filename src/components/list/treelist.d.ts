import { RouteLocationRaw } from "vue-router";

export type HiddenField = () => Boolean | boolean;

export interface TreeListItemProps {
	type: "item";
	title: string;
	caption?: string;
	icon: string;
	to: RouteLocationRaw;
	hidden?: HiddenField;
}

export interface TreeListExpensionProps {
	type: "expension";
	title: string;
	caption?: string;
	icon: string;
	children: TreeListChildrenProps;
	hidden?: HiddenField;
}

export type TreeListProps = TreeListItemProps | TreeListExpensionProps;
export type TreeListChildrenProps = TreeListProps[];
