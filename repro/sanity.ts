interface MyPromise<T> extends Promise<T> {
  __brand: string;
}

declare function getPlain(): MyPromise<number>;

getPlain();
