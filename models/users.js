const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utils/jwt');

const Schema = mongoose.Schema;

const PUBLIC_FIELDS = '_id name email rol';
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		rol: {
			type: String,
			required: true,
			default: 'USER',
			enum: ['USER', 'ADMIN']
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);
userSchema.plugin(mongoosePaginate);

userSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			if (err)
				reject({
					error: true,
					message: 'Necesitamos la contraseña!'
				});
			resolve(isMatch);
		});
	});
};

const userModel = mongoose.model('users', userSchema);

module.exports = {
	findOne: id => {
		return new Promise(function(resolve, reject) {
			userModel
				.findById(id)
				.select(PUBLIC_FIELDS)
				.exec()
				.then(doc => resolve(doc))
				.catch(err => reject(err));
		});
	},
	find: (page = 1, limit = 10) => {
		return new Promise(function(resolve, reject) {
			userModel.paginate(
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
			const usuario = new userModel({
				...data
			});
			usuario
				.save()
				.then(result => resolve(result))
				.catch(err => reject(err));
		});
	},
	update: (id, data) => {
		return new Promise(function(resolve, reject) {
			userModel
				.update({ _id: id }, { $set: data })
				.exec()
				.then(result => resolve(result))
				.catch(err => reject(err));
		});
	},
	signIn: data => {
		return new Promise((resolve, reject) => {
			userModel
				.findOne({ email: data.email })
				.exec()
				.then(usuario => {
					if (!usuario) return reject({ message: 'Usuario no encontrado' });
					usuario
						.comparePassword(data.password)
						.then(async valid => {
							if (!valid) {
								return reject({ message: 'Contraseña inválida' });
							}
							resolve({
								name: usuario.name,
								rol: usuario.rol,
								token: await utils.generateToken({
									email: usuario.email,
									rol: usuario.rol
								})
							});
						})
						.catch(err => reject(err));
				})
				.catch(err => reject(err));
		});
	},
	signUp: data => {
		return new Promise(function(resolve, reject) {
			const usuario = new userModel({
				name: data.name,
				email: data.email,
				password: data.password
			});
			usuario
				.save()
				.then(async result => {
					resolve({
						name: result.name,
						rol: result.rol,
						token: await utils.generateToken({
							email: result.email,
							rol: result.rol
						})
					});
				})
				.catch(err => reject(err));
		});
	},
	findByMail: email => {
		return new Promise(function(resolve, reject) {
			userModel
				.findOne({ email: email })
				.select(PUBLIC_FIELDS)
				.exec()
				.then(doc => resolve(doc))
				.catch(err => reject(err));
		});
	}
};
