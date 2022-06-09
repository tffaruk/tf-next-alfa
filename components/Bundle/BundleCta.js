import Link from "next/link";
import common from "styles/common.module.scss";

const BundleCta = ({
  call_to_action: { title, description },
  button: { label, link },
}) => {
  return (
    <section
      className={`pt-0 ${common.sectionSm} text-center ${common.bundleBanner}`}
    >
      <div className={`container ${common.container}`}>
        <div className="row">
          <div className="mx-auto col-xl-8 col-lg-10">
            <h2>{title}</h2>
            <p className="mt-4">{description}</p>

            <div className="mt-5">
              <Link href={link}>
                <a className="btn btn-bundle">{label}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleCta;
