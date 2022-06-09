import { getAllData } from "./pages";

export const getAllCategory = (type) => {
  const allProducts = getAllData(type);
  const allCategories = allProducts.posts.map((p) => p.category);
  let categories = [];
  for (let i = 0; i < allCategories.length; i++) {
    const categoryArray = allCategories[i];
    for (let j = 0; j < categoryArray.length; j++) {
      categories.push(categoryArray[j]);
    }
  }
  const category = [...new Set(categories)];
  return category;
};
