module.exports = {
	formCategory : (res,status, result)=>{
		let format= result.map(item=>{
			return {
				id:item.id_category,			
				category:`${item.name_category}`,
			};
		});
		let form ={
			status,
			result: format,
		};
		res.json(form);
	},
	success : (res, result) => {
	    let form = {
	        status: 200,
	        result
	    }

	    res.json(form);
	},
};