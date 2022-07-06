export interface IConfirmOptions {
  ok?: string;
  discard?: string;
}

export interface IConfirmOptionsExternal extends IConfirmOptions {
  msg: string;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

type ConfirmEvents = "open" | "close";

type CallbackFn = (options: IConfirmOptionsExternal) => void;

const callbacks: Record<ConfirmEvents, CallbackFn[]> = {
  open: [],
  close: [],
};

const confirmService = {
  off(name: ConfirmEvents, fn: CallbackFn) {
    callbacks.open = callbacks.open.filter((el) => {
      return fn !== el;
    });
  },

  on(name: ConfirmEvents, fn: CallbackFn) {
    callbacks.open.push(fn);
  },

  emit(name: ConfirmEvents, options: IConfirmOptionsExternal) {
    callbacks.open.forEach((fn) => {
      fn(options);
    });
  },

  confirm(msg: ConfirmEvents, options?: IConfirmOptions): Promise<boolean> {
    console.log("Open Confirm");
    return new Promise((resolve) => {
      this.emit("open", { ...options, resolve, msg });
    });
  },
};

export default confirmService;
