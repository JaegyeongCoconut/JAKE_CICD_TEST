export class PathStorage {
  constructor(protected _key: string) {}

  get key() {
    return this._key;
  }

  getPath(defaultPath: string) {
    return globalThis?.sessionStorage.getItem(this.key) ?? defaultPath;
  }

  setPath(path: string) {
    globalThis?.sessionStorage.setItem(this._key, path);
  }

  clearPath() {
    globalThis?.sessionStorage.removeItem(this.key);
  }
}
