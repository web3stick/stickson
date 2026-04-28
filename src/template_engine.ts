// ============================================================

export interface element_data {
  type: string;
  id?: string;
  class?: string;
  content?: string | element_data[] | element_data;
  href?: string;
  target?: string;
  rel?: string;
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  onclick?: string;
  tag?: string;
  attrs?: Record<string, string | number | boolean>;
  async?: boolean;
  defer?: boolean;
}

export interface content_data {
  version?: string;
  meta?: {
    title?: string;
    description?: string;
    author?: string;
    lang?: string;
    favicon?: string;
    ogImage?: string;
  };
  theme?: {
    name?: string;
    cssFile?: string;
    customCss?: string;
  };
  template?: {
    file?: string;
    headExtra?: string;
    bodyExtra?: string;
  };
  routes?: Record<string, string>;
  page: {
    head: element_data[];
    body: element_data[];
  };
}

// ============================================================
function escape_html(str: unknown): string {
  if (str === null || str === undefined) return "";
  const s = String(str);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function render_attrs(
  attrs?: Record<string, string | number | boolean>,
): string {
  if (!attrs) return "";
  return Object.entries(attrs)
    .map(([k, v]) => ` ${escape_html(k)}="${escape_html(v)}"`)
    .join("");
}

function render_element(el: element_data): string {
  const {
    type,
    id,
    class: cls,
    content,
    href,
    target,
    rel,
    src,
    alt,
    width,
    height,
    onclick,
    tag,
    attrs,
    async: isAsync,
    defer: isDefer,
  } = el;

  const idAttr = id ? ` id="${escape_html(id)}"` : "";
  const classAttr = cls ? ` class="${escape_html(cls)}"` : "";
  const attrsStr = render_attrs(attrs);

  switch (type) {
    case "p":
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "span":
    case "figcaption":
    case "summary":
    case "mark":
    case "cite":
    case "code":
      return `<${type}${idAttr}${classAttr}${attrsStr}>${escape_html(content)}</${type}>`;

    case "a":
      return `<a${idAttr}${classAttr} href="${escape_html(href)}"${target ? ` target="${escape_html(target)}"` : ""}${rel ? ` rel="${escape_html(rel)}"` : ""}${attrsStr}>${escape_html(content)}</a>`;

    case "button":
      return `<button${idAttr}${classAttr}${onclick ? ` onclick="${escape_html(onclick)}"` : ""}${attrsStr}>${escape_html(content)}</button>`;

    case "img":
      return `<img${idAttr}${classAttr} src="${escape_html(src)}"${alt ? ` alt="${escape_html(alt)}"` : ""}${width ? ` width="${escape_html(width)}"` : ""}${height ? ` height="${escape_html(height)}"` : ""}${attrsStr} />`;

    case "script":
      return `<script${idAttr}${classAttr} src="${escape_html(src)}"${isAsync ? " async" : ""}${isDefer ? " defer" : ""}${attrsStr}></script>`;

    case "style":
      return `<style${idAttr}${classAttr}${attrsStr}>${content}</style>`;

    case "section":
    case "div":
    case "nav":
    case "header":
    case "footer":
    case "main":
    case "aside":
    case "figure":
    case "details":
      return `<${type}${idAttr}${classAttr}${attrsStr}>${render_element_array(content as element_data[])}</${type}>`;

    case "ul":
    case "ol":
      return `<${type}${idAttr}${classAttr}${attrsStr}>${render_element_array(content as element_data[])}</${type}>`;

    case "li": {
      const liContent = content as element_data | string;
      if (typeof liContent === "object" && liContent.type === "a") {
        return `<li${idAttr}${classAttr}${attrsStr}>${render_element(liContent)}</li>`;
      }
      return `<li${idAttr}${classAttr}${attrsStr}>${escape_html(liContent)}</li>`;
    }

    case "custom":
      return `<${tag}${idAttr}${classAttr}${attrsStr}>${render_element_content(content)}</${tag}>`;

    case "time": {
      const datetime = (el as any).datetime;
      const datetimeAttr = datetime
        ? ` datetime="${escape_html(datetime)}"`
        : "";
      return `<time${idAttr}${classAttr}${datetimeAttr}${attrsStr}>${escape_html(content)}</time>`;
    }

    case "abbr":
      return `<abbr${idAttr}${classAttr} title="${escape_html((el as any).title)}"${attrsStr}>${escape_html(content)}</abbr>`;

    case "blockquote": {
      const cite = (el as any).cite;
      const citeAttr = cite ? ` cite="${escape_html(cite)}"` : "";
      return `<blockquote${idAttr}${classAttr}${citeAttr}${attrsStr}><p>${escape_html(content)}</p></blockquote>`;
    }

    case "article":
      return `<${type}${idAttr}${classAttr}${attrsStr}>${render_element_array(content as element_data[])}</${type}>`;

    case "pre":
      return `<pre${idAttr}${classAttr}${attrsStr}><code>${escape_html((el as any).content)}</code></pre>`;

    case "hr":
      return `<hr${idAttr}${classAttr}${attrsStr} />`;

    default:
      return `<!-- unknown element type: ${escape_html(type)} -->`;
  }
}

function render_element_content(content: unknown): string {
  if (Array.isArray(content)) {
    return render_element_array(content);
  }
  if (typeof content === "object" && content !== null) {
    return render_element(content as element_data);
  }
  return escape_html(content);
}

function render_element_array(elements: unknown): string {
  if (!Array.isArray(elements)) return "";
  return elements.map((el) => render_element(el as element_data)).join("\n");
}

// ============================================================
export function render_head(elements: element_data[]): string {
  return render_element_array(elements);
}

export function render_body(elements: element_data[]): string {
  return render_element_array(elements);
}

export function build_html(data: content_data, templateHtml?: string): string {
  console.log("====== Building HTML from content ======");

  const headContent = render_head(data.page.head);
  const bodyContent = render_body(data.page.body);
  const title = data.meta?.title
    ? escape_html(data.meta.title)
    : "Stickson Page";
  const lang = data.meta?.lang || "en";
  const description = data.meta?.description
    ? escape_html(data.meta.description)
    : "";

  let html = templateHtml || "";

  if (!html) {
    html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  ${description ? `<meta name="description" content="${description}" />` : ""}
  {{HEAD_CONTENT}}
  {{THEME_CSS}}
  {{CUSTOM_CSS}}
</head>
<body>
  {{BODY_CONTENT}}
  {{BODY_EXTRA}}
</body>
</html>`;
  }

  html = html.replace("{{HEAD_CONTENT}}", headContent);
  html = html.replace("{{BODY_CONTENT}}", bodyContent);

  if (data.template?.headExtra) {
    html = html.replace("{{HEAD_EXTRA}}", data.template.headExtra);
  }
  if (data.template?.bodyExtra) {
    html = html.replace("{{BODY_EXTRA}}", data.template.bodyExtra);
  }

  const themeTag = data.theme?.cssFile
    ? `<link rel="stylesheet" href="${escape_html(data.theme.cssFile)}" />`
    : data.theme?.name
      ? `<link rel="stylesheet" href="/themes/${escape_html(data.theme.name)}/theme.css" />`
      : "";
  html = html.replace("{{THEME_CSS}}", themeTag);

  const customCss = data.theme?.customCss
    ? `<style>${data.theme.customCss}</style>`
    : "";
  html = html.replace("{{CUSTOM_CSS}}", customCss);

  html = html.replace(
    /{{HEAD_EXTRA}}|{{BODY_EXTRA}}|{{THEME_CSS}}|{{CUSTOM_CSS}}/g,
    "",
  );

  return html;
}
