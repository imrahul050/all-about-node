const userResource = (user) => {
 
    return {
      id: user.id ?? null,
      name: user.name ?? null,
      email: user.email ?? null,
      role: user.role ?? null,
      status: user.status ?? null,
      createdAt: user.createdAt ?? null,
    };
  };
  
  module.exports = userResource;