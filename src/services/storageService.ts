export default interface IStorageService {
  localStorage: Storage;
  key: string;
  setData(items: []): Promise<void>;
  getData<T>(): Promise<T[]>;
  clearStorage(): Promise<void>;
}

export default class StorageService implements IStorageService {
  constructor(storage: Storage, key: string) {
    this.localStorage = storage;
    this.key = key;
  }

  setData<T>(items: T[]) {
    return new Promise(() => {
      setTimeout(() => {
        this.localStorage.setItem(this.key, JSON.stringify(items));
      }, 250);
    });
  }

  getData<T>(): Promise<T[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = this.localStorage.getItem(this.key);
        console.log(items);
        resolve(items ? JSON.parse(items) : []);
      }, 250);
    });
  }

  clearStorage() {
    return new Promise(() => {
      setTimeout(() => {
        this.localStorage.clear();
      }, 250);
    });
  }
}
