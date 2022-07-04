import { IQnaItem, IQnaRepository, IQnaService } from "./types";
export default class qnaService implements IQnaService {
  repository: IQnaRepository;

  constructor(repository: IQnaRepository) {
    this.repository = repository;
  }

  async createItem(qna: IQnaItem) {
    const items = await this.repository.get();
    items.push({
      id: Math.floor(Math.random() * 1000000),
      title: qna.title,
      description: qna.description,
    });
    this.repository.set(items);
  }

  async fetchItems() {
    const items = await this.repository.get();
    return items;
  }

  async updateItem(qna: IQnaItem) {
    const items = await this.repository.get();
    const index = items.findIndex((item) => qna.id === item.id);
    if (index !== -1) {
      items[index] = qna;
    }
    this.repository.set(items);
  }

  async deleteItem(id: number) {
    const items = await this.repository.get();
    this.repository.set(items.filter((item) => item.id !== id));
  }
}
