/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入依赖
 */
import AutoImport from 'unplugin-auto-import/vite'

export const AutoImportDeps = () =>
  AutoImport({
    imports: ['vue', 'vue-router'],
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    dts: 'src/auto-imports.d.ts',
  })
