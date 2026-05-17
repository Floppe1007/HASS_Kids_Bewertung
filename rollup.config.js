import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/family-task-card.ts',
  output: {
    file: 'dist/family-task-card.js',
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    typescript(),
  ],
};
