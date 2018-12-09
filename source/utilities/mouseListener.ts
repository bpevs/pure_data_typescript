import Observable from "zen-observable"


export const mouseon = new Observable((observer: any) => {
  const listener: any = addEventListener("mousemove", evt => observer.next(evt))
  return () => removeEventListener("mousemove", listener)
})
