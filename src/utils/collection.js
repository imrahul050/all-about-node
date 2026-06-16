const collection = ({
    items,
    page,
    limit,
    total,
    totalPages,
  }) => {
    return {
      items,
  
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  };
  
  module.exports = collection;