import { createContext, useContext } from "react";
import products from "../frontmatter/products.json";

const AppContext = createContext();
export const AppWrapper = ({ children }) => {
  const allCategories = products.map((p) => p.categories);

  let categories = [];
  for (let i = 0; i < allCategories.length; i++) {
    const categoryArray = allCategories[i];
    for (let j = 0; j < categoryArray.length; j++) {
      categories.push(categoryArray[j]);
    }
  }
  const category = [...new Set(categories)];
  let state = {
    products,
    category,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
