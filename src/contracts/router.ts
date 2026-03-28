export interface RouterAdapter {
  push(path: string): void;
  replace(path: string): void;
  pathname: string;
}
