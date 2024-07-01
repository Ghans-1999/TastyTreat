import { Client, Account, Databases, Query} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66521a6d002f520caa0c'); // Replace with your project ID

export const account = new Account(client);
console.log(account)

export const databases = new Databases(client);
console.log(databases);

export const promise = databases.listDocuments(
    "TastyTreat",
    "Products"
);


promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});

export const categories = databases.listDocuments(
    "TastyTreat",
    "6673070900021b99d7a5"
);

export const orders = databases.listDocuments(
    "TastyTreat",
    "667d7d17002d10cb5826"
);
orders.then(function (response) {
    console.log('Orders');
    console.log(response);
}, function (error) {
    console.log(error);
});



export { ID, Client } from 'appwrite';
