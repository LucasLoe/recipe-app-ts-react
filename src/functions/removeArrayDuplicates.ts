export default function removeArrayDuplicates<T>(arr1: T[], arr2: T[], objKey: keyof T): T[] {
	function isEqual(obj1: T, obj2: T, objKey: keyof T) {
		return obj1[objKey] === obj2[objKey];
	}

	return arr1.filter((val1) => !arr2.some((val2) => isEqual(val1, val2, objKey)));
}
