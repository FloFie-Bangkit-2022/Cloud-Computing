const {
    addMarketHandler, getAllMarketHandler, getMarketByIdHandler, editMarketByIdHandler, deleteMarketByIdHandler,
  } = require('./handler_market');
  
  const routes = [
    {
      method: 'POST',
      path: '/market',
      handler: addMarketHandler,
    },
    {
      method: 'GET',
      path: '/market',
      handler: getAllMarketHandler,
    },
    {
      method: 'GET',
      path: '/market/{id}',
      handler: getMarketByIdHandler,
    },
    {
      method: 'PUT',
      path: '/market/{id}',
      handler: editMarketByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/market/{id}',
      handler: deleteMarketByIdHandler,
    },
  
  ];
  
  module.exports = routes_market;
  