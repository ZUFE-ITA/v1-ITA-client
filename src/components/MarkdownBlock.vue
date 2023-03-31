<template>
	<q-markdown class="break-all" :src="text" :plugins="plugins"></q-markdown>
</template>

<script setup lang="ts">
// import { useQMarkdownGlobalProps } from "@quasar/quasar-ui-qmarkdown";
import footNote from "markdown-it-footnote";
import mathjax3 from "markdown-it-mathjax3";
defineProps<{
	text: string;
}>();
const plugins = [footNote, mathjax3];
</script>

<style>
.break-all {
	word-break: break-all;
}
</style>
