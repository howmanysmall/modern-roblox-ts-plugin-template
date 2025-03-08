//!nonstrict
//!optimize 2

import type { Storybook } from "@rbxts/ui-labs";

export = {
	groupRoots: true,
	name: "Plugin",
	storyRoots: [script.Parent!.FindFirstChild("__stories__")!],
} satisfies Storybook;
