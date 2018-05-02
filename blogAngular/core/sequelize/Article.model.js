import { STRING, TEXT, TINYINT, UUID } from "sequelize";
import sequelize from '../database/db-sequelize';

import Comment from './Comment.model';

/**
 * 文章模型
 */
const Article = sequelize.define('sequelize_article',
    {
        article_id: {
            type: UUID,
            primaryKey: true
        },
        article_title: {
            type: STRING
        },
        article_content: {
            type: TEXT
        },
        article_state: {
            type: TINYINT,
            defaultValue: 1
        }

    }, {
        underscored: true,
        // 并且希望 deletedAt被称为 destroyTime（请记住启用paranoid以使其工作）
        // deletedAt: 'deleted_at',
        paranoid: true
    }
);

/**
 * 添加一对多关系
 * 一个文章对应多个评论
 */
Article.hasMany(Comment, {as: 'Comments'});

export default Article;