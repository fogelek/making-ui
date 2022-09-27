const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownAttributes = require("markdown-it-attrs");
const markdownAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    // linkify: true
  };

  let markdownLib = markdownIt(options)
    .use(markdownAttributes)
    .use(markdownAnchor);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({
    "node_modules/gradientee/dist/*.js": "js/",
    "src/js/*.js": "js/",
  });
  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
