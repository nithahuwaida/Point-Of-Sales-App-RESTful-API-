const productModel = require('../Models/product');
const form = require('../Helpers/formProduct');
module.exports = {
	getProducts:(req, res)=>{
		productModel
		.getProducts()
		.then((response)=>{
			form.success(res, 200, response)
		})
		.catch((err)=>{
			res.json(err)
		});
	},
	getProductsId:(req, res)=>{
		productModel
		.getProductsId(req)
		.then((response)=>{
			form.success(res,200, response)
		})
		.catch((err)=>{
			res.json(err)
		});
	},
	postProducts:(req, res)=>{
		productModel
		.postProducts(req)
		.then((response)=>res.send({
	        status: 200,
	        message: "Created product successfully!",
	    }))
		.catch((err)=>{
			res.json(err)
		});
	},
	updateProducts:(req, res)=>{
		productModel
		.getProductsId(req)
		.then(response=>{
			return form.format(response);
		})
		.then(value1 =>{
			productModel
			.updateProducts(req,value1)
			.then((response)=>res.send({
		        status: 200,
		        message: "Successfully changed the product!",
		     }))
				.catch(err=>{
				res.json(err)
			})
		})
		.catch(err=>{
			res.json(err)
		});
	},
	deleteProducts:(req, res)=>{
		productModel
		.deleteProducts(req)
		.then((response)=>res.send({
	        status: 200,
	        message: "Successfully deleted the product!",
	    }))
		.catch((err)=>{
			res.json(err)
		});
	},
	searchProducts:(req, res)=>{
		req= req.query;
		productModel
		.searchProducts(req)
		.then((response)=>{
			form.success(res, 200, response)
		})
		.catch((err)=>{
			res.json(err)
		});
	},
	sortProducts:(req, res)=>{
		req= req.query;
		productModel
		.sortProducts(req)
		.then((response)=>{
			form.success(res, 200, response)
		})
		.catch((err)=>{
			res.json(err)
		});
	},
	addQty:(req, res)=>{
		productModel
		.addQty(req)
		.then((response)=>res.send({
	        status: 200,
	        message: "Add quantity product succesfully",
	    }))
		.catch((err)=>{
			res.json(err)
		});
	},
	reduceQty:(req, res)=>{
		productModel
		.getProductsId(req)
		.then(response=>{
			return form.format(response);
		})
		.then(value1 =>{
			productModel
			.reduceQty(req,value1)
			.then((response)=>res.send({
		        status: 200,
		        message: "Reduce quantity product succesfully",
		    }))
			.catch(err=>{
				res.json(err)
			})
		})
		.catch(err=>{
			res.json(err)
		});
	},
	pageProducts:(req, res)=>{
		req= req.query;
		productModel
		.countProducts()
		.then(response=>{
			return form.count(response);
		})
		.then(value1 =>{
			console.log(value1);
			productModel
			.pageProducts(req,value1)
			.then(response=>{
				form.success(res, 200, response)
			})
			.catch((err)=>res.send({
		        status: 200,
		        message: "Data not found!",
		    }))
		})
		.catch(err=>{
			res.json(err)
		});
	},
};