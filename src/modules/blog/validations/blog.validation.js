const { z } = require('zod');

const createBlogSchema = z.object({
  title: z.string().min(3).max(255),

  excerpt: z.string().max(500).optional(),

  content: z.string().min(20),

  status: z
    .enum([
      'DRAFT',
      'PUBLISHED',
      'ARCHIVED',
    ])
    .optional(),
});

const updateBlogSchema = createBlogSchema.partial();

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};