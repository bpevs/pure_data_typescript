declare module "zen-observable" {
  class Observable {
    constructor(subscriber: (...args: any[]) => any)

    [Symbol.observable](): any
    subscribe(...args: any[]): any

    forEach(callback: (value: any) => void): Promise<void>
    map<R>(callback: (value: any) => R): any
    filter(callback: (value: any) => boolean): any
    reduce(callback: (previousvalue: any, currentvalue: any) => any, initialValue?: any): any
    reduce<R>(callback: (previousValue: R, currentvalue: any) => R, initialValue?: R): any
    flatMap<R>(callback: (value: any) => any): any
    concat<R>(...observable: Array<any>): any

    static from<R>(observable: any | ArrayLike<R>): any
    static of<R>(...items: R[]): any
  }

  export default Observable
}
