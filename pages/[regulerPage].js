import { getDownloadData } from "@/lib/api";
import {
  getAllBlog,
  getAllData,
  getRegulerPage,
  getSingleFile,
} from "@/lib/pages";
import Contact from "components/Contact";
import BlogSinglePage from "Layouts/BlogSinglePage";
import Bundle from "Layouts/Bundle";
import FreeTemplates from "Layouts/FreeTemplates";
import HugoThemes from "Layouts/HugoThemes";
import { License } from "Layouts/License";
import PremiumTemplates from "Layouts/PremiumTemplates";
import { Regular } from "Layouts/Regular";
import SingleBundle from "Layouts/SingleBundle";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import toc from "rehype-toc";

const RegulerPage = ({
  filterPost,
  slug,
  products,
  bundleData,
  contactData,
  blogs,
  mdxSource,
  premiumTemplates,
  hugoThemes,
  hugoBundle,
  bootstrapBundle,
  freeTemplates,
  licensePage,
  featuresData,
  allBlogs,
  allDownloadData,
}) => {
  return (
    <>
      {slug == bundleData.frontmatter.layout ? (
        <Bundle products={products.posts} bundleData={bundleData} slug={slug} />
      ) : slug == "contact" ? (
        <Contact contactData={contactData} slug={slug} />
      ) : blogs.length > 0 ? (
        <BlogSinglePage
          blog={blogs}
          slug={slug}
          mdxSource={mdxSource}
          allBlogs={allBlogs}
        />
      ) : slug == "free-bootstrap-templates" ? (
        <FreeTemplates
          freeTemplates={freeTemplates}
          products={products}
          featuresData={featuresData}
          allDownloadData={allDownloadData}
        />
      ) : slug == "premium-templates" ? (
        <PremiumTemplates dataContents={premiumTemplates} products={products} />
      ) : slug == "hugo-themes" ? (
        <HugoThemes dataContents={hugoThemes} products={products} />
      ) : slug == "hugo-bundle" ? (
        <SingleBundle
          dataContents={hugoBundle}
          bundleData={bundleData.frontmatter}
          products={products}
        />
      ) : slug == "bootstrap-bundle" ? (
        <SingleBundle
          dataContents={bootstrapBundle}
          bundleData={bundleData.frontmatter}
          products={products}
        />
      ) : slug == "license" ? (
        <License licensePage={licensePage} />
      ) : (
        <Regular filterPost={filterPost} slug={slug} />
      )}
    </>
  );
};

export default RegulerPage;

export async function getStaticPaths() {
  const regulerPages = getRegulerPage("content");

  const paths = regulerPages.map((d) => ({
    params: {
      regulerPage: d.slug,
    },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const { regulerPage } = params;
  const regulerPages = getRegulerPage("content");
  const regulerPost = regulerPages.filter((p) => !p.frontmatter.layout);
  const filterPost = regulerPost.filter((data) => data.slug === regulerPage);

  // bundle data
  const allProducts = getAllData("content/products", false);
  const bundleData = getSingleFile("content/bundle.md");
  // contact page data
  const contactPage = regulerPages.filter(
    (p) => p.frontmatter.layout == "contact"
  );
  const contactData = contactPage[0];

  // template data
  const premiumTemplates = regulerPages.filter(
    (p) => p.frontmatter.layout === "premium"
  );

  const hugoThemes = regulerPages.filter(
    (p) => p.frontmatter.layout === "hugo"
  );

  const freeTemplates = regulerPages.filter(
    (p) => p.frontmatter.layout === "free"
  );

  const hugoBundle = regulerPages.filter(
    (p) => p.frontmatter.bundle === "hugo"
  );
  const bootstrapBundle = regulerPages.filter(
    (p) => p.frontmatter.bundle === "html"
  );
  const licensePage = regulerPages.filter(
    (data) => data.frontmatter.layout == "license"
  );

  // blog page data
  // const blogPage = regulerPages.filter((p) => p.frontmatter.layout === "post");
  const allBlogs = getAllBlog(false);
  const blog = allBlogs.posts.filter((data) =>
    data.slug === regulerPage ? data.slug == regulerPage : null
  );

  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, [toc, { headings: ["h2", "h3", "h4"] }]],
      //more info for toc here https://github.com/JS-DevTools/rehype-toc
    },
  };
  const mdxSource = await serialize(blog.length && blog[0].content, options);
  const featuresData = getSingleFile("content/features.md");
  const allDownloadData = await getDownloadData();

  return {
    props: {
      filterPost: filterPost,
      slug: regulerPage,
      products: allProducts,
      bundleData: bundleData,
      contactData: contactData,
      mdxSource: mdxSource,
      blogs: blog,
      premiumTemplates: premiumTemplates,
      hugoThemes: hugoThemes,
      freeTemplates: freeTemplates,
      hugoBundle: hugoBundle,
      bootstrapBundle: bootstrapBundle,
      licensePage: licensePage,
      featuresData: featuresData,
      allBlogs: allBlogs,
      allDownloadData: allDownloadData,
    },
    revalidate: 1,
  };
};
