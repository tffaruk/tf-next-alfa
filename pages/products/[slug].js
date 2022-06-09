import { getDownloadData, getSingleDownlodData } from "@/lib/api";
import { getAllData, getChangelogData } from "@/lib/pages";
import { similerProduct, strip } from "@/lib/utils";
import Layout from "components/Layouts/Layout";
import Products from "components/Products";
import Iframe from "components/ProductSinglePage/Iframe";
import ProductCard from "components/ProductSinglePage/ProductCard";
import ProductDescription from "components/ProductSinglePage/ProductDescription";
import ThemeInfo from "components/ProductSinglePage/ThemeInfo";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rehypeSlug from "rehype-slug";
import common from "styles/common.module.scss";
import styles from "styles/singleDownload.module.scss";

const SinglePage = ({
  slug,
  singleProduct,
  allProducts: { posts },
  changelogData,
  mdxSource,
  singleDownloadData,
  allDownloadData,
}) => {
  const [showChangelog, setShowChangelog] = useState(false);
  const [downloadData, setDownloadData] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (router.query.changelog == "show") {
      setShowChangelog(true);
    }
  }, [router.query.changelog]);
  const { frontmatter } = singleProduct[0];

  const { title, meta_title, description, image, noindex, type, price } =
    frontmatter;

  // similer products
  const similer_Products = similerProduct(
    posts,
    singleProduct,
    slug,
    type,
    price
  );

  const changelog = changelogData.filter((c) => c.slug == slug);

  // downloadData
  const { download } =
    singleProduct[0].frontmatter.price == 0 && singleDownloadData[0];

  useEffect(() => {
    setDownloadData(download);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = () => {
    setDownloadData((previousValue) => previousValue + 1);
    fetch(`https://salty-citadel-03660.herokuapp.com/download/${title}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ download: downloadData + 1 }),
    });
  };

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={
        description
          ? description
          : strip(singleProduct[0].content.slice(0, 120))
      }
      image={image}
      noindex={noindex}
    >
      <section className={styles.productPageHeader}>
        <div className={`${common.container} container`}>
          <div className="row pb-5">
            <div className="col-lg-8">
              <Iframe singleProduct={singleProduct} />
              <div className="d-block d-lg-none">
                <ProductCard
                  singleProduct={singleProduct}
                  productLists={posts}
                  handleUpdate={handleUpdate}
                />
              </div>
              {singleProduct[0].content && (
                <ProductDescription
                  singleProduct={singleProduct}
                  mdxSource={mdxSource}
                />
              )}
            </div>
            <aside className={`col-lg-4 mt-5 mt-lg-0`}>
              <div className="ps-0 ps-xl-4">
                <div className={`${styles.productPageSidebar}`}>
                  <div className="d-none d-lg-block">
                    <ProductCard
                      singleProduct={singleProduct}
                      productLists={posts}
                      handleUpdate={handleUpdate}
                    />
                  </div>
                  <ThemeInfo
                    singleProduct={singleProduct}
                    changelogData={changelog}
                    showChangelog={showChangelog}
                    downloadData={downloadData}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${common.section} pt-0`}>
        <div className={`${common.container} container`}>
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className={`${common.sectionTitle} mt-5 pb-3 `}>
                <div className={`${common.textCenter} text-center`}>
                  <h2 className={common.title}>
                    Related {type == "hugo" ? "Themes" : "Templates"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <Products
            products={similer_Products.slice(0, 3)}
            weight="true"
            allDownloadData={allDownloadData}
          />
        </div>
      </section>
    </Layout>
  );
};

export default SinglePage;
export const getStaticPaths = () => {
  const allProducts = getAllData("content/products", false);
  const { posts } = allProducts;

  const paths = posts.map((slug) => ({
    params: {
      slug: slug.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const allProducts = getAllData("content/products", false);
  const singleProduct = allProducts.posts.filter((p) => p.slug == slug);
  const singleDownloadData = await getSingleDownlodData(
    singleProduct[0].frontmatter.price == 0 &&
      singleProduct[0].frontmatter.title
  );

  const { content } = singleProduct[0];
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  };
  const mdxSource = await serialize(content, options);
  const changelogData = getChangelogData();
  const allDownloadData = await getDownloadData();

  return {
    props: {
      singleProduct: singleProduct,
      slug: slug,
      allProducts: allProducts,
      changelogData: changelogData,
      allDownloadData: allDownloadData,
      mdxSource: mdxSource,
      singleDownloadData: singleDownloadData,
    },
    revalidate: 1,
  };
};
