import { string } from "prop-types";
import { createContext } from "react";

export const SelectedContextContinent = createContext<string>('eu');

export const ThemeContext = createContext('light');
