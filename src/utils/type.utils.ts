export type Combine<T, K> = Omit<T, keyof K> & K;
