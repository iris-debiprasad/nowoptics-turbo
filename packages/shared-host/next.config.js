const withImages = require("next-images");

module.exports = withImages({
  output: "standalone",
  images: {
    unoptimized: true,
  },
});
