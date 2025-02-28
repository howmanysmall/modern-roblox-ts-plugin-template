//!nonstrict
//!optimize 2

import React, { useState } from "@rbxts/react";
import ThemeContext from "contexts/plugin/theme-context";
import useEventConnection from "hooks/utilities/use-event-connection";
import getTheme from "utilities/get-theme";

const studio = settings().Studio as {
	Theme: StudioTheme;
} & Studio;

export function ThemeProviderNoMemo({ children }: React.PropsWithChildren): React.Element {
	const [theme, setTheme] = useState(getTheme(studio.Theme));
	useEventConnection(studio.ThemeChanged, () => setTheme(getTheme(studio.Theme)), []);
	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const ThemeProvider = React.memo(ThemeProviderNoMemo);
ThemeProvider.displayName = "ThemeProvider";
export default ThemeProvider;

export type {
	ColorData,
	StudioStyleGuideColors,
	StudioStyleGuideModifiers,
	Theme,
	ThemeName,
} from "utilities/get-theme";
