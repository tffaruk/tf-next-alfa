import { getDownloadData, getSingleDownlodData } from "@/lib/api";
import { getAllCategory } from "@/lib/category";
import { getAllCategoriesIndex, getAllData } from "@/lib/pages";
import { kebabCase } from "@/lib/slugger";
import Layout from "components/Layouts/Layout";
import Products from "components/Products";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import common from "styles/common.module.scss";

const Category = ({
  products,
  categoriesIndex: { title, description, image, meta_title, noindex },
  allDownloadData,
}) => {
  const filterPostByLength = products.filter((product) => product.length > 0);

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
      noindex={noindex}
    >
      <header className={`${common.downloaCategoryTitle} mb-4`}>
        <div className={`${common.container} container`}>
          <div className="row">
            <div className="col-md-12">
              <h1 className={`${common.pageTitle} text-capitalize h2 mb-0`}>
                {title}
              </h1>
              {description && (
                <div className={`${common.taxonomyDescription} mt-3`}>
                  <p className="mb-0">{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <section className={common.section}>
        <div className={`${common.container} container`}>
          <Products
            products={filterPostByLength[0]}
            allDownloadData={allDownloadData}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Category;

export const getStaticPaths = () => {
  const category = getAllCategory("content/products");

  const paths = category.map((category) => ({
    params: {
      category: kebabCase(category),
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const allFiles = fs.readdirSync(path.join("content/products"));
  const file = allFiles.filter((f) => f.match(/^[a-z]/));
  const posts = file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("content/products", file),
      "utf-8"
    );
    const { data: frontmatter } = matter(metaDataWithFrontMatter);

    const filterByCategory = frontmatter.categories.filter(
      (c) => kebabCase(c) == params.category
    );

    const allProducts = getAllData("content/products", false);
    const { posts } = allProducts;

    const productData = posts.filter((e) => {
      return e.category.some((a) => {
        return filterByCategory.indexOf(a) != -1;
      });
    });
    return productData;
  });

  const product = posts.filter((p) => p.length > 0);

  const category = product[0].map((p) =>
    p.frontmatter.categories.filter((c) => kebabCase(c) == params.category)
  );
  const categoriesIndex = getAllCategoriesIndex(params.category);

  const allDownloadData = await getDownloadData();

  return {
    props: {
      products: posts,
      category: category[0],
      categoriesIndex: categoriesIndex,
      allDownloadData: allDownloadData,
    },
    revalidate: 1,
  };
};
