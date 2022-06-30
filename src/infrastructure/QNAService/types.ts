import ILocalStorage from "@/services/localStorageService";

export interface IQnaItem {
  id: number;
  title: string;
  description: string;
}

export type IQnaItemCreate = Omit<IQnaItem, "id">;

export interface IQnaService {
  storage: ILocalStorage;
  createItem(qna: IQnaItemCreate): Promise<void>;
  fetchItems(): Promise<IQnaItem[]>;
  updateItem(qna: IQnaItem): Promise<void>;
  deleteItem(id: number): Promise<void>;
}
