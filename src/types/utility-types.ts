//!nonstrict
//!optimize 2

export type RemoveFunctions<T extends object> = {
	[K in keyof T]: T[K] extends Callback ? never : T[K];
};
export type NonFunctionKeys<T extends object> = {
	[K in keyof T]: T[K] extends Callback ? never : K;
}[keyof T];
export type OnlyNonFunctions<T extends object> = Pick<T, NonFunctionKeys<T>>;
