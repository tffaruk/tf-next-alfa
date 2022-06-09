// sort product by weight
export const sortByWeight = (array) => {
  const post = array.sort(
    (a, b) => a.frontmatter.weight - b.frontmatter.weight
  );
  return post;
};

// date sorting
let options = { year: "numeric", month: "long", day: "numeric" };
const currentDate = new Date();
export const dateFormat = (date) => {
  const dateFormat =
    currentDate.getFullYear() > new Date(date).getFullYear() ? (
      new Date(date).toLocaleDateString("en-US", options)
    ) : currentDate.getMonth() > new Date(date).getMonth() ? (
      new Date(date).toLocaleDateString("en-US", options)
    ) : currentDate.getDate() == new Date(date).getDate() ? (
      <span>Today</span>
    ) : currentDate.getDate() - new Date(date).getDate() <= 3 ? (
      <span>{currentDate.getDate() - new Date(date).getDate()} day ago </span>
    ) : (
      new Date(date).toLocaleDateString("en-US", options)
    );
  return dateFormat;
};

export const sortByDate = (array) => {
  const post = array.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
  return post;
};

// similer products
export const similerProduct = (array, singleArray, slug, type) => {
  const categories = singleArray[0].category;
  const keywords = type && singleArray[0].frontmatter.keywords[0];

  const filterProducts = array.filter((array) =>
    categories.find((c) => array.category.includes(c))
  );

  const filterByKeywords =
    type &&
    filterProducts.filter((data) => data.frontmatter.keywords == keywords);

  const filterBySlug =
    type != "hugo"
      ? filterProducts.filter((product) => product.slug != slug)
      : filterByKeywords.filter((product) => product.slug != slug);

  const remainProducts =
    type != "hugo"
      ? array.filter((el) => !filterProducts.includes(el))
      : filterProducts
          .filter((el) => !filterByKeywords.includes(el))
          .filter((data) => data.slug != slug);

  const filterByType = remainProducts.filter(
    (product) => product.frontmatter.type === type
  );

  const sortByPrice = filterBySlug.sort(
    (a, b) => b.frontmatter.price - a.frontmatter.price
  );

  const similerProducts = [
    ...sortByDate(type ? sortByPrice : filterBySlug),
    ...sortByDate(type ? filterByType : remainProducts),
  ];

  return similerProducts;
};

// content reading
export const readingTime = (content) => {
  const WPS = 275 / 60;

  let images = 0;
  const regex = /\w/;

  let words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  let imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  if (minutes < 10) {
    if (minutes < 2) {
      return "0" + minutes + ` Min read`;
    } else {
      return "0" + minutes + ` Mins read`;
    }
  } else {
    return minutes + ` Mins read`;
  }
};

// strip function
export const strip = (html) => {
  var one = html.replace(/<\/?[^>]+(>|$)/gm, "");
  var two = one.replace(/[\r\n]\s*[\r\n]/gm, "");
  return two;
};

// filter license list
export const filterLicenseList = (array) => {
  const defaultListByUserType = array.filter((item) =>
    item.parameter.find((data) => data.user.includes("developer" || "designer"))
  );

  const defaultListByUseType = defaultListByUserType.filter((item) =>
    item.parameter.find((data) => data.use.includes("personal"))
  );

  const defaultListByTemplatesType = defaultListByUseType.filter((item) =>
    item.parameter.find((data) => data.type.includes("free template"))
  );
  return defaultListByTemplatesType;
};

export const sort_category = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    const i = new_index - arr.length + 1;
    while (i--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

export const convertJSON = (data) => {
  const stringify = JSON.stringify(data);
  const parse = JSON.parse(stringify);
  return parse;
};
