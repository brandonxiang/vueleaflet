import { stat } from 'node:fs/promises';

const files = [
  'dist/index.d.ts',
  'dist/vueleaflet.es.js',
  'dist/vueleaflet.umd.js',
];

for (const file of files) {
  const info = await stat(file);
  if (info.size === 0) {
    throw new Error(`${file} is empty`);
  }
  console.log(`${file}: ${info.size} bytes`);
}
