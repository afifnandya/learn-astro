export function isString(val: string): string {
  return typeof val === "string" ? val : "";
}

export function isNumber(val: number): number {
  return typeof val === "number" ? val : 0;
}
export function isBoolean(val: boolean): boolean {
  return typeof val === "boolean" ? val : false;
}
export function isArray<Type>(val: Type[]): Type[] {
  return Array.isArray(val) ? val : [];
}
export function isObject(val: any): any {
  return typeof val === "object" ? val : {};
}
