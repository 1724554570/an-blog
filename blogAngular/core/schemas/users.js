var mongoose = require('mongoose');

// 申明一个mongoons对象
var UsersSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    meta: {
        createtime: {
            type: Date,
            default: Date.now()
        },
        updatetime: {
            type: Date,
            default: Date.now()
        }
    },
    status: {
        type: Number,
        default: 0
    }
});

// 每次执行都会调用,时间更新操作
UsersSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createtime = this.meta.updatetime = Date.now();
    } else {
        this.meta.updatetime = Date.now();
    }
});

// 查询的静态方法
UsersSchema.statics = {
    /**
     * 查询所有数据,以更新时间排序,返回callback
     */
    fetch: function (cb) {
        return this.find().sort('meta.updatetime').exec(cb);
    },
    /**
     * 以Id查询数据
     */
    findById: function (id, cb) {
        return this.findOne({ _id: id }).sort('meta.updatetime').exec(cb);
    },
    /**
     * 查询数据唯一值是否存在
     */
    getExist: function (condition, cb) {
        return this.find({
            $or: [
                { name: condition }, { email: condition }
            ]
        }).exec(cb);
    },
    save: function (object, cb) {
        console.log(typeof object);
        this.save(object).exec(cb);

        // , function (err, users) {
        //     if (err) throw err;
        //     cb(users);
        // }
    }
};

// 暴露方法
module.exports = UsersSchema;