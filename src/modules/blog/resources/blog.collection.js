const blogResource = require('./blog.resource');
const collection = require('../../../utils/collection');

const blogCollection = (data) => {
  return collection({
    items: data.blogs.map(blogResource),

    page: data.page,
    limit: data.limit,
    total: data.total,
    totalPages: data.totalPages,
  });
};

module.exports = blogCollection;