import type { Binding } from "@rbxts/react";

import Roact from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

type React = typeof Roact;
// biome-ignore lint/suspicious/noRedeclare: 🤓🤓🤓🤓
type ReactRoblox = typeof ReactRoblox;

interface StoryProperties<T extends object> {
	readonly controls: T;
}

interface BaseFunctionStory {
	readonly name?: string;
	readonly renderer?: "deferred" | "legacy";
	readonly summary?: string;
}

interface BaseStory extends BaseFunctionStory {
	readonly react: React;
	readonly reactRoblox: ReactRoblox;
}

declare global {
	// React
	type BindingOrValue<T> = Binding<T> | T;
	type OnActivated<T extends GuiButton = GuiButton> = (rbx: T, inputObject: InputObject, count: number) => void;
	type OnInput<T extends GuiObject = GuiObject> = (rbx: T, inputObject: InputObject) => void;

	type PluginSettingValue = Vector3 | boolean | number | object | string | undefined;

	interface BaseProperties {
		readonly anchorPoint?: BindingOrValue<Vector2>;
		readonly disabled?: boolean;
		readonly fontFace?: Font;
		readonly layoutOrder?: BindingOrValue<number>;
		readonly position?: BindingOrValue<UDim2>;
		readonly richText?: boolean;
		readonly size?: UDim2;
		readonly zIndex?: BindingOrValue<number>;
	}
}
