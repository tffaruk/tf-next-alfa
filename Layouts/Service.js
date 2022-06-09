import { strip } from "@/lib/utils";
import Layout from "components/Layouts/Layout";
import SerrviceProcess from "components/Service/SerrviceProcess";
import ServiceBanner from "components/Service/ServiceBanner";
import ServiceContact from "components/Service/ServiceContact";
import ServiceFeatures from "components/Service/ServiceFeatures";
import ServicePricing from "components/Service/ServicePricing";
import ServiceShowcase from "components/Service/ServiceShowcase";

const Service = ({
  serviceData: { frontmatter, content },
  testimonial: { serviceTitle, user },
  showcase,
}) => {
  const {
    banner,
    features,
    process,
    pricing,
    description,
    image,
    title,
    meta_title,
    noindex,
  } = frontmatter;
  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description ? description : strip(content.slice(0, 120))}
      image={image}
      noindex={noindex}
    >
      <ServiceBanner serviceBanner={banner} />
      <ServiceFeatures features={features} />
      <SerrviceProcess process={process} />
      <ServicePricing pricing={pricing} />
      {/* <Testimonial user={user} serviceTitle={serviceTitle} /> */}
      <ServiceShowcase showcase={showcase} />
      <ServiceContact />
    </Layout>
  );
};

export default Service;
