import ILocalStorage from "@/services/localStorageService";
import { IQnaItem, IQnaItemCreate, IQnaService } from "./types";
export default class qnaService implements IQnaService {
  storage: ILocalStorage;

  constructor(storage: ILocalStorage) {
    this.storage = storage;
  }

  async createItem(qna: IQnaItemCreate) {
    const items = await this.storage.getQnaItems();
    items.push({
      id: Math.floor(Math.random() * 1000000),
      title: qna.title,
      description: qna.description,
    });
    this.storage.setStorage(items);
  }

  async fetchItems() {
    const items = await this.storage.getQnaItems();
    return items;
  }

  async updateItem(qna: IQnaItem) {
    const items = await this.storage.getQnaItems();
    const index = items.findIndex((item) => qna.id === item.id);
    if (index !== -1) {
      items[index] = qna;
    }
    this.storage.setStorage(items);
  }

  async deleteItem(id: number) {
    const items = await this.storage.getQnaItems();
    this.storage.setStorage(items.filter((item) => item.id !== id));
  }
}
