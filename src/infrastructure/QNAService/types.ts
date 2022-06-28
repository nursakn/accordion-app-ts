export interface QnaWithoutIdI {
  title: string;
  description: string;
}

export interface QnaI extends QnaWithoutIdI {
  id: number;
}

export interface qnaServiceI {
  items: QnaI[];
  createItem(qna: QnaWithoutIdI): void;
  getItems(): QnaI[];
  updateItem(qna: QnaI): void;
  deleteItem(id: number): void;
}
