import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import typescript from "rollup-plugin-typescript2"


export default {
  input: "source/index.ts",
  output: {
    file: "dist/index.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript({
      typescript: require("typescript")
    })
  ]
}
