import { QnaI, qnaServiceI, QnaWithoutIdI } from "./types";

export default class qnaService implements qnaServiceI {
  items: QnaI[] = [];

  createItem(qna: QnaWithoutIdI) {
    this.items.push({
      id: Math.floor(Math.random() * 1000000),
      title: qna.title,
      description: qna.description,
    });
  }

  getItems(): QnaI[] {
    return this.items;
  }

  updateItem(qna: QnaI) {
    const index = this.items.findIndex((item) => qna.id === item.id);
    if (index !== -1) {
      this.items[index] = qna;
    }
  }

  deleteItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
