const blogResource = (blog) => {
    if (!blog) return null;
    console.log('APP_URL =>', process.env.APP_URL);
    console.log('IMAGE =>', blog.image);
    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      image: process.env.APP_URL + '/uploads/' + blog.image,
      status: blog.status,
  
      author: blog.author
        ? {
            id: blog.author.id,
            name: blog.author.name,
            email: blog.author.email,
          }
        : null,
  
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  };
  
  module.exports = blogResource;