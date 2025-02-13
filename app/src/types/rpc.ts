export interface RPCRequest<T> {
    params: T;
    id?: string | number;
  }