/* eslint-disable linebreak-style */
// const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const flowers = require('./flowers');

const addFlowersHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading, 
  } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newflower = {
    // eslint-disable-next-line max-len
    name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan Data. Mohon isi nama Data',
    });
    response.code(400);
    return response;
  }

  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan Data. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  flowers.push(newflower);

  const isSuccess = flowers.filter((flower) => flower.id === id).length > 0;
    
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data: {
        flowerId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal ditambahkan',
  });
  response.code(500);
  return response;   
};

const getAllFlowersHandler = (request, h) => {
  // eslint-disable-next-line prefer-const
  let flowersFilter = [...flowers];

  const response = h.response({
    status: 'success',
    data: {
      flowers: flowersFilter.map((flower) => ({
        id: flower.id,
        name: flower.name,
        publisher: flower.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getFlowersByIdHandler = (request, h) => {
  const { id } = request.params;

  const flower = flowers.filter((a) => a.id === id)[0];

  if (flower === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Data tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      flower,
    },
  });
  response.code(200);
  return response;
};

const editFlowerByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  
  const updatedAt = new Date().toISOString();

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui Data. Mohon isi nama Data',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui Data. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = flowers.findIndex((flower) => flower.id === id);

  if (index !== -1) {
    flowers[index] = {
      ...flowers[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Data berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui Data. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteFlowersByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = flowers.findIndex((flower) => flower.id === id);
 
  if (index !== -1) {
    flowers.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Data berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addFlowersHandler, getAllFlowersHandler, getFlowersByIdHandler, editFlowerByIdHandler, deleteFlowersByIdHandler,
};
