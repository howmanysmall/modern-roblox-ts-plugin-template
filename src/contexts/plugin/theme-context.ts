//!nonstrict
//!optimize 2

import { createContext } from "@rbxts/react";
import type { Theme } from "utilities/get-theme";

export type ReadonlyTheme = Readonly<Theme>;

export const ThemeContext = createContext<ReadonlyTheme>(undefined!);
ThemeContext.displayName = "ThemeContext";
export default ThemeContext;

export type {
	ColorData,
	StudioStyleGuideColors,
	StudioStyleGuideModifiers,
	Theme,
	ThemeName,
} from "utilities/get-theme";
