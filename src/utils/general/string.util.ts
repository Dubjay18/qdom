import * as randomstring from "randomstring";

export const boolStringIsEmpty = (
  data?: string
): data is string => (data ?? "").length === 0;

export const cleanStr = (
  str: any,
  filters: string[]
): any => {
  if (typeof str !== "string") {
    return str;
  }

  filters.forEach((filter) => {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regx = new RegExp(filter, "gi");
    str = str.replace(regx, "****");
  });

  return str;
};

export const cleanObj = (
  obj: any,
  filters: string[]
): any => {
  if ("object" !== typeof obj) {
    return obj;
  }

  let _obj: any = {};

  for (let [key, value] of Object.entries(obj)) {
    // eslint-disable-next-line security/detect-object-injection
    _obj[key] =
      "object" === typeof value
        ? cleanObj(value, filters)
        : cleanStr(value, filters);
  }

  return _obj;
};

export function generateOtp(): string {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}
