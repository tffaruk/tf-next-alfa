/* eslint-disable react/no-unescaped-entities */
import { strip } from "@/lib/utils";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";
import { ContactForm } from "./ContactForm";
import Layout from "./Layouts/Layout";

const Contact = ({ contactData: { frontmatter, content } }) => {
  const { title, meta_title, image, description, noindex, sidebar } =
    frontmatter;

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
          <div className="row justify-content-center mt-5 pt-4">
            <div className="col-xl-7 col-lg-8">
              <div
                className={`${common.shadow} ${common.contactForm} py-5 px-sm-5 px-3 rounded-3`}
              >
                <div
                  className={`${common.content}`}
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(content),
                  }}
                ></div>
                <ContactForm />
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 mt-5 mt-lg-0">
              {sidebar.map((widget, i) => (
                <div
                  className={`${common.shadow} rounded-3 p-4 text-center mb-4`}
                  key={`widget-${i}`}
                >
                  <Image
                    src={widget.icon}
                    alt={widget.title}
                    width={60}
                    height={60}
                  />
                  <h4 className="mt-2">{widget.title}</h4>
                  <p className="p-3 mb-1">{widget.content}</p>
                  <Link href={widget.button.link}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      {widget.button.label}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
