//!native
//!nonstrict
//!optimize 2

namespace StringUtilities {
	export function camelCase<T extends string>(value: T): Uncapitalize<T> {
		return (value.sub(1, 1).lower() + value.sub(2)) as Uncapitalize<T>;
	}

	export function addCommas(number: number | string, separator = ","): string {
		let value = typeIs(number, "number") ? `${number}` : number;
		let index = -1;

		while (index !== 0) [value, index] = value.gsub("^(-?%d+)(%d%d%d)", `%1${separator}%2`);
		return value;
	}

	function isFalsy(value?: unknown): value is false | undefined {
		return value === undefined || value === false;
	}

	function levenshtein(string1: string, string2: string): number {
		if (string1 === string2) return 0;

		const [length1] = utf8.len(string1);
		const [length2] = utf8.len(string2);

		// types are wrong 👎
		if (isFalsy(length1) || isFalsy(length2)) return 0;

		if (length1 === 0) return length2;
		if (length2 === 0) return length1;

		const matrix = new Array<Array<number>>();
		for (const index of $range(-1, length1 - 1)) {
			const array = new Array<number>();
			array[-1] = index + 1;
			matrix[index] = array;
		}

		for (const index of $range(-1, length2 - 1)) matrix[-1][index] = index + 1;

		let index = 0;
		let indexSub1: number;

		for (const [, code1] of utf8.codes(string1)) {
			let jndex = 0;
			let jndexSub1: number;

			for (const [, code2] of utf8.codes(string2)) {
				const cost = code1 === code2 ? 0 : 1;
				indexSub1 = index - 1;
				jndexSub1 = jndex - 1;

				matrix[index][jndex] = math.min(
					matrix[indexSub1][jndex] + 1,
					matrix[index][jndexSub1] + 1,
					matrix[indexSub1][jndexSub1] + cost,
				);

				jndex += 1;
			}

			index += 1;
		}

		return matrix[length1 - 1][length2 - 1];
	}

	const sortResults = (a: { distance: number }, b: { distance: number }): boolean => a.distance < b.distance;
	interface SearchResult {
		readonly distance: number;
		readonly value: string;
	}

	export function fuzzySearch(needle: string, haystack: Array<string>): Array<SearchResult> {
		return haystack
			.map(
				(value): SearchResult => ({
					distance: levenshtein(needle, value),
					value,
				}),
			)
			.sort(sortResults);
	}

	const CHARACTERS =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ".split("");
	const LENGTH = CHARACTERS.size() - 1;

	const randomLibrary = new Random((os.clock() % 1) * 1e7);
	export function randomString(length: number, random = randomLibrary): string {
		const stringBuilder = new Array<string>(length);
		for (const index of $range(0, length - 1)) stringBuilder[index] = CHARACTERS[random.NextInteger(0, LENGTH)];
		return stringBuilder.join("");
	}

	export function uppercaseFirstLetter(value: string): string {
		return value.gsub("^%a", string.upper)[0];
	}
}

export = StringUtilities;
