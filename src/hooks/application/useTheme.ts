// hooks/useTheme.ts
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { DefaultTheme } from "../../theme";

const useTheme = (): typeof DefaultTheme => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
