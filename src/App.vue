<template>
	<main-layout></main-layout>
</template>

<script setup lang="ts">
import MainLayout from "./layouts/MainLayout.vue";
import { useThemeStore } from "./stores/theme";

const theme = useThemeStore();
// theme.apply();
</script>
