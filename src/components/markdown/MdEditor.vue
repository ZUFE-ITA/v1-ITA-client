<template>
	<div :id="id" class="full-height full-width"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import * as monaco from "monaco-editor";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// import * as MonacoMarkdown from "monaco-markdown";
const props = defineProps<{ id: string }>();
const text = ref("");

let editor: monaco.editor.IStandaloneCodeEditor;
onBeforeUnmount(() => {
	editor.dispose();
});

onMounted(() => {});
// @ts-ignore
self.MonacoEnvironment = {
	getWorker(_: string, label: string) {
		if (label === "json") {
			return new jsonWorker();
		}
		if (label === "css" || label === "scss" || label === "less") {
			return new cssWorker();
		}
		if (label === "html" || label === "handlebars" || label === "razor") {
			return new htmlWorker();
		}
		if (["typescript", "javascript"].includes(label)) {
			return new tsWorker();
		}
		return new EditorWorker();
	},
};
const editorInit = () => {
	nextTick(() => {
		monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: true,
			noSyntaxValidation: false,
		});
		monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
			target: monaco.languages.typescript.ScriptTarget.ES2016,
			allowNonTsExtensions: true,
		});

		!editor
			? (editor = monaco.editor.create(
					document.getElementById(props.id) as HTMLElement,
					{
						value: text.value, // 编辑器初始显示文字
						language: "go", // 语言支持自行查阅demo
						automaticLayout: true, // 自适应布局
						theme: "vs-dark", // 官方自带三种主题vs, hc-black, or vs-dark
						foldingStrategy: "indentation",
						renderLineHighlight: "all", // 行亮
						selectOnLineNumbers: true, // 显示行号
						minimap: {
							enabled: false,
						},
						readOnly: false, // 只读
						fontSize: 16, // 字体大小
						scrollBeyondLastLine: false, // 取消代码后面一大段空白
						overviewRulerBorder: false, // 不要滚动条的边框
					}
			  ))
			: editor.setValue("");
		// console.log(editor)
		// 监听值的变化
		editor.onDidChangeModelContent((val: any) => {
			text.value = editor.getValue();
		});
	});
};
editorInit();
</script>
