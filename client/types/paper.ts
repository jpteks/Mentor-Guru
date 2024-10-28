export interface paperFormState<T> {
  errors?: StringMap;
  successMsg?: string;
  data?: T;
  blurs?: StringToBoleanMap;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBoleanMap {
  [key: string]: boolean;
}
