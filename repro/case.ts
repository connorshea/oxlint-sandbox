interface MyPromise<T> extends Promise<T> {
  __brand: string;
}

type Test = MyPromise<number> & { foo: 'bar' };

declare function getTest(): Test;

getTest();
