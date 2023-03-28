<template>
	<q-card v-show="show" style="width: 100%; height: 100%">
		<q-form
			@submit="$emit('push')"
			class="full-height flex"
			style="flex-direction: column"
		>
			<q-card-actions align="between" class="full-width">
				<q-btn flat icon="close" @click="$emit('close')" />
				<q-btn color="primary" type="submit">{{ $t("operate.push") }}</q-btn>
			</q-card-actions>
			<q-card-section
				class="q-pa-md full-width flex"
				style="flex-grow: 1; flex-direction: column"
			>
				<div v-if="sub !== undefined">
					<q-input
						:model-value="sub"
						@update:model-value="$emit('update:sub', $event)"
						:label="$t('bbs.sub')"
					/>
				</div>
				<div style="flex-grow: 1">
					<div class="full-height full-width">
						<!-- <md-editor
							:id="id"
							:value="content"
							@update:value="$emit('update:content', $event)"
						></md-editor> -->
						<markdown-editor
							ref="editor"
							:id="id"
							:value="content"
							@update:value="$emit('update:content', $event)"
						></markdown-editor>
					</div>
				</div>
				<!--
				<div class="editor-container">
				</div> -->
			</q-card-section>
		</q-form>

		<q-inner-loading
			:showing="sending"
			:label="$t('bbs.sending')"
			label-class="text-teal"
			label-style="font-size: 1.1em"
		/>
	</q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { $t } from "@/boot/i18n";

// import MdEditor from "./MdEditor.vue";
import MarkdownEditor from "@/components/markdown/MarkdownEditor.vue";

defineProps<{
	show: boolean;
	sub?: string;
	content: string;
	id: string;
}>();
defineExpose({
	clear() {
		(editor.value as any).clear();
	},
});

const editor = ref(null);
defineEmits(["close", "push", "update:sub", "update:content"]);
const sending = ref(false);
</script>
