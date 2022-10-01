const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownAttributes = require("markdown-it-attrs");
const markdownAnchor = require("markdown-it-anchor");
const { minify } = require("terser");

module.exports = function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  let markdownLib = markdownIt(options)
    .use(markdownAttributes)
    .use(markdownAnchor);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addFilter("dateFilter", (date) => {
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    return `${date.getDate()}-${month}-${date.getFullYear()}`;
  });

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({
    "node_modules/gradientee/dist/*.js": "js/",
    // "src/js/*.js": "js/",
  });
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
