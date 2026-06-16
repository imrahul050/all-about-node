const prisma = require('../../../prisma/client');

class BlogRepository {
  async create(data) {

    console.log('Create Data =>', data);
    return prisma.blog.create({
      data,
      include: {
        author: true,
      },
    });
  }

  async findById(id) {
    return prisma.blog.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
      },
    });
  }

  async findBySlug(slug) {
    return prisma.blog.findUnique({
      where: { slug },
      include: {
        author: true,
      },
    });
  }

  async update(id, data) {
    return prisma.blog.update({
      where: {
        id: Number(id),
      },
      data,
      include: {
        author: true,
      },
    });
  }

  async delete(id) {
    return prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
  }



  async findMany({page = 1, limit = 10,search = '', status}) {
    const skip = (page - 1) * limit;
  
    const where = {
      ...(status && { status }),
  
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            content: {
              contains: search,
            },
          },
        ],
      }),
    };
  
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
        },
      }),
  
      prisma.blog.count({
        where,
      }),
    ]);
  
    return {
      blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }



  async findByAuthor(authorId,{page = 1, limit = 10}) {
    const skip = (page - 1) * limit;
  
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where: {
          authorId,
        },
  
        skip,
  
        take: limit,
  
        include: {
          author: true,
        },
  
        orderBy: {
          createdAt: 'desc',
        },
      }),
  
      prisma.blog.count({
        where: {
          authorId,
        },
      }),
    ]);
  
    return {
      blogs,
      total,
      page,
      limit,
    };
  }


}

module.exports = new BlogRepository();