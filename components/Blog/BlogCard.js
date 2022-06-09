import { readingTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/blog.module.scss";

const BlogCard = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog, i) => (
        <div
          className={`
            ${
              blogs.length == 4 &&
              `col-xl-3 ${i == 3 && "d-block d-lg-none d-xl-block"}`
            } col-lg-4 col-md-6
          `}
          key={`blog-${i}`}
        >
          <div
            className={`card p-0 ${styles.postCard} overflow-hidden border-0 ${styles.postCardSm}`}
          >
            <Link href={`/${blog.slug}`}>
              <a className="card-img-top lh-0">
                {blog.frontmatter.image && (
                  <div className={styles.img}>
                    <Image
                      width="510"
                      height="255"
                      className="rounded-top"
                      src={`${blog.frontmatter.image}`}
                      alt={blog.frontmatter.title}
                      blurDataURL={blog.frontmatter.image}
                    />
                  </div>
                )}
              </a>
            </Link>

            <div className={`card-body p-4 ${styles.cardBody}`}>
              <div className={`${styles.postMeta} mb-2`}>
                By {blog.frontmatter.author}
                <span className="mx-2">|</span>
                {readingTime(blog.content)}
              </div>
              <h2 className={`lh-base ${styles.postTitle}`}>
                <Link href={`/${blog.slug}`}>
                  <a>{blog.frontmatter.title}</a>
                </Link>
              </h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogCard;
