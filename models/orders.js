const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const PUBLIC_FIELDS = '_id code state user items createdAt';

const orderSchema = new Schema(
	{
		code: {
			type: Number
		},
		state: {
			type: String,
			required: true,
			default: 'DRAFT',
			enum: ['DRAFT', 'REQUESTED', 'DONE', 'ANULLED']
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		location: {
			type: {
				type: String,
				enum: ['Point'],
				required: false
			},
			coordinates: {
				type: [Number],
				required: false
			}
		},
		items: [
			{
				qty: {
					type: Number,
					required: true,
					default: 1
				},
				meal: {
					required: true,
					type: Schema.Types.ObjectId,
					ref: 'users'
				}
			}
		]
	},
	{ timestamps: true }
);
orderSchema.plugin(mongoosePaginate);
orderSchema.plugin(AutoIncrement, { inc_field: 'code' });

const orderModel = mongoose.model('orders', orderSchema);

module.exports = {
	findOne: id => {
		return new Promise(function(resolve, reject) {
			orderModel
				.findById(id)
				.select(PUBLIC_FIELDS)
				.populate([
					{
						path: 'user',
						select: 'name email',
						model: 'users'
					},
					{
						path: 'items.meal',
						select: 'name price',
						model: 'meals'
					}
				])
				.exec()
				.then(doc => resolve(doc))
				.catch(err => reject(err));
		});
	},
	find: (page = 1, limit = 10) => {
		return new Promise(function(resolve, reject) {
			orderModel.paginate(
				{},
				{
					sort: { name: 1 },
					select: PUBLIC_FIELDS,
					page,
					limit,
					populate: [
						{
							path: 'user',
							select: 'name email',
							model: 'users'
						},
						{
							path: 'items.meal',
							select: 'name price',
							model: 'meals'
						}
					]
				},
				(err, items) => {
					if (err) reject(err);
					resolve(items);
				}
			);
		});
	},
	findMyOrders: (page = 1, limit = 10, user) => {
		return new Promise(function(resolve, reject) {
			orderModel.paginate(
				{ user: user },
				{
					sort: { name: 1 },
					select: PUBLIC_FIELDS,
					page,
					limit,
					populate: [
						{
							path: 'user',
							select: 'name email',
							model: 'users'
						},
						{
							path: 'items.meal',
							select: 'name price',
							model: 'meals'
						}
					]
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
			const order = new orderModel({
				...data
			});
			order
				.save()
				.then(result => resolve(result))
				.catch(err => reject(err));
		});
	},
	update: (id, data) => {
		return new Promise(function(resolve, reject) {
			orderModel
				.update({ _id: id }, { $set: data })
				.exec()
				.then(result => resolve(result))
				.catch(err => reject(err));
		});
	}
};
