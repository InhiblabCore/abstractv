import { useEditorComStore } from '@/store/modules/editorCom'
import { useEventListener } from 'vue3-hooks-plus'

export default function useCanvasScale(options?: { useWidthHeightMini?: boolean }) {
  const { useWidthHeightMini } = options ?? {}

  const editorComStore = useEditorComStore()

  const canvasScale = ref(0.2)
  const width = 1920
  const height = 1080

  const handleScale = () => {
    const scale = useWidthHeightMini
      ? Math.min(window.innerWidth - 640, window.innerHeight / height)
      : (window.innerWidth - (627 + 122 + 10)) / width

    editorComStore.setCanvasScale(scale)
  }
  useEventListener('resize', () => handleScale())

  watchEffect(() => {
    if (editorComStore.getCanvasScale) {
      let width_ = document.documentElement.clientWidth - (627 + 10 + 122)
      let height_ = document.documentElement.clientHeight - 72

      const deltaW = editorComStore.page.width * editorComStore.getCanvasScale
      const deltaH = editorComStore.page.height * editorComStore.getCanvasScale
      if (width_ < deltaW) {
        width_ = deltaW + 400
      }

      if (height_ < deltaH) {
        height_ = deltaH + 400
      }

      editorComStore.setCanvasHeight(height_)
      editorComStore.setCanvasWidth(width_)
    }
  })

  onMounted(() => {
    handleScale()
  })

  return {
    canvasScale,
    handleScale,
  }
}
