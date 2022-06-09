/* eslint-disable react/no-unescaped-entities */
import Layout from "components/Layouts/Layout";
import { marked } from "marked";
import common from "styles/common.module.scss";

export const License = ({ licensePage }) => {
  const {
    title,
    description,
    meta_title,
    image,
    noindex,
    products,
    users,
    usages,
    allow_list,
    not_allow_list,
  } = licensePage[0].frontmatter;

  function licenseFilter() {
    var user = document.getElementById("user").value;
    var product = document.getElementById("product").value;
    var usages = document.getElementById("usages").value;
    var className = returnClass(user, product, usages);
    var list = document.querySelectorAll(".license-item");
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.remove("d-block");
    }
    var newList = document.querySelectorAll("." + className);
    for (var i = 0; i < newList.length; ++i) {
      newList[i].classList.add("d-block");
    }
  }

  function returnClass(user, product, usages) {
    return (
      user.charAt(0).toString() +
      product.charAt(0).toString() +
      usages.charAt(0).toString()
    );
  }

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
      noindex={noindex}
    >
      <section className={common.wrapper}>
        <div className={common.pageWrapper}>
          <div className={`${common.container} container`}>
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className={common.globalTitle}>
                  <h1>{title}</h1>
                </div>
                <div className="col-12 mb-5">
                  <div
                    className={`rounded-3 shadow p-5 text-center ${common.licenseGenerator}`}
                  >
                    <p className={common.h2}>
                      I’m A
                      <select
                        id="user"
                        onChange={licenseFilter}
                        className={`${common.customSelect}`}
                      >
                        {users.map((item, i) => (
                          <option value={item} key={`item-${i}`}>
                            {item}
                          </option>
                        ))}
                      </select>
                      I Want To Use
                      <select
                        id="product"
                        onChange={licenseFilter}
                        className={`${common.customSelect}`}
                      >
                        {products.map((item, i) => (
                          <option value={item} key={`item-${i}`}>
                            {item}
                          </option>
                        ))}
                      </select>
                      For My
                      <select
                        id="usages"
                        onChange={licenseFilter}
                        className={`${common.customSelect}`}
                      >
                        {usages.map((item, i) => (
                          <option value={item} key={`item-${i}`}>
                            {item}
                          </option>
                        ))}
                      </select>
                      Project
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="rounded-3 shadow p-4">
                      <p className="text-center h4">Yes, You are allowed</p>
                      <ul
                        className={`list-unstyled ${common.listBordered} ${common.listCheck}`}
                      >
                        {allow_list.map((item, i) => (
                          <li
                            key={`item-${i}`}
                            dangerouslySetInnerHTML={{
                              __html: marked.parseInline(item.list),
                            }}
                            className={`${item.classes} ${common.licenseItem} license-item`}
                          ></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="rounded-3 shadow p-4">
                      <p className="text-center h4">No, You are not allowed</p>
                      <ul
                        className={`list-unstyled ${common.listBordered} ${common.listUncheck}`}
                      >
                        {not_allow_list.map((item, i) => (
                          <li
                            key={`item-${i}`}
                            dangerouslySetInnerHTML={{
                              __html: marked.parseInline(item.list),
                            }}
                            className={`${item.classes} ${common.licenseItem} license-item`}
                          ></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
