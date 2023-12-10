export const boolStringIsEmpty = (data?: string): data is string =>
  (data ?? "").length === 0;