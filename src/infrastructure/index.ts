import qnaService from "./QNAService/service";
import { IQnaService } from "./QNAService/types";
import StorageService from "@/services/storageService";
import QnaRepository from "./QNAService/repository";
export interface InfrastructureI {
  qna: IQnaService;
}
const createInfrastrucure = (storage: Storage) => {
  const qnaStorage = new StorageService(storage, "QNAItems");
  const qnaRepository = new QnaRepository(qnaStorage);
  const qna = new qnaService(qnaRepository);
  const infrastructure = {
    qna: qna,
  };
  return infrastructure;
};

export default createInfrastrucure;
