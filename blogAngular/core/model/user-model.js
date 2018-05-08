import { STRING, TINYINT, UUID } from "sequelize";
import sequelize from '../database/db-sequelize';
// import Article from './article-model';

/**
 * 用户模型
 */
const User = sequelize.define('sequelize_user',
    {
        user_id: {
            type: UUID,
            primaryKey: true
        },
        user_name: {
            type: STRING,
            length: '50'
        },
        user_pass: {
            type: STRING,
            length: '50'
        },
        user_avatar: {
            type: STRING
        },
        user_email: {
            type: STRING
        },
        user_device: {
            type: STRING,
            length: 10,
            defaultValue: 'pc'
        },
        user_state: {
            type: TINYINT,
            defaultValue: true
        },
    }, {
        underscored: true,
        // 并且希望 deletedAt被称为 destroyTime（请记住启用paranoid以使其工作）
        // deletedAt: 'destroy_time',
        paranoid: true
    }
);

/**
 * 添加一对多关系
 */
// User.hasMany(Article, { as: 'Articles' });

export default User;