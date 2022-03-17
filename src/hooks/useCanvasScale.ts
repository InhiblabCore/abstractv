import { useEventListener } from 'vue3-hooks-plus';

export default function useCanvasScale(options?: { useWidthHeightMini?: boolean }) {
  const { useWidthHeightMini } = options ?? {};

  const canvasScale = ref(0.2);
  const canvasHeight = ref(1080);
  const canvasWidth = ref(1920);

  const width = 1920;
  const height = 1080;

  const handleScale = () => {
    const scale = useWidthHeightMini
      ? Math.min(window.innerWidth - 440, window.innerHeight / height)
      : (window.innerWidth - 440) / width;
    canvasHeight.value = height - 100;
    canvasWidth.value = width;
    canvasScale.value = scale;
  };

  useEventListener('resize', () => handleScale());

  onMounted(() => {
    handleScale();
  });

  return {
    canvasScale,
    canvasHeight,
    canvasWidth,
    pageWidth: 1920,
    pageHeight: 1080,
  };
}
