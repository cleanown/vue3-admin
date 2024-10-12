import { debounce } from "@/utils";
import { onMounted, onUnmounted, ref } from "vue";
/**
 * 获取表格自适应的最大高度
 * @param offsetHeight 高度偏移，默认60，这个数值是刚好三个padding 20 或 margin 20的值相加
 */
export function useTableHeight (offsetHeight: number = 60) {
	const tableHeight = ref<number | string>('100%')
	const calculateHeight = () => {
		const tableDom = document.getElementsByClassName('list-content')[0]
    if (tableDom) {
      let pagerDomRectHeight = 0
      const tableDomRect = tableDom.getBoundingClientRect()
      const pagerDom = document.getElementsByClassName('list-pager')[0]
      if (pagerDom) {
        const pagerDomRect = pagerDom.getBoundingClientRect()
        pagerDomRectHeight = pagerDomRect.height
      }
      tableHeight.value = window.innerHeight - tableDomRect.top - pagerDomRectHeight - offsetHeight
    } else {
      tableHeight.value = '100%'
    }
	}

	onMounted(() => {
		calculateHeight()
		window.addEventListener('resize', debounce(calculateHeight, 100))
	})
	onUnmounted(() => {
		window.removeEventListener('resize', debounce(calculateHeight, 100))
	})
	return { tableHeight }
}