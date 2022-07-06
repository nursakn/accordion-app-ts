import StorageService from "@/services/storageService";
import { IQnaItem } from "./types";

export default class QnaRepository {
  storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  set(items: IQnaItem[]) {
    this.storageService.setData(items);
  }

  get() {
    return this.storageService.getData<IQnaItem>();
  }

  clear() {
    this.storageService.clearStorage();
  }
}
