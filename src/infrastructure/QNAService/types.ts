import ILocalStorage from "@/services/storageService";

export interface IQnaItem {
  id: number;
  title: string;
  description: string;
}

export interface IQnaService {
  repository: IQnaRepository;
  createItem(qna: IQnaItem): Promise<void>;
  fetchItems(): Promise<IQnaItem[]>;
  updateItem(qna: IQnaItem): Promise<void>;
  deleteItem(id: number): Promise<void>;
}

export interface IQnaRepository {
  storageService: ILocalStorage;
  set(items: IQnaItem[]): void;
  get(): Promise<IQnaItem[]>;
  clear(): void;
}
