const connection = require('../Configs/connect');
module.exports= {
	getProducts: () =>{
		return new Promise((resolve, reject)=>{
			connection.query(
				`SELECT * FROM products JOIN categories ON categories.id_category=products.id_category`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject('Data not found!',err);
				}
			});
		});
	},
	getProductsId: req =>{
		return new Promise((resolve, reject)=>{
			let keyId= req.params.keyId;
			connection.query(
				`SELECT * FROM products WHERE id_product = ?`,
				[keyId],
				(err, response) =>{
				if(!err){
					resolve(response);
				}else{
					reject('Data not found!',err);
				}
			});
		});
	},
	postProducts: req =>{
		return new Promise((resolve, reject)=>{
			let body= req.body;
			if(req.body.name_product!= null && req.body.desc_product!= null && req.body.image_product!= null && req.body.id_category!= null){
				if(req.body.price_product!= null && req.body.price_product!=0 && req.body.price_product >0){
					if(req.body.quantity_product!= null && req.body.quantity_product!=0 && req.body.quantity_product >0){

						connection.query(
							'INSERT INTO products SET name_product=?, desc_product=?, image_product=?, id_category=?, price_product=?, quantity_product=?',
							[body.name_product, body.desc_product, body.image_product, body.id_category, body.price_product, body.quantity_product],
							(err, response) =>{
							if(!err){
								resolve(response);
							} else{
								reject(err);
							}
						});
					}else{
					reject("Cannot added product!")
				}
				}else{
					reject("Cannot added product!")
				}
			}else{
					reject("Cannot added product!")
				}
		});
	},
	updateProducts: (req, value1) =>{
		return new Promise((resolve, reject)=>{
			let db=value1[0];
			let keyId=req.params.keyId;

			let name_product= req.body.name_product ? req.body.name_product : db.name;
			let desc_product= req.body.desc_product ? req.body.desc_product : db.description;
			let image_product= req.body.image_product ? req.body.image_product : db.imageURL;
			let id_category= req.body.id_category ? req.body.id_category : db.id_category;
			let price_product= req.body.price_product ? req.body.price_product : db.price;
			let quantity_product= req.body.quantity_product ? req.body.quantity_product : db.quantity;

			connection.query(
				`UPDATE products SET name_product=?, desc_product=?, image_product=?, id_category=?, price_product=?, quantity_product=? WHERE id_product = ?`,
				[name_product, desc_product, image_product, id_category, price_product, quantity_product, keyId],
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject('Cannot Updated Products!',err);
				}
			});
		});
	},
	deleteProducts: req =>{
		return new Promise((resolve, reject)=>{
			let keyId= req.params.keyId;
			connection.query(
				`DELETE FROM products WHERE id_product = "${keyId}"`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},

	searchProducts: req =>{
		return new Promise((resolve, reject)=>{
			let name= req.name;
			console.log(name)
			connection.query(
				`SELECT id_product, name_product,desc_product, image_product, name_category, price_product, quantity_product FROM products JOIN categories ON categories.id_category=products.id_category WHERE name_product LIKE "%${name}%"`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},
	sortProducts: (req) => {
		return new Promise((resolve, reject)=>{
			let sortBy= req.sortBy;
			let orderBy= req.orderBy;
			connection.query(
				`SELECT * FROM products JOIN categories ON categories.id_category=products.id_category Order By ${sortBy} ${orderBy}`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(`Sorting by name, category and date`,err);
				}
			});
		});
	},
	addQty: (req) =>{
		return new Promise((resolve, reject)=>{
			let keyId=req.params.keyId;
			let addQty= req.body;
			if(addQty.quantity_product!=null && addQty.quantity_product!=0 && addQty.quantity_product>0){
				connection.query(
					`UPDATE products SET quantity_product= quantity_product + "${addQty.quantity_product}" WHERE id_product = "${keyId}"`,
					(err, response) =>{
					if(!err){
						resolve(response);
					} else{
						reject("Cannot add quantity product",err);
					}
				});
			}
			else{
				reject("Cannot add quantity product");
			}
		});
	},
	reduceQty: (req, value1) =>{
		return new Promise((resolve, reject)=>{
			let db = value1[0];
			let keyId =req.params.keyId;
			let reduceQty = req.body;

			if(reduceQty.quantity_product!=null && reduceQty.quantity_product!=0 && reduceQty.quantity_product>=0){
				if(reduceQty.quantity_product<db.quantity){
					connection.query(
						`UPDATE products SET quantity_product= quantity_product - "${reduceQty.quantity_product}" WHERE id_product = "${keyId}"`,
						(err, response) =>{
						if(!err){
							resolve(response);
						} else{
							reject(err);
						}
					});
				}else{
					reject(`Cannot reduce more than ${db.quantity} `);
				} 
			}
			else{
				reject("Cannot reduce quantity product!");
			}
		});
	},
	countProducts: () =>{
		return new Promise((resolve, reject)=>{
			connection.query(
				`SELECT count(*) as count FROM products`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject("Data not found!",err);
				}
			});
		});
	},
	pageProducts: (req, value1) =>{
		return new Promise((resolve, reject)=>{
			let count = value1[0];
			let page  = req.page;
			let limit = req.limit;
			let offset= ((page-1)*limit);
			console.log(count.count)

			if(offset<=count.count){
				connection.query(
					`SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`,
					(err, response) =>{
					if(!err){
						resolve(response);
					} else{
						reject('Data not found!',err);
					}
				});
			}else{
				reject('Data not found!');
			}
		});
	},

};