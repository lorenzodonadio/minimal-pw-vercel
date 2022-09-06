import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { resolve } from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$stores: resolve('./src/lib/stores'),
			$types: resolve('./src/lib/types'),
			$utils: resolve('./src/lib/utilities')
		}
	}
};

export default config;
