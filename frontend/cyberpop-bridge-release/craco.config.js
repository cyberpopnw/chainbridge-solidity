const path = require('path')

module.exports = {
    webpack: {
      alias: {
          "@": path.resolve(__dirname, 'src')
      }
    },
    babel: {
        plugins: [
            [
                "import",
                {
                    libraryName: "@arco-design/web-react",
                    libraryDirectory: "es",
                    camel2DashComponentName: false,
                    style: "css", // Load on Demand
                },
            ],
        ],
    },
};
