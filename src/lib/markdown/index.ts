import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
// import CherryEngine from "cherry-markdown/dist/cherry-markdown.engine.core";
import { Cherry, config } from "./config";
import mathjax3 from "markdown-it-mathjax3";
import footnote from "markdown-it-footnote";

export { Cherry, config };

// const cherryEngineInstance = new CherryEngine(config);
const md = new MarkdownIt();
md.use(mathjax3).use(footnote);

export const renderMD = (text: string) => md.render(text);

export function stripHTML(raw: string) {
	if (raw) return sanitizeHtml(raw, { allowedTags: [] });
	return "";
}

export function stripMarkdown(raw: string) {
	if (raw) return stripHTML(renderMD(raw));
	return "";
}
