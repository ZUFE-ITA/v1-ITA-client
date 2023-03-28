import sanitizeHtml from "sanitize-html";

import CherryEngine from "cherry-markdown/dist/cherry-markdown.engine.core";
import { Cherry, config } from "./config";

export { Cherry, config };

const cherryEngineInstance = new CherryEngine(config);

export function renderMD(md: string) {
	return (cherryEngineInstance as any).makeHtml(md);
}

export function stripHTML(raw: string) {
	if (raw) return sanitizeHtml(raw, { allowedTags: [] });
	return "";
}

export function stripMarkdown(raw: string) {
	if (raw) return stripHTML(renderMD(raw));
	return "";
}
