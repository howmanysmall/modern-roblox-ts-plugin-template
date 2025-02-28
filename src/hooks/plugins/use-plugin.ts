//!nonstrict
//!optimize 2

import { useContext } from "@rbxts/react";
import PluginContext, { type PluginData } from "contexts/plugin/plugin-context";
import { Error } from "@rbxts/luau-polyfill";

export default function usePlugin(): PluginData {
	const plugin = useContext(PluginContext);
	if (plugin === undefined) {
		const exception = new Error("usePlugin must be used within a <PluginProvider>");
		exception.name = "MissingPluginContextError";
		Error.captureStackTrace(exception, usePlugin);
		throw exception;
	}

	return plugin;
}
