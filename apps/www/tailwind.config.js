import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'path';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../tailwind.config';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  ...baseConfig
};

export default config;
