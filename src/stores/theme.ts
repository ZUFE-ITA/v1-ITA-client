import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Dark } from "quasar";

const SAVED_KEY = "theme";

export const useThemeStore = defineStore("theme", () => {
	const behavior = ref<Theme>(
		Number.parseInt(
			localStorage.getItem(SAVED_KEY) ?? Theme.FollowSys.toString()
		)
	);

	const isDark = computed(() => {
		const is_dark = (function () {
			switch (behavior.value) {
				case Theme.Dark:
					return true;
				case Theme.Light:
					return false;
				case Theme.FollowSys:
					return window.matchMedia("(prefers-color-scheme:dark)").matches
						? true
						: false;
				default:
					return false;
			}
		})();
		return is_dark;
	});

	watch(
		isDark,
		(d) => {
			document.querySelector("html")?.setAttribute("class", d ? "dark" : "");
		},
		{ immediate: true }
	);

	function switchTheme(to: Theme) {
		behavior.value = to;
		apply();
		localStorage.setItem(SAVED_KEY, to.toString());
	}

	function apply() {
		if (behavior.value === Theme.FollowSys) Dark.set("auto");
		else Dark.set(isDark.value);
	}
	apply();

	return { behavior, isDark, switchTheme, apply };
});

export enum Theme {
	Light,
	Dark,
	FollowSys,
}
