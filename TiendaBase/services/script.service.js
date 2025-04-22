const { Script } = require('../models');

exports.getAll = () => Script.find();
exports.create = (data) => new Script(data).save();
