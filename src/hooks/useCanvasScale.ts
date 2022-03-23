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
      ? Math.min(window.innerWidth - 440, window.innerHeight / height)
      : (window.innerWidth - 440) / width

    editorComStore.setCanvasScale(scale)
    editorComStore.setCanvasHeight(height - 100)
    editorComStore.setCanvasWidth(width)
  }

  useEventListener('resize', () => handleScale())

  onMounted(() => {
    handleScale()
  })

  return {
    canvasScale,
    handleScale,
  }
}
