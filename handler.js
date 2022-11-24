'use strict';

const DynamoDB = require('aws-sdk/clients/dynamodb');

const db = new DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

module.exports.create = async (event) => {
  event.body = JSON.parse(event.body);

  const newAnimal = {
    name: event.body.name,
    age: event.body.age,
    family: event.body.family,
  };

  await db
    .put({
      TableName,
      Item: newAnimal,
    })
    .promise();

  return { statusCode: 200, body: JSON.stringify(newAnimal) };
};

module.exports.list = async (event) => {
  const animals = await db
    .scan({
      TableName,
    })
    .promise();

  return { statusCode: 200, body: JSON.stringify(animals) };
};

module.exports.delete = async (event) => {
  const animalToBeRemovedName = event.pathParameters.name;
  console.log(animalToBeRemovedName);
  await db
    .delete({
      TableName,
      Key: {
        name: animalToBeRemovedName,
      },
    })
    .promise();

  return { statusCode: 200 };
};
