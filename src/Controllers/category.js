const categoryModel = require('../Models/category');
const form = require('../Helpers/form');
module.exports = {
	getCategories:(req, res)=>{
		categoryModel
		.getCategories()
		.then((response)=>{
			form.success(res, 200, response)
		})
		.catch((err)=>{
			res.json(err)
		});
	},
	postCategories:(req, res)=>{
		categoryModel
		.postCategories(req)
		.then((response)=>res.send({
	        status: 200,
	        message: "created category successfully!",
	    }))
		.catch((err)=>{
			res.json(err)
		});
	},
	updateCategories:(req, res)=>{
		categoryModel
		.updateCategories(req)
		.then((response)=>res.send({
	        status: 200,
	        message: "Update category Successfully!",
	    }))
		.catch((err)=>{
			res.json(err)
		});
	},
	deleteCategories:(req, res)=>{
		categoryModel
		.deleteCategories(req)
		.then((response)=>res.send({
	        status: 200,
	        message: "Delete category successfully!",
	    }))
		.catch((err)=>{
			res.json(err)
		});
	},
};