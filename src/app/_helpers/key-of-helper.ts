export class KeyOf {
  public static getProp<T, K extends keyof T>(obj: T, key: K): any {
    return obj[key];
  }
}
