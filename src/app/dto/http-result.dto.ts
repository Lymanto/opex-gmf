export interface HttpResult<T> {
  data: T[];
  meta: any | null;
  time: string;
}
