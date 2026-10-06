import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "site");
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name)) : join(dir, e.name)))).flat();
}
const htmlFiles = (await files(root)).filter(f => f.endsWith(".html"));
let references = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const page = relative(root, file);
  if (html.includes("data-redirect")) continue;
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page + ": one main heading");
  assert.doesNotMatch(html, /Rebuild preview|this preview/, page + ": no preview wording");
  assert.doesNotMatch(html.replace(/<[^>]+>/g, ""), /[\u2013\u2014]/, page + ": no em or en dashes in copy");
  assert.match(html, /<html lang="en">/, page + ": language");
  assert.match(html, /name="description"/, page + ": description");
  assert.doesNotMatch(html, /noindex/, page + ": must be indexable");
  assert.match(html, /rel="canonical" href="https:\/\/alphainfra\.us\//, page + ": canonical");
  assert.match(html, /property="og:image"/, page + ": og image");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, page + ": duplicate IDs");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const currentPath = "/" + page.replace(/index\.html$/, "");
    const target = new URL(href, "http://preview.local" + currentPath);
    let targetFile = join(root, decodeURIComponent(target.pathname));
    try {
      if ((await stat(targetFile)).isDirectory()) targetFile = join(targetFile, "index.html");
      await stat(targetFile);
    } catch {
      assert.fail(page + ": missing target " + href);
    }
    if (target.hash) {
      const targetHTML = await readFile(targetFile, "utf8");
      assert.ok(targetHTML.includes('id="' + target.hash.slice(1) + '"'), page + ": missing anchor " + href);
    }
    references++;
  }
}
assert.equal((await readFile(join(root, "CNAME"), "utf8")).trim(), "alphainfra.us");
assert.match(await readFile(join(root, "robots.txt"), "utf8"), /Allow: \/\nSitemap: https:\/\/alphainfra\.us\/sitemap\.xml/);
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (html.includes("data-redirect") || file.endsWith("404.html")) continue;
  const path = "/" + relative(root, file).replace(/index\.html$/, "");
  assert.ok(sitemap.includes("<loc>https://alphainfra.us" + path + "</loc>"), path + " in sitemap");
}
assert.match(await readFile(join(root, "book/index.html"), "utf8"), /url=\/contact\//, "/book redirects to /contact");
assert.match(await readFile(join(root, "hermes/index.html"), "utf8"), /Paula/, "Hermes page lists the agents");
const projects = JSON.parse(await readFile(join(root, "projects.json"), "utf8"));
assert.equal(projects.length, 14);
assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
assert.ok(projects.every(p => ["tools", "data", "workflow", "team", "lab"].includes(p.cat)));
const systemPage = await readFile(join(root, "services/system/index.html"), "utf8");
assert.match(systemPage, /id="custom-agents"/, "Custom-build page includes the agent offering");
assert.match(systemPage, /not a client case study/, "Hypothetical agent example stays clearly labelled");
assert.match(systemPage, /data-project="hermes"/, "Agent offering links to the independent project");
assert.equal(projects.find(p => p.id === "hermes").type, "INDEPENDENT PROJECT");
assert.match(await readFile(join(root, "services/index.html"), "utf8"), /custom AI agents/);
console.log("PASS: " + htmlFiles.length + " HTML documents, " + references + " internal references, 14 project records.");
