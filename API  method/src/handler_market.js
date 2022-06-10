/* eslint-disable linebreak-style */
// const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const market = require('./market');

const addMarketHandler = (request, h) => {
  const {
    shopName, rate, address, latitude, longitude, 
  } = request.payload;

  const id = nanoid(16);

  const newmarket = {
    // eslint-disable-next-line max-len
    shopName, rate, address, latitude, longitude, id,
  };

  if (shopName === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan Data. Mohon isi nama Data',
    });
    response.code(400);
    return response;
  }

  market.push(newmarket);

  const isSuccess = market.filter((market) => market.id === id).length > 0;
    
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data: {
        marketId: id,
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

const getAllMarketHandler = (request, h) => {
  // eslint-disable-next-line prefer-const
  let marketFilter = [...market];

  const response = h.response({
    status: 'success',
    data: {
      market: marketFilter.map((market) => ({
        id: market.id,
        shopName: market.shopName,
        rate: market.rate,
      })),
    },
  });
  response.code(200);
  return response;
};

const getMarketByIdHandler = (request, h) => {
  const { id } = request.params;

  const market = market.filter((a) => a.id === id)[0];

  if (market === undefined) {
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
      market,
    },
  });
  response.code(200);
  return response;
};

const editMarketByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    shopName, rate, address, latitude, longitude,
  } = request.payload;

  if (shopName === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui Data. Mohon isi nama Data',
    });
    response.code(400);
    return response;
  }

  const index = market.findIndex((market) => market.id === id);

  if (index !== -1) {
    market[index] = {
      ...market[index],
      shopName,
      rate,
      address,
      latitude,
      longitude,
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

const deleteMarketByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = market.findIndex((market) => market.id === id);
 
  if (index !== -1) {
    market.splice(index, 1);
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
  addMarketHandler, getAllMarketHandler, getMarketByIdHandler, editMarketByIdHandler, deleteMarketByIdHandler,
};
