<template>
	<q-btn round flat color="primary" @click="switchTheme">
		<q-icon>
			<theme-light-icon
				v-if="theme.behavior === Theme.Light"
			></theme-light-icon>
			<theme-dark-icon v-if="theme.behavior === Theme.Dark"></theme-dark-icon>
			<theme-default-icon
				v-if="theme.behavior === Theme.FollowSys"
			></theme-default-icon>
		</q-icon>
	</q-btn>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Theme, useThemeStore } from "@/stores/theme";

const ThemeLightIcon = defineAsyncComponent(
	() => import("@/components/icons/theme-light-icon.vue")
);
const ThemeDarkIcon = defineAsyncComponent(
	() => import("@/components/icons/theme-dark-icon.vue")
);
const ThemeDefaultIcon = defineAsyncComponent(
	() => import("@/components/icons/theme-os-default-icon.vue")
);

const theme = useThemeStore();
function switchTheme() {
	theme.switchTheme((theme.behavior + 1) % 3);
}
</script>
