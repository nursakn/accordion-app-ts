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

const callbacks: Record<ConfirmEvents, ICallBack[]> = {
  open: [],
  close: [],
};

const confirmService = {
  on(name: ConfirmEvents, callback: ICallBack) {
    callbacks[name].push(callback);
  },

  off(name: ConfirmEvents, callback: ICallBack) {
    callbacks[name] = callbacks[name].filter((fn) => fn === callback);
  },

  emit(name: ConfirmEvents, options: IConfirmOptionsExtended) {
    callbacks[name].forEach((fn) => fn(options));
  },

  confirm(msg: ConfirmEvents, options?: IConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.emit("open", { ...options, msg, resolve });
    });
  },
};

export default confirmService;
