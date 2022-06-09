import { A } from "components/MdxComponents";
import { MDXRemote } from "next-mdx-remote";
import { YouTubeLite } from "react-youtube-lite";
import styles from "styles/singleDownload.module.scss";
import SyntaxHighlighter from "react-syntax-highlighter";

const components = { A, YouTubeLite, SyntaxHighlighter };

const ProductDescription = ({ mdxSource }) => {
  return (
    <div className={`${styles.productDescription} mt-5`}>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
};

export default ProductDescription;
