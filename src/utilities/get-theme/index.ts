//!nonstrict
//!optimize 2

import { camelCase } from "utilities/primitives/string-utilities";
import BaseTheme from "./base-theme";

export type StudioStyleGuideColors = Uncapitalize<Enum.StudioStyleGuideColor["Name"]>;
export type StudioStyleGuideModifiers = Uncapitalize<Enum.StudioStyleGuideModifier["Name"]>;

export type ColorData = { [key in StudioStyleGuideModifiers]: Color3 };
export type ThemeName = "Dark" | "Light";
export type Theme = {
	themeName: ThemeName;
} & { [key in StudioStyleGuideColors]: ColorData } & typeof BaseTheme;

const STUDIO_STYLE_GUIDE_COLORS = Enum.StudioStyleGuideColor.GetEnumItems();
const STUDIO_STYLE_GUIDE_MODIFIERS = Enum.StudioStyleGuideModifier.GetEnumItems();
const THEME_CACHE = new Map<ThemeName, Theme>();

function toThemeName(themeName: string): ThemeName {
	return themeName as ThemeName;
}

export default function getTheme(studioTheme: StudioTheme): Readonly<Theme> {
	const themeName = toThemeName(studioTheme.Name);
	const cached = THEME_CACHE.get(themeName);
	if (cached) return cached;

	const theme = table.clone(BaseTheme) as Theme;
	theme.themeName = themeName;

	for (const studioStyleGuideColor of STUDIO_STYLE_GUIDE_COLORS) {
		const colorData = {} as ColorData;
		for (const studioStyleGuideModifier of STUDIO_STYLE_GUIDE_MODIFIERS)
			colorData[camelCase(studioStyleGuideModifier.Name)] = studioTheme.GetColor(
				studioStyleGuideColor,
				studioStyleGuideModifier,
			);

		theme[camelCase(studioStyleGuideColor.Name)] = table.freeze(colorData);
	}

	const frozenTheme = table.freeze(theme);
	THEME_CACHE.set(themeName, frozenTheme);
	return frozenTheme;
}
