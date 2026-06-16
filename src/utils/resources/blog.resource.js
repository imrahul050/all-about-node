const blogResource = (blog) => {

  
    return {
      id: blog.id ?? null,
      title: blog.title ?? null,
      slug: blog.slug ?? null,
      content: blog.content ?? null,
      image: blog.image ?? null,
      status: blog.status ?? null,
      authorId: blog.authorId ?? null,
      createdAt: blog.createdAt ?? null,
    };
  };
  
  module.exports = blogResource;