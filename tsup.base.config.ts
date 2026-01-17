import {Options} from 'tsup';
export const baseConfig: Options = {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  dts: {
    compilerOptions: {
      composite: false,
    }
  }
}
