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
import ThemeLightIcon from "@/components/icons/theme-light-icon.vue";
import ThemeDefaultIcon from "@/components/icons/theme-os-default-icon.vue";
import ThemeDarkIcon from "@/components/icons/theme-dark-icon.vue";
import { Theme, useThemeStore } from "@/stores/theme";
const theme = useThemeStore();
function switchTheme() {
	theme.switchTheme((theme.behavior + 1) % 3);
}
</script>
