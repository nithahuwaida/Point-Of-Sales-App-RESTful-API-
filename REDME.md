<h1 align="center">Point Of Sales App RESTful API </h1>

## Introduction

Point of sales RESTful API is an API that allows users to read product and genre categories from a database. Point of sales API also allows users to create, update, and delete a product and genre categories to / from the database.

There're some features included in the RESTful API which allow users to programmatically sort the products (based on name, category, or date updated ), add or reduce quantity a product, search a products (based on name) and pagination to products from database.There are also features Cross Origin Resource Sharing (CORS).

This documentation outlines the point of sales API functionality.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16.3-green.svg?style=rounded-square)](https://nodejs.org/) [![body-parser](https://img.shields.io/badge/bodyparser-v1.19-e)](https://www.npmjs.com/package/body-parser) [![MySQL](https://img.shields.io/badge/mysql-v3.2.2-blue)](https://www.npmjs.com/search?q=mysql)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js
Node.js is software designed to develop web-based applications and is written in the JavaScript programming language.

If all this time we know that JavaScript is a programming language that runs on the client / browser side only, then Node.js exists to complete the role of JavaScript so allow developers used javascript to write command line tools and for **server side scripting**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used. The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js, or simply Express, is a web application framework for Node.js.
It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `405` | `Method not allowed` | The resource being accessed doesn't support the method specified (GET, POST, etc.). |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:8080/product)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'pos_app'
```

## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **pos_app** :

```
CREATE DATABASE pos_app;
```

Create Table named **products** :

```
CREATE TABLE products (
    id_product INT(10) AUTO INCREMENT PRIMARY KEY,
    name_product VARCHAR(50),
    desc_product VARCHAR(255),
    image_product VARCHAR(255),
    id_category INT(10),
    price_product BIGINT(10),
    quantity_product INT(5),
    date_added TIMESTAMP,
    date_updated TIMESTAMP,
    FOREIGN KEY (products) REFERENCE categories(id_category)
);
```

Create Table named **categories** :

```
CREATE TABLE categories(
    id_category INT(10) AUTO INCREMENT PRIMARY KEY,
    name_category VARCHAR(25)
);
```
#### **CRUD Products Endpoint**
* **Read All Products**
  - **Request** : **`GET /product`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "Promo 99",
            "description": "Promo Discount",
            "imageURL": "https://ibb.co/4tRkbDB",
            "id_category": 1,
            "name_category": "Menu Promo",
            "price": 99000,
            "quantity": 5,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-15T12:15:05.000Z"
        },
        {
            "id": 2,
            "name": "Kids Meal Chicken Mix",
            "description": "food for children",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 5,
            "name_category": "Kids Meal",
            "price": 40000,
            "quantity": 6,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-17T11:57:50.000Z"
        },
        {
            "id": 3,
            "name": "Red Hot Chili Beef Bowl",
            "description": "Reguler",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 3,
            "name_category": "Main Menu",
            "price": 50000,
            "quantity": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-17T12:04:03.000Z"
        },
        {
            "id": 4,
            "name": "Egg Mayo Tori Don",
            "description": "Reguler",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 4,
            "name_category": "Crispy Chicken Bowl",
            "price": 33000,
            "quantity": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-15T12:15:05.000Z"
        },
        {
            "id": 5,
            "name": "Ocha Cold",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 12000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 6,
            "name": "Sparkling Lemonade",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 18000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 7,
            "name": "Happy Soda",
            "description": "Medium 12 Oz",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 22000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        }
    ]
}
```
* **Read a product**
  - **Request** : **`GET /:keyId`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "Promo 99",
            "description": "Promo Discount",
            "imageURL": "https://ibb.co/4tRkbDB",
            "id_category": 1,
            "price": 99000,
            "quantity": 5,
            "date_added": "2019-10-15T11:59:19.000Z",
            "date_updated": "2019-10-18T14:38:18.000Z"
        }
    ]
}
```
* **Create a product**
  - **Request** : **`POST /product`**
  - **Response** :
```
{
    "status": 200,
    "message": "Created product successfully!"
}
```
* **Update a product**
  - **Request** : **`PUT /product/:keyId`**
  - **Response** :
```
{
    "status": 200,
    "message": "Successfully changed the product!"
}
```
* **Delete a product** 
  - **Request** : **`DELETE /:keyId`**
  - **Response** : 
```
{
    "status": 200,
    "message": "Successfully deleted the product!"
}
```

#### CRUD Categories Endpoint
* **Read All Categories**
  - **Request** : **`GET /category`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "category": "Menu Promo"
        },
        {
            "id": 2,
            "category": "Recommended"
        },
        {
            "id": 3,
            "category": "Main Menu"
        },
        {
            "id": 4,
            "category": "Crispy Chicken Bowl"
        },
        {
            "id": 5,
            "category": "Kids Meal"
        },
        {
            "id": 6,
            "category": "Topping"
        },
        {
            "id": 7,
            "category": "Drinks"
        }
    ]
}
```
* **Create a category** 
  - **Request** : **`POST /category`**
  - **Response** :
```
{
    "status": 200,
    "message": "Created category successfully!"
}
```
* **Update a category**
  - **Request** : **`PUT /category/:keyId`**
  - **Response** :
```
{
    "status": 200,
    "message": "Update category Successfully!"
}
```
* **Delete a Category** 
  - **Request** : **`DELETE /category/:keIid`**
  - **Response** :
```
{
    "status": 200,
    "message": "Delete category successfully!"
}
```

#### Sorting The Product Endpoint

**Sort The Products**
* **Sort the products (based on date updated and descending )**
  - **Request** : **`GET /product/sort`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 8,
            "name": "Ice Tea",
            "description": "Cold",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 12000,
            "quantity": 6,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 1,
            "name": "Promo 99",
            "description": "Promo Discount",
            "imageURL": "https://ibb.co/4tRkbDB",
            "id_category": 1,
            "name_category": "Menu Promo",
            "price": 99000,
            "quantity": 5,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-15T12:15:05.000Z"
        },
        {
            "id": 7,
            "name": "Happy Soda",
            "description": "Medium 12 Oz",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 22000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 6,
            "name": "Sparkling Lemonade",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 18000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 5,
            "name": "Ocha Cold",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 12000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 4,
            "name": "Egg Mayo Tori Don",
            "description": "Reguler",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 4,
            "name_category": "Crispy Chicken Bowl",
            "price": 33000,
            "quantity": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-15T12:15:05.000Z"
        }
    ]
}
```
* **Sort the products (based on name product and ascending )**
  - **Request** : **`GET /product/sort`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 4,
            "name": "Egg Mayo Tori Don",
            "description": "Reguler",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 4,
            "name_category": "Crispy Chicken Bowl",
            "price": 33000,
            "quantity": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-15T12:15:05.000Z"
        },
        {
            "id": 7,
            "name": "Happy Soda",
            "description": "Medium 12 Oz",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 22000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 8,
            "name": "Ice Tea",
            "description": "Cold",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 12000,
            "quantity": 6,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 2,
            "name": "Kids Meal Chicken Mix",
            "description": "food for children",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 5,
            "name_category": "Kids Meal",
            "price": 40000,
            "quantity": 6,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-17T11:57:50.000Z"
        },
        {
            "id": 5,
            "name": "Ocha Cold",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 12000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        }
    ]
}
```
* **Sort the products (based on category and ascending )**
  - **Request** : **`GET /product/sort`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 4,
            "name": "Egg Mayo Tori Don",
            "description": "Reguler",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 4,
            "name_category": "Crispy Chicken Bowl",
            "price": 33000,
            "quantity": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-15T12:15:05.000Z"
        },
        {
            "id": 7,
            "name": "Happy Soda",
            "description": "Medium 12 Oz",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 22000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 5,
            "name": "Ocha Cold",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 12000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 8,
            "name": "Ice Tea",
            "description": "Cold",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 12000,
            "quantity": 6,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        },
        {
            "id": 6,
            "name": "Sparkling Lemonade",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "name_category": "Drinks",
            "price": 18000,
            "quantity": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z"
        }
    ]
}
```

**ADD and Reduce Quantity of Products** 
* **ADD Quantity**
  - **Request** : **`PUT /product/qty/add/:keyId`**
  - **Response** : 
```
{
    "status": 200,
    "message": "Add quantity product succesfully"
}
```
* **Reduce Quantity**
  - **Request** : **`PUT /product/qty/reduce/:keyId`**
  - **Response** : 
```
{
    "status": 200,
    "message": "Reduce quantity product succesfully"
}
```
* **Search a Products (based on name)**
  - **Request** : **`GET /product/search`**
  - **Response** : 
```
{
    "status": 200,
    "result": [
        {
            "id": 2,
            "name": "Kids Meal Chicken Mix",
            "description": "food for children",
            "imageURL": "https://ibb.co/gJzxX84",
            "name_category": "Kids Meal",
            "price": 40000,
            "quantity": 6
        }
    ]
}
```
* **Pagination**
  - **Request** : **`GET /product/page`**
  - **Response** : 
```
{
    "status": 200,
    "result": [
        {
            "id": 6,
            "name": "Sparkling Lemonade",
            "description": "Medium",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "price": 18000,
            "quantity": 2,
            "date_added": "2019-10-17T22:02:39.000Z",
            "date_updated": "2019-10-17T22:02:39.000Z"
        },
        {
            "id": 7,
            "name": "Happy Soda",
            "description": "Medium 12 Oz",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "price": 22000,
            "quantity": 2,
            "date_added": "2019-10-17T22:03:05.000Z",
            "date_updated": "2019-10-17T22:03:05.000Z"
        },
        {
            "id": 8,
            "name": "Ice Tea",
            "description": "Cold",
            "imageURL": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "price": 12000,
            "quantity": 6,
            "date_added": "2019-10-18T18:58:00.000Z",
            "date_updated": "2019-10-18T18:58:00.000Z"
        }
    ]
}
```
* **Code Program Cross Origin Resource Sharing (CORS)**
    - Testing with this repo: https://github.com/njgibbon/nicks-cors-test
    - Edit the url server address = http://localhost:8080/product
```
server.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*'); //All client
	res.header('Access-Control-Allow-Header',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
	if(req.methode==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT,POST, PATCH, DELETE, GET');
		return form.success(res,200, response)	
	}
	next();
})
```
