import { copyText } from "vue3-clipboard";
import { Toast } from "vant";

export function useCopy(value) {
  return copyText(value, undefined, (error, e) => {
    if (error) {
      Toast("Copy Failed");
    } else {
      Toast("Copy Success!");
    }
  });
}
