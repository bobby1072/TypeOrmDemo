export type OutcomeBase = {
  isSuccess: boolean;
  exceptionMessage?: string | null;
};

export type Outcome<T> = OutcomeBase & {
  data?: T | null;
};
