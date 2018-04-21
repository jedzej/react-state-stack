import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default {
    input: "src/index.js",
    output: [
        { file: pkg.main, format: "cjs", exports: "named" },
        { file: pkg.module, format: "es" },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [babel(), resolve(), commonjs({
      include: /node_modules/
    }),
],
}
