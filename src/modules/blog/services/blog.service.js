const slugify = require('slugify');

const blogRepository = require('../repositories/blog.repository');
// const NotFoundError = require('../../../exceptions/NotFoundError');

class BlogService {

    async createBlog(data, user, image = null) {

        const slug =
  await this.generateUniqueSlug(
    data.title
  );
    
        return blogRepository.create({
            title: data.title,
            slug,
            excerpt: data.excerpt,
            content: data.content,
    
            image,
    
            status: data.status || 'DRAFT',
    
            authorId: user.id,
        });
    
    }

    async getBlogById(id) {

        const blog =
            await blogRepository.findById(id);
    
        if (!blog) {
            throw new Error('Blog not found');
        }
    
        return blog;
    }


    async getBlogBySlug(slug) {

        const blog =
            await blogRepository.findBySlug(slug);
    
        if (!blog) {
            throw new Error('Blog not found');
        }
    
        return blog;
    }


    async getBlogs(filters) {

        return blogRepository.findMany(filters);
    
    }

    async getMyBlogs(userId, filters) {

        return blogRepository.findByAuthor(
            userId,
            filters
        );
    
    }


    async updateBlog(
        blogId,
        data,
        user,
        image = null
    ) {
    
        const blog =
            await blogRepository.findById(blogId);
    
        if (!blog) {
            throw new Error('Blog not found');
        }
    
        const isOwner =
            blog.authorId === user.id;
    
        const isAdmin =
            user.role === 'ADMIN';
    
        if (!isOwner && !isAdmin) {
            throw new Error(
                'Unauthorized access'
            );
        }
    
        let slug = blog.slug;
    
        if (data.title) {
    
            slug = slugify(data.title, {
                lower: true,
                strict: true,
            });
    
        }
    
        return blogRepository.update(
            blogId,
            {
                ...data,
    
                slug,
    
                ...(image && {
                    image,
                }),
            }
        );
    
    }


    async deleteBlog(blogId,user) {
    
        const blog = await blogRepository.findById(blogId);
    
        if (!blog) {
            throw new Error('Blog not found');
        }
    
        const isOwner = blog.authorId === user.id;
    
        const isAdmin = user.role === 'ADMIN';
    
        if (!isOwner && !isAdmin) {
            throw new Error( 'Unauthorized access');
        }
    
        return blogRepository.delete(blogId);
    
    }

    async generateUniqueSlug(title) {

        let slug = slugify(title, {
          lower: true,
          strict: true,
        });
      
        let uniqueSlug = slug;
      
        let counter = 1;
      
        while (
          await blogRepository.findBySlug(uniqueSlug)
        ) {
          uniqueSlug = `${slug}-${counter}`;
          counter++;
        }
      
        return uniqueSlug;
      }

}

module.exports = new BlogService();