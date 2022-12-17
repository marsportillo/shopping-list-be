'use strict'

const path = require('path')
const { readFile } = require('fs/promises');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: "pluto" }
  })

  fastify.get('/file', async function(request,reply) {
    const filePath = path.join(__dirname, 'data.json');
    const data = await readFile(filePath)
    return JSON.parse(data);
  })

  fastify.post('/data', async function(request, reply) {
    let compiled = "Let's rock with " + request.body.name;
    return { message: compiled}
  })
  
  fastify.options('/product', async function(request, reply) {
    return true
  })
  
  fastify.post('/product', async function(request, reply) {
    let compiled = request.body.productName + ' - (' +request.body.productPrice + '€) added.'
    return { message: compiled}
  })
}
