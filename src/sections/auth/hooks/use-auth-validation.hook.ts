type Rule = {
  title: string;
  isValid: (value: string) => boolean;
};

export type ParsedRule = Omit<Rule, "isValid"> & {
  isValid: boolean;
};

const rules: Rule[] = [
  {
    title: "At least 4 characters",
    isValid: (value: string) => value.length >= 4,
  },
  {
    title: "Contains a number",
    isValid: (value: string) => /[0-9]/.test(value),
  },
];

export function useAuthValidationHook(password: string): ParsedRule[] {
  return rules.map((rule) => ({
    ...rule,
    isValid: rule.isValid(password),
  }));
}
