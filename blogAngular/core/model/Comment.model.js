import { TEXT, TINYINT, UUID } from "sequelize";
import sequelize from '../database/db-sequelize';

/**
 * 文章评论模型
 */
const Comment = sequelize.define('sequelize_comment',
    {
        comment_id: {
            type: UUID,
            primaryKey: true
        },
        comment_desc: {
            type: TEXT
        },
        comment_replyid: {
            type: UUID
        },
        comment_state: {
            type: TINYINT,
            defaultValue: 1
        }

    }, {
        underscored: true,
        // 并且希望 deletedAt被称为 destroyTime（请记住启用paranoid以使其工作）
        // deletedAt: 'destroyTime',
        paranoid: true
    }
);

export default Comment;