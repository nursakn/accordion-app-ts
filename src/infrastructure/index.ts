import qnaService from "./QNAService/service";
import { qnaServiceI } from "./QNAService/types";

export interface InfrastructureI {
  qna: qnaServiceI;
}

const qna = new qnaService();

const infrastructure = {
  qna: qna,
};

export default infrastructure;
