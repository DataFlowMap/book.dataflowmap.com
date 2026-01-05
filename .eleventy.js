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

  // Create a collection for blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    const includeDrafts = process.env.DRAFTS === 'true';

    return collectionApi.getFilteredByGlob("src/blog/*.md")
      .filter(post => {
        // Include all posts if DRAFTS is enabled, otherwise exclude drafts
        return includeDrafts || !post.data.draft;
      })
      .sort((a, b) => {
        return b.date - a.date; // Sort by date, newest first
      });
  });

  // Add date filter for blog posts
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  }
};
