const {
  addFlowersHandler, getAllFlowersHandler, getFlowersByIdHandler, editFlowerByIdHandler, deleteFlowersByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/flowers',
    handler: addFlowersHandler,
  },
  {
    method: 'GET',
    path: '/flowers',
    handler: getAllFlowersHandler,
  },
  {
    method: 'GET',
    path: '/flowers/{id}',
    handler: getFlowersByIdHandler,
  },
  {
    method: 'PUT',
    path: '/flowers/{id}',
    handler: editFlowerByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/flowers/{id}',
    handler: deleteFlowersByIdHandler,
  },

];

module.exports = routes;
