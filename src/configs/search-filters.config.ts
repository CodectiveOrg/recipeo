export const searchFilterKeys = ["phrase", "tag", "maxDuration"] as const;

export type SearchFilterKey = (typeof searchFilterKeys)[number];

export type SearchFilter<T extends SearchFilterKey> = {
  key: T;
  label: string;
  valueSuffix?: string;
  defaultValue: T extends "maxDuration" ? number : string;
};

export const phraseFilter: SearchFilter<"phrase"> = {
  key: "phrase",
  label: "Phrase",
  defaultValue: "",
};

export const tagFilter: SearchFilter<"tag"> = {
  key: "tag",
  label: "Tag",
  defaultValue: "All",
};

export const maxDurationFilter: SearchFilter<"maxDuration"> = {
  key: "maxDuration",
  label: "Max Duration",
  valueSuffix: " Min",
  defaultValue: 60,
};

export const searchFilters = [
  phraseFilter,
  tagFilter,
  maxDurationFilter,
] as const;
