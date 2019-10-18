const connection = require('../Configs/connect');
module.exports= {
	getCategories: ()=>{
		return new Promise((resolve, reject)=>{
			connection.query('SELECT id_category, name_category FROM `categories`',(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject('Data not found',err);
				}
			});
		});
	},
	postCategories: req =>{
		return new Promise((resolve, reject)=>{
			const body= req.body;
			if(body.name_category!=null && body.name_category!=""){
				connection.query(
					'INSERT INTO categories SET name_category=?',
					[body.name_category],
					(err, response) =>{
					if(!err){
						resolve(response);
					} else{
						reject('Cannot added category!',err);
					}
				});
			}else{
				resolve("Cannot added category!");
			}
		});
	},
	updateCategories: req =>{
		return new Promise((resolve, reject)=>{
			let keyid= req.params.keyid;
			if(req.body.name_category!=null&& req.body.name_category!=""){
				connection.query(
					`UPDATE categories SET name_category="${req.body.name_category}" WHERE id_category="${keyid}"`,
					(err, response) =>{
					if(!err){
						resolve(response);
					} else{
						reject('Cannot updated category! ',err);
					}
				});
			}else{
				resolve("Cannot updated category!");
			}
		});
	},

	deleteCategories: req =>{
		return new Promise((resolve, reject)=>{
			let keyid= req.params.keyid;
			connection.query(
				`DELETE FROM categories WHERE id_category LIKE "${keyid}"`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject('Cannot delete category! ',err);
				}
			});
		});
	},
};