const {
  FuseBox,
  WebIndexPlugin,
  CSSPlugin,
  CSSModules,
  QuantumPlugin,
  Sparky,
} = require("fuse-box");


let fuse, production = true, devServer = false;

Sparky.task("default", ["build"], () => {});

Sparky.task("build", ["bundle"], () => {});

Sparky.task("dev-server", async () => {
  production = false;
  devServer = true;
  return await Sparky.start("bundle");
});

Sparky.task("bundle", ["config"], () => fuse.run());

Sparky.task("config", () => {
  fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    target: "browser@es5",
    sourceMaps: !production,
    tsConfig: "tsconfig.json",
    plugins: [
      WebIndexPlugin({
        template: "src/index.html",
      }),
      [ CSSModules(), CSSPlugin() ],
      production && QuantumPlugin({
        bakeApiIntoBundle: "app",
        treeshake: true,
        uglify: true,
      }),
    ],
  });

  const app = fuse.bundle("app")
                  .instructions("> index.tsx");

  if (!production && devServer) {
    app.hmr().watch();
    fuse.dev({
      open: true,
    });
  }
});
