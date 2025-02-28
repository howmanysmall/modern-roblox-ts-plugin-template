//!nonstrict
//!optimize 2

import type { AnimationConfigs } from "@rbxts/react-spring";

enum Fonts {
	BuilderMono = "rbxassetid://16658246179",
	BuilderSans = "rbxasset://fonts/families/BuilderSans.json",
	FiraSans = "rbxassetid://12187374954",

	/**
	 * @deprecated
	 */
	Gotham = "rbxasset://fonts/families/GothamSSm.json",
	IBMPlexSans = "rbxassetid://12187364147",
	Montserrat = "rbxassetid://11702779517",
}

export const BaseTheme = {
	fontFaces: {
		bold: new Font(Fonts.BuilderSans, Enum.FontWeight.ExtraBold),
		default: new Font(Fonts.BuilderSans, Enum.FontWeight.Medium),
		light: new Font(Fonts.BuilderSans),
		medium: new Font(Fonts.BuilderSans, Enum.FontWeight.SemiBold),
		semiBold: new Font(Fonts.BuilderSans, Enum.FontWeight.Bold),

		// eslint-disable-next-line perfectionist/sort-objects
		monoBold: new Font(Fonts.BuilderMono, Enum.FontWeight.Bold),
		monoDefault: new Font(Fonts.BuilderMono, Enum.FontWeight.Regular),

		sourceBold: new Font(Fonts.IBMPlexSans, Enum.FontWeight.Bold),
		sourceDefault: new Font(Fonts.IBMPlexSans),
		sourceMedium: new Font(Fonts.IBMPlexSans, Enum.FontWeight.Medium),
	},

	springConfigs: {
		noOvershoot117ms: {
			friction: 12,
			mass: 0.1,
			tension: 500,
		} as AnimationConfigs,
	},

	textSizes: {
		buttonHeight: 24,
		default: 14,
		dropdownHeight: 20,
		dropdownRowHeight: 16,
		header: 18,
		inputHeight: 22,
		progressBarHeight: 14,
		radioButton: 16,
		sliderHeight: 20,
		subtitle: 20,
		title: 24,
		toggleHeight: 20,
	},
};

export default BaseTheme;
