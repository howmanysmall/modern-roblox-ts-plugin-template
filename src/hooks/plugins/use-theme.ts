//!nonstrict
//!optimize 2

import { useContext } from "@rbxts/react";
import ThemeContext, { type ReadonlyTheme } from "contexts/plugin/theme-context";
import { Error } from "@rbxts/luau-polyfill";

export default function useTheme(): ReadonlyTheme {
	const theme = useContext(ThemeContext);
	if (theme === undefined) {
		const exception = new Error("useTheme must be used within a <ThemeProvider />");
		exception.name = "MissingThemeContextError";
		Error.captureStackTrace(exception, useTheme);
		throw exception;
	}

	return theme;
}

export type {
	ColorData,
	StudioStyleGuideColors,
	StudioStyleGuideModifiers,
	Theme,
	ThemeName,
} from "utilities/get-theme";
