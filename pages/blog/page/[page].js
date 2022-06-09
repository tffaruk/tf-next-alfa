import { getAllBlog, getAllData, getSingleFile } from "@/lib/pages";
import { sortByDate, strip } from "@/lib/utils";
import BlogCard from "components/Blog/BlogCard";
import Pagination from "components/Blog/Pagination";
import Layout from "components/Layouts/Layout";
import config from "config/config.json";
import React from "react";
import common from "styles/common.module.scss";

const Blog = ({ blogs, page, indexData: { frontmatter, content } }) => {
  const blogSortByDate = sortByDate(blogs);
  // pagination
  const { pagination } = config.parameter;
  const indexOfLastPost = page * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const numOfPage = Math.ceil(blogSortByDate.length / pagination);
  const currentBlogs = blogSortByDate.slice(indexOfFirstPost, indexOfLastPost);

  const { title, meta_title, description, noindex, image } = frontmatter;
  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description ? description : strip(content.slice(0, 120))}
      image={image}
      noindex={noindex}
    >
      <section className={`${common.section} pt-6`}>
        <div className={`container ${common.container}`}>
          <h1 className={`${common.title} text-center`}>{title}</h1>
          <div className="mt-5">
            <div className="row">
              <BlogCard
                blogs={currentBlogs}
                page={page}
                numOfPage={numOfPage}
              />
            </div>
          </div>
          <Pagination page={page} numOfPage={numOfPage} />
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

export const getStaticPaths = () => {
  const allBlogs = getAllData("content/blog", false);

  const blog = allBlogs.posts;
  const { pagination } = config.parameter;
  const numOfPage = Math.ceil(blog.length / pagination);
  let paths = [];
  for (let i = 0; i < numOfPage; i++) {
    paths.push({
      params: {
        page: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const page = parseInt((params && params.page) || 1);
  const allBlogs = getAllBlog(false);
  const blogs = allBlogs.posts;
  const indexData = getSingleFile("content/blog/_index.md");

  return {
    props: {
      blogs: blogs,
      page: page,
      indexData: indexData,
    },
  };
};
