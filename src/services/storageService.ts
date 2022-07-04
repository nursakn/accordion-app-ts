export default interface IStorageService {
  localStorage: Storage;
  qnaItems: string;
  setStorage(items: []): Promise<void>;
  getStorage<T>(): Promise<T[]>;
  clearStorage(): Promise<void>;
}

export default class StorageService implements IStorageService {
  constructor(storage: Storage, key: string) {
    this.localStorage = storage;
    this.qnaItems = key;
  }

  setStorage<T>(items: T[]) {
    return new Promise(() => {
      setTimeout(() => {
        this.localStorage.setItem(this.qnaItems, JSON.stringify(items));
      }, 250);
    });
  }

  getStorage<T>(): Promise<T[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = this.localStorage.getItem(this.qnaItems);
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
