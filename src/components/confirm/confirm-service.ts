export interface IConfirmOptions {
  ok?: string;
  discard?: string;
}

export interface IConfirmOptionsExtended extends IConfirmOptions {
  msg: string;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

export type ICallBack = (options: IConfirmOptionsExtended) => void;

export type ConfirmEvents = "open" | "close";

interface IConfirmService {
  on: (name: ConfirmEvents, callback: ICallBack) => void;
  off: (name: ConfirmEvents, callback: ICallBack) => void;
  emit: (name: ConfirmEvents, options: IConfirmOptionsExtended) => void;
  confirm: (msg: ConfirmEvents, options?: IConfirmOptions) => Promise<boolean>;
}

class EventEmitter {
  protected callbacks: Map<string, ICallBack[]> = new Map();

  on(name: string, callback: ICallBack) {
    const cbs = this.callbacks.get(name) || [];
    cbs.push(callback);
    this.callbacks.set(name, cbs);
  }

  off(name: string, callback: ICallBack) {
    const cbs = this.callbacks.get(name) || [];
    this.callbacks.set(
      name,
      cbs.filter((fn) => fn !== callback)
    );
  }

  emit(name: string, options: IConfirmOptionsExtended) {
    const cbs = this.callbacks.get(name) || [];
    cbs.forEach((fn) => fn(options));
  }
}

class ConfirmService implements IConfirmService {
  private callbacks: Map<string, ICallBack[]> = new Map();

  on(name: ConfirmEvents, callback: ICallBack) {
    const cbs = this.callbacks.get(name) || [];
    cbs.push(callback);
    this.callbacks.set(name, cbs);
  }

  off(name: ConfirmEvents, callback: ICallBack) {
    const cbs = this.callbacks.get(name) || [];
    this.callbacks.set(
      name,
      cbs.filter((fn) => fn !== callback)
    );
  }

  emit(name: ConfirmEvents, options: IConfirmOptionsExtended) {
    const cbs = this.callbacks.get(name) || [];
    cbs.forEach((fn) => fn(options));
  }

  constructor() {
    if (ConfirmService._instance) {
      return ConfirmService._instance;
    }
    ConfirmService._instance = this;
  }

  confirm(msg: ConfirmEvents, options?: IConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.emit("open", { ...options, msg, resolve });
    });
  }

  private static _instance: ConfirmService | null = null;
}

const confirmService = new ConfirmService();

export default confirmService;
