import * as fs from "fs";
import * as path from "path";

// ============================================================
export interface inline_options {
  templateHtml?: string;
  cssFile?: string;
  customCss?: string;
  content: string;
}

// ============================================================
export function inline_content_to_html(options: inline_options): string {
  console.log("====== Inlining content to single HTML file ======");

  const { templateHtml, cssFile, customCss, content } = options;

  let html = templateHtml || DEFAULT_TEMPLATE;

  html = html.replace("{{CONTENT_JSON}}", escape_js_string(content));

  if (cssFile && fs.existsSync(cssFile)) {
    const css = fs.readFileSync(cssFile, "utf-8");
    html = html.replace("{{THEME_CSS}}", css);
  } else {
    html = html.replace("{{THEME_CSS}}", "");
  }

  if (customCss) {
    html = html.replace("{{CUSTOM_CSS}}", customCss);
  } else {
    html = html.replace("{{CUSTOM_CSS}}", "");
  }

  return html;
}

const DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stickson Page</title>
  <style>
{{THEME_CSS}}
{{CUSTOM_CSS}}
  </style>
</head>
<body>
  <div id="app"></div>
  <script>
    const CONTENT = {{CONTENT_JSON}};
    const app = document.getElementById('app');
    function render(el) {
      if (!el) return '';
      const { type, id, class: cls, content, href, src, alt, tag, attrs } = el;
      const idAttr = id ? ' id="' + id + '"' : '';
      const classAttr = cls ? ' class="' + cls + '"' : '';
      const attrsStr = attrs ? Object.entries(attrs).map(([k,v]) => ' ' + k + '="' + v + '"').join('') : '';
      switch(type) {
        case 'p': case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': case 'span':
          return '<' + type + idAttr + classAttr + attrsStr + '>' + (typeof content === 'string' ? content : '') + '</' + type + '>';
        case 'a':
          return '<a' + idAttr + classAttr + ' href="' + href + '"' + attrsStr + '>' + content + '</a>';
        case 'img':
          return '<img' + idAttr + classAttr + ' src="' + src + '"' + (alt ? ' alt="' + alt + '"' : '') + attrsStr + ' />';
        case 'div': case 'section': case 'nav': case 'header': case 'footer': case 'main':
          return '<' + type + idAttr + classAttr + attrsStr + '>' + (Array.isArray(content) ? content.map(render).join('') : '') + '</' + type + '>';
        case 'ul': case 'ol':
          return '<' + type + idAttr + classAttr + attrsStr + '>' + (Array.isArray(content) ? content.map(render).join('') : '') + '</' + type + '>';
        case 'li':
          return '<li' + idAttr + classAttr + attrsStr + '>' + (typeof content === 'object' ? render(content) : content) + '</li>';
        case 'button':
          return '<button' + idAttr + classAttr + attrsStr + '>' + content + '</button>';
        case 'custom':
          return '<' + tag + idAttr + classAttr + attrsStr + '>' + (typeof content === 'string' ? content : (Array.isArray(content) ? content.map(render).join('') : '')) + '</' + tag + '>';
        default:
          return '<!-- unknown: ' + type + ' -->';
      }
    }
    if (CONTENT.page && CONTENT.page.body) {
      app.innerHTML = CONTENT.page.body.map(render).join('');
    }
  </script>
</body>
</html>`;

function escape_js_string(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}
