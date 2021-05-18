'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server);


describe ('testing server functions and errors' , ()=>{

  it ('should get the home page message', async ()=>{
    // arrange 
    let rout = '/';
    // act
    const response = await request.get (rout);
    // assert
    expect(response.status).toBe (200);
    expect (response.text).toEqual ('welcome to home page!');
  });


  it ('should throw page not found error 404 on bad rout', async ()=>{
    // arrange 
    let rout = '/tama';
    // act
    const response = await request.get (rout);
    // assert
    expect (response.status).toBe(404);
  });


  it('should throw page not found error 404 on bad method', async () => {
    // arrange 
    // act
    const response = await request.put ('/api/v1/food');
    // assert
    expect(response.status).toBe (404);
  });


  it ('should throw error 500', async ()=>{
    // arrange 
    let rout = '/bad';
    // act
    const response = await request.get (rout);
    // assert
    expect(response.status).toEqual (500);
    
  });

  
});

describe('food api', () => {
  let id;
  it('should create a new food using post', async () => {
    //arrange
    let food = {
      name: 'mansaf',
      type: 'lunch',
    };
    //act
    const response = await request.post('/api/v1/food').send(food);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.data.name).toEqual('mansaf');
    expect(response.body.data.type).toEqual('lunch');
    expect(response.body.id.length).toBeGreaterThan(0);

    id = response.body.id;
  });

  it('should update a food using put', async () => {
    //arrange
    let editFood = {
      name: 'eggs',
      type: 'breakfast',
    };
    //act
    const response = await request.put(`/api/v1/food/${id}`)
      .send(editFood);
    //assert
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toEqual('eggs');
    expect(response.body.data.type).toEqual('breakfast');
  });

  it('should get all foods using get', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
  });

  it('should get one foods using get and according to id', async () => {
    const res = await request.get(`/api/v1/food/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.data.name).toEqual('eggs');
        
  });
  it('delete a food using DELETE /food/:id', async () => {
    const res = await request.delete(`/api/v1/food/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(0);
  });
});



describe('clothes api', () => {
  let id;
  it('should create a new clothes using post', async () => {
    //arrange
    let clothes = {
      name: 'scarf',
      type: 'neck ware',
    };
    //act
    const response = await request.post('/api/v1/clothes').send(clothes);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.data.name).toEqual('scarf');
    expect(response.body.data.type).toEqual('neck ware');
    expect(response.body.id.length).toBeGreaterThan(0);

    id = response.body.id;
  });

  it('should update a clothes using put', async () => {
    //arrange
    let editClothes = {
      name: 'hat',
      type: 'head wear',
    };
    //act
    const response = await request.put(`/api/v1/clothes/${id}`)
      .send(editClothes);
    //assert
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toEqual('hat');
    expect(response.body.data.type).toEqual('head wear');
  });

  it('should get all clothes using get', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
  });

  it('should get one clothes using get and according to id', async () => {
    const res = await request.get(`/api/v1/clothes/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.data.name).toEqual('hat');
        
  });
  it('delete a clothes using DELETE /clothes/:id', async () => {
    const res = await request.delete(`/api/v1/clothes/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(0);
  });
});
