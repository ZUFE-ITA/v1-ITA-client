<template>
	<div :id="id"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";

import { Cherry, config } from "@/lib/markdown";
import "cherry-markdown/dist/cherry-markdown.css";
import "./theme/fix-style.css";
import { useThemeStore } from "@/stores/theme";

const props = defineProps<{
	value?: string;
	id: string;
}>();

const emit = defineEmits(["update:value"]);

const theme_store = useThemeStore();

if (theme_store.isDark) {
	import("./theme/darcula.css");
	config.editor.codemirror.theme = "darcula";
	config.toolbars.theme = "dark";
} else {
	config.editor.codemirror.theme = "default";
	config.toolbars.theme = "light";
}

let cherry: Cherry;
onMounted(() => {
	cherry = new Cherry({
		id: props.id,
		value: props.value ? props.value : "",
		...config,
		callback: {
			afterChange: function () {
				emit("update:value", cherry.getMarkdown());
			},
		},
	});
	watch(props, (p) => {
		cherry.setValue(p.value ?? "");
	});
});

defineExpose({
	clear() {
		cherry.setValue("");
	},
});
</script>
