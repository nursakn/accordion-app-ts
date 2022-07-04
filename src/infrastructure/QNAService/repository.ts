import StorageService from "@/services/storageService";
import { IQnaItem } from "./types";

export default class QnaRepository {
  storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  set(items: IQnaItem[]) {
    this.storage.setStorage(items);
  }

  get() {
    return this.storage.getStorage<IQnaItem>();
  }

  clear() {
    this.storage.clearStorage();
  }
}
