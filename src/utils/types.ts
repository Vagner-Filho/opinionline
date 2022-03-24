import { Ref } from "vue"

export const enum UserPosition {
  Initial = 0,
  Category,
  About,
  Contact,
  ExpandedArticle
}

export interface ViewControllerInterface {
  userPosition: Ref<number>
  setUserPosition: (n: number, s: string) => void
}