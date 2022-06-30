import { IQnaItem } from "@/infrastructure/QNAService/types";

export default interface ILocalStorage {
  localStorage: Storage;
  qnaItems: string;
  setStorage(items: IQnaItem[]): Promise<void>;
  getQnaItems(): Promise<IQnaItem[]>;
  clearStorage(): Promise<void>;
}

export default class MyLocalStorage implements ILocalStorage {
  constructor(storage: Storage) {
    this.localStorage = storage;
    this.qnaItems = "QNAItems";
  }

  setStorage(items: IQnaItem[]) {
    return new Promise(() => {
      setTimeout(() => {
        this.localStorage.setItem(this.qnaItems, JSON.stringify(items));
      }, 1000);
    });
  }

  getQnaItems(): Promise<IQnaItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = this.localStorage.getItem(this.qnaItems);
        console.log(items);
        resolve(items ? JSON.parse(items) : []);
      }, 1000);
    });
  }

  clearStorage() {
    return new Promise(() => {
      setTimeout(() => {
        this.localStorage.clear();
      }, 1000);
    });
  }
}
