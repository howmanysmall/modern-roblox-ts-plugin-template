//!nonstrict
//!optimize 2

import { createContext } from "@rbxts/react";

export interface PluginData {
	readonly plugin: Plugin;
	readonly popMouseIcon: (id: string) => void;
	readonly pushMouseIcon: (icon: string) => string;
}

export const PluginContext = createContext<PluginData>(undefined!);
PluginContext.displayName = "PluginContext";
export default PluginContext;
