//!nonstrict
//!optimize 2

import { useEffect, useMemo } from "@rbxts/react";
import connect, { type InferSignalParameters, type SignalLike } from "utilities/connect";

export default function useEventConnection<T extends SignalLike>(
	event: T,
	callback: (...signalArguments: InferSignalParameters<T>) => void,
	dependencies: ReadonlyArray<unknown>,
): void {
	// eslint-disable-next-line react-roblox-hooks/exhaustive-deps
	const cachedCallback = useMemo(() => callback, dependencies);

	function eventEffect() {
		const connection = connect(event, cachedCallback);
		return () => connection.Disconnect();
	}
	useEffect(eventEffect, [event, cachedCallback]);
}
