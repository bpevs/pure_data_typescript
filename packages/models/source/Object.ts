// Objects are Elements that contain functionality,
// gui-related or not.
export default class PDObject {
  public static from = (...args: any[]) => {
    return new PDObject()
  }
}
