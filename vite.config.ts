import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    dts({
      outDir: 'dist', // 生成的文件目录
      insertTypesEntry: true, // 生成入口类型声明文件 index.d.ts
      tsconfigPath: 'tsconfig.build.json', // tsconfig 路径
    }),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'src/assets/styles'),
          dest: '', // 复制到 dist 文件夹根目录下
        },
      ],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
  ],
  build: {
    lib: {
      // 指定入口文件
      entry: path.resolve(__dirname, 'src/index.ts'),
      // 指定库的全局变量名称（适用于 UMD/IIFE 格式）
      name: 'common-ui',
      // 根据输出格式生成不同的文件名
      fileName: (format) => `common-ui.${format}.js`,
    },
    rollupOptions: {
      // 将 Vue 设为外部依赖，避免打包到库中
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
      },
    },
  },
});
