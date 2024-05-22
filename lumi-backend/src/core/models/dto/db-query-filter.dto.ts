type DefaultRecord<T, R = any> = Partial<{ [K in keyof T]: R }>;

type OrderTypes = "asc" | "desc";

export type Where<T> =
  | DefaultRecord<T>
  | { OR: Array<Where<T>> }
  | { AND: Array<Where<T>> };

type FilteredKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
};

type ValidOrderKeys<T> = FilteredKeys<T, string | number | boolean | Date>;

type FilteredOrderBy<T> = Pick<
  DefaultRecord<T, OrderTypes>,
  ValidOrderKeys<T>[keyof T]
>;

export interface DbQueryFilter<T = { [key: string]: unknown }> {
  select?: DefaultRecord<T, boolean | any>;
  include?: DefaultRecord<T, boolean>;
  where?: Where<T>;
  skip?: number;
  take?: number;
  orderBy?: FilteredOrderBy<T>;
}