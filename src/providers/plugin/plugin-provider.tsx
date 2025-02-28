//!nonstrict
//!optimize 2

import React, { useCallback, useEffect, useMemo, useRef } from "@rbxts/react";
import { HttpService } from "@rbxts/services";
import PluginContext from "contexts/plugin/plugin-context";

interface IconStackEntry {
	readonly icon: string;
	readonly id: string;
}

export interface PluginProviderProperties extends React.PropsWithChildren {
	readonly plugin: Plugin;
}

export function PluginProviderNoMemo({ children, plugin }: PluginProviderProperties) {
	const iconStack = useRef(new Array<IconStackEntry>());
	const updateMouseIcon = useCallback(() => {
		const current = iconStack.current;
		const top = current[current.size() - 1];
		plugin.GetMouse().Icon = top?.icon ?? "";
	}, [plugin]);

	const pushMouseIcon = useCallback(
		(icon: string) => {
			const id = HttpService.GenerateGUID(false);
			iconStack.current.push({ icon, id });
			updateMouseIcon();
			return id;
		},
		[updateMouseIcon],
	);
	const popMouseIcon = useCallback(
		(id: string) => {
			const current = iconStack.current;
			for (const index of $range(current.size() - 1, 0, -1))
				if (current[index].id === id) iconStack.current.remove(index);

			updateMouseIcon();
		},
		[updateMouseIcon],
	);

	function cleanupEffect() {
		const current = iconStack.current;
		return () => {
			current.clear();
			plugin.GetMouse().Icon = "";
		};
	}
	useEffect(cleanupEffect, [plugin]);

	const value = useMemo(() => ({ plugin, popMouseIcon, pushMouseIcon }), [plugin, popMouseIcon, pushMouseIcon]);
	return <PluginContext.Provider value={value}>{children}</PluginContext.Provider>;
}

export const PluginProvider = React.memo(PluginProviderNoMemo);
PluginProvider.displayName = "PluginProvider";
export default PluginProvider;
