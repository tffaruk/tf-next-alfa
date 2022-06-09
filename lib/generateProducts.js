const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const pages = fs.readdirSync(path.join("content/products"));
const allPage = pages.filter((p) => p.match(/^[a-z]/));
const products = allPage.map((filename) => {
  const slug = filename.replace(".md", "");
  let products = fs.readFileSync(
    path.join(`content/products/`, filename),
    "utf-8"
  );
  let { data } = matter(products);
  const categories = data.categories;

  return {
    frontmatter: data,
    slug: slug,
    categories: categories,
  };
});

try {
  fs.writeFileSync(`frontmatter/products.json`, JSON.stringify(products));
  fs.writeFileSync(`public/products.json`, JSON.stringify(products));
} catch (err) {
  console.error(err);
}
