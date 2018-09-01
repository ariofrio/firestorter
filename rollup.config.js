import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
	input: 'src/index.js',
	external: ['mobx'],
	output: [
		{
			file: 'dist/firestorter.js',
			format: 'umd',
			name: 'firestorter',
			globals: {
				mobx: 'mobx'
			},
			// sourcemap: true,
			exports: 'named'
		},
		{
			file: 'dist/firestorter.module.js',
			format: 'es',
			name: 'firestorter',
			globals: {
				mobx: 'mobx'
			},
			exports: 'named'
		}
	],
	plugins: [
		peerDepsExternal(),
		babel({
			babelrc: false,
			plugins: [
				'transform-object-rest-spread',
				'transform-class-properties',
				'transform-flow-strip-types'
			],
			presets: ['es2015-rollup'],
			// [ariofrio]: support building when package is a yarn workspace
			// https://github.com/rollup/rollup-plugin-babel/issues/229
			exclude: ['node_modules/**', '../../node_modules/**']
		}),
		resolve({
			module: true,
			main: true
		}),
		commonjs(),
		filesize()
	]
};
