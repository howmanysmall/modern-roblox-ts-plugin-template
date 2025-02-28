//!native
//!nonstrict
//!optimize 2

import React, { StrictMode, useCallback } from "@rbxts/react";
import { ErrorBoundary } from "packages/react-error-boundary";
import PluginProvider from "providers/plugin/plugin-provider";
import FallbackResetBoundary from "./fallback-reset-boundary";
import Log from "@rbxts/rbxts-sleitnick-log";
import ThemeProvider from "providers/plugin/theme-provider";
import ContextStack from "@rbxts/context-stack";

export type ImperativeApi = {
	args: Array<unknown>;
	reason: "imperative-api";
};
export type Keys = {
	next?: Array<unknown>;
	prev?: Array<unknown>;
	reason: "keys";
};
export type ErrorBoundaryDetails = ImperativeApi | Keys;

const logger = new Log();

export interface AppProperties extends React.PropsWithChildren {
	/**
	 * The reference to plugin, since we can't get it in ModuleScripts (like why?).
	 */
	readonly plugin: Plugin;

	readonly resetState?: (details: ErrorBoundaryDetails) => void;

	/**
	 * Whether or not to use strict mode.
	 *
	 * This should really be off in production, as
	 * it does double renders.
	 */
	readonly useStrictMode?: boolean;
}

export function AppNoMemo({ children, plugin, resetState, useStrictMode }: AppProperties): React.Element {
	const onReset = useCallback(
		(details: ErrorBoundaryDetails) => {
			logger.Info("[ReactErrorBoundary]: called reset.", details);
			resetState?.(details);
		},
		[resetState],
	);

	const child = (
		<ErrorBoundary FallbackComponent={FallbackResetBoundary} key="ErrorBoundary" onError={warn} onReset={onReset}>
			<ContextStack
				key="ContextStack"
				providers={[
					<PluginProvider key="PluginProvider" plugin={plugin} />,
					<ThemeProvider key="ThemeProvider" />,
				]}
			>
				{children}
			</ContextStack>
		</ErrorBoundary>
	);

	return useStrictMode ? <StrictMode>{child}</StrictMode> : child;
}

export const App = React.memo(AppNoMemo);
App.displayName = "App";
export default App;
