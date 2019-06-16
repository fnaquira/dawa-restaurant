const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PUBLIC_FIELDS = '_id name price image';

const mealSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		price: {
			type: Number
		},
		image: {
			type: String
		}
	},
	{ timestamps: true }
);
mealSchema.plugin(mongoosePaginate);

const mealModel = mongoose.model('meals', mealSchema);

module.exports = {
	findOne: id => {
		return new Promise(function(resolve, reject) {
			mealModel
				.findById(id)
				.select(PUBLIC_FIELDS)
				.exec()
				.then(doc => resolve(doc))
				.catch(err => reject(err));
		});
	},
	find: (page = 1, limit = 10) => {
		return new Promise(function(resolve, reject) {
			mealModel.paginate(
				{},
				{
					sort: { name: 1 },
					select: PUBLIC_FIELDS,
					page,
					limit
				},
				(err, items) => {
					if (err) reject(err);
					resolve(items);
				}
			);
		});
	},
	create: data => {
		return new Promise(function(resolve, reject) {
			const meal = new mealModel({
				...data
			});
			meal
				.save()
				.then(result => resolve(result))
				.catch(err => reject(err));
		});
	},
	update: (id, data) => {
		return new Promise(function(resolve, reject) {
			mealModel
				.update({ _id: id }, { $set: data })
				.exec()
				.then(result => resolve(result))
				.catch(err => reject(err));
		});
	}
};
