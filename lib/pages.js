import { execSync } from "child_process";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { convertJSON } from "./utils";

const currentDate = new Date();
// all individual file
export const getSingleFile = (fileName) => {
  const file = fs.readFileSync(path.join(fileName), "utf-8");
  const { data: frontmatter, content } = matter(file);
  return {
    frontmatter,
    content,
  };
};

// all data (products)
export const getAllData = (type, isDate) => {
  const allPage = fs.readdirSync(path.join(type));

  const allfile = allPage.filter((d) => !d.match(/^_/));
  const file = allfile.filter((file) => file.includes(".md"));
  const posts = file.map((filename) => {
    const slug = filename.replace(/ /g, "-").replace(/\.(mdx|md)/, "");
    const postsData = fs.readFileSync(path.join(type, filename), "utf-8");
    const dataPost = matter(postsData);
    const frontmatter = convertJSON(dataPost.data);
    const content = dataPost.content;
    const category = frontmatter.categories ? frontmatter.categories : "";

    return {
      frontmatter,
      slug,
      content,
      category,
    };
  });

  const filterByDraft = posts.filter((p) => !p.frontmatter.draft && posts);
  const filterByDate = isDate
    ? filterByDraft
    : filterByDraft.filter((d) => new Date(d.frontmatter.date) <= currentDate);

  return {
    posts: filterByDate,
  };
};

// regular pages
export const getRegulerPage = (type) => {
  const allPages = fs.readdirSync(path.join(type));
  const allBlog = fs.readdirSync(path.join("content/blog"));
  const allFiles = [...allBlog, ...allPages];
  const filterIndexPage = allFiles.filter(
    (page) => !page.match(/^_/) && page.includes(".md")
  );

  const regulerPage = filterIndexPage.map((file) => {
    const slug = file.replace(/ /g, "-").replace(/\.(mdx|md)/, "");

    const regulerFrontmatter = fs.readFileSync(
      path.join(allPages.includes(file) ? type : "content/blog", file),
      "utf-8"
    );
    const regulerData = matter(regulerFrontmatter);

    const frontmatter = convertJSON(regulerData.data);

    const content = regulerData.content;
    return {
      slug,
      frontmatter,
      content,
    };
  });
  const filterByDraft = regulerPage.filter(
    (p) => !p.frontmatter.draft && regulerPage
  );
  const filterSection = filterByDraft.filter(
    (page) => page.frontmatter.build != false
  );
  return filterSection;
};

// categories documents
export const getAllCategoriesIndex = (categories) => {
  const categoriesFile = fs.readFileSync(
    path.join(`content/categories/${categories}.md`),
    "utf-8"
  );
  const frontmatter = matter(categoriesFile).data;

  return frontmatter;
};

// changelog Data
export const getChangelogData = () => {
  const changeLogFile = fs.readdirSync(path.join("changelog"));
  const changelog = changeLogFile.map((fileName) => {
    const slug = fileName.replace(/ /g, "-").replace(".md", "");
    const changelogPage = fs.readFileSync(
      path.join("changelog", fileName),
      "utf-8"
    );
    const changelogData = matter(changelogPage);
    const frontmatter = changelogData.data;
    const content = changelogData.content;
    return {
      frontmatter,
      content,
      slug,
    };
  });
  return changelog;
};

// get blog data
export const getAllBlog = (isDate) => {
  const allBlogPage = fs.readdirSync(path.join("content/blog"));
  const allBlog = allBlogPage.filter((d) => !d.match(/^_/));
  const file = allBlog.filter((file) => file.includes(".md"));
  const posts = file.map((filename) => {
    const slug = filename.replace(/ /g, "-").replace(/\.(mdx|md)/, "");
    const allfileData = fs.readFileSync(
      path.join("content/blog", filename),
      "utf-8"
    );
    // get all data from blog
    const blogData = matter(allfileData);
    const frontmatter = convertJSON(blogData.data);
    const content = blogData.content;
    const category = frontmatter.categories ? frontmatter.categories : "";

    // genarate update Date
    const result = execSync(
      `git log --pretty=format:\"%ad\" -1 -- ${`${"content/blog"}/${filename}`}`,
      {
        encoding: "utf-8",
      }
    );

    const updateDate = convertJSON(new Date(result));

    return {
      frontmatter,
      slug,
      content,
      category,
      updateDate,
    };
  });

  const filterByDraft = posts.filter((p) => !p.frontmatter.draft && posts);

  const filterByDate = isDate
    ? filterByDraft
    : filterByDraft.filter((d) => new Date(d.frontmatter.date) <= currentDate);

  return {
    posts: filterByDate,
  };
};
