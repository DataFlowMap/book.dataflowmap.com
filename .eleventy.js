module.exports = function(eleventyConfig) {
  // Copy CSS files to output
  eleventyConfig.addPassthroughCopy("src/css");

  // Copy any images or other static assets
  eleventyConfig.addPassthroughCopy("src/images");

  // Add global data for style selection
  eleventyConfig.addGlobalData("styleFile", () => {
    const style = process.env.STYLE || "1";
    return `style${style}.css`;
  });

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  }
};
