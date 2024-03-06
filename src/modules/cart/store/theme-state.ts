import { makeVar } from "@apollo/client";

export const themeState = makeVar(localStorage.theme == "dark" ? false : true);

export const toggleTheme = () => {
  themeState(!themeState());
};
