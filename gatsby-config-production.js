module.exports = {
  pathPrefix: <%= PATH_PREFIX %>,
  siteMetadata: {
    title: 'Gatsby With Apollo',
  },
};
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})