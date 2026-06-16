const blogService = require('../services/blog.service');

// /Users/MySpace/NodeJsProject/blog-api/src/modules/blog/services

const response = require('../../../utils/response');

const asyncHandler = require('../../../utils/asyncHandler');

const blogResource = require('../resources/blog.resource');
const blogCollection =require('../resources/blog.collection');




const createBlog = asyncHandler(
    async (req, res) => {
  
      const blog =
        await blogService.createBlog(
          req.body,
          req.user,
          req.file?.filename
        );
  
      return response(
        res,
        201,
        true,
        'Blog created successfully',
        blogResource(blog)
      );
  
    }
  );

  const myBlogs = asyncHandler(
    async (req, res) => {
  
      const result =
        await blogService.getMyBlogs(
          req.user.id,
          {
            page:
              Number(req.query.page) || 1,
  
            limit:
              Number(req.query.limit) || 10,
          }
        );
  
      return response(
        res,
        200,
        true,
        'Blogs fetched successfully',
        blogCollection(result)
      );
  
    }
  );



  const show = asyncHandler(
    async (req, res) => {
  
      const blog =
        await blogService.getBlogById(
          req.params.id
        );
  
      return response(
        res,
        200,
        true,
        'Blog fetched successfully',
        blogResource(blog)
      );
  
    }
  );


  const update = asyncHandler(
    async (req, res) => {
  
      const blog =
        await blogService.updateBlog(
          req.params.id,
          req.body,
          req.user,
          req.file?.filename
        );
  
      return response(
        res,
        200,
        true,
        'Blog updated successfully',
        blogResource(blog)
      );
  
    }
  );


  const destroy = asyncHandler(
    async (req, res) => {
  
      await blogService.deleteBlog(
        req.params.id,
        req.user
      );
  
      return response(
        res,
        200,
        true,
        'Blog deleted successfully'
      );
  
    }
  );



  module.exports = {
    createBlog,
    myBlogs,
    show,
    update,
    destroy,
  };