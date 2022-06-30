import qnaService from "./QNAService/service";
import { IQnaService } from "./QNAService/types";
import MyLocalStorage from "@/services/localStorageService";
export interface InfrastructureI {
  qna: IQnaService;
}
const createInfrastrucure = (storage: Storage) => {
  const myStorage = new MyLocalStorage(storage);
  const qna = new qnaService(myStorage);
  const infrastructure = {
    qna: qna,
  };
  return infrastructure;
};

export default createInfrastrucure;
