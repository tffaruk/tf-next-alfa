import Image from "next/image";
import common from "styles/common.module.scss";

const Mockup = ({ src, alt, height, width }) => {
  return (
    <div className={`${common.browserMockup} ${common.imageCover}`}>
      <Image
        src={src}
        alt={alt}
        height={height ? height : "600"}
        width={width ? width : "900"}
        priority
      />
    </div>
  );
};

export default Mockup;
