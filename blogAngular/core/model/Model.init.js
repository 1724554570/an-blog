import { createHash } from 'crypto';
import { getLogger } from '../../lib/log-config';
import { SymbolUuid } from '../../lib/util';
import User from './User.model';
import Article from './Article.model';
import Comment from './Comment.model';

const DBERROR = getLogger('dberr');
const _force = true;

(async () => {
    await Comment.drop();
    await Article.drop();
    await User.drop();
    await User.sync({ force: _force }).then(() => { DBERROR.info("Users 表已创建"); }).catch(e => { DBERROR.error(JSON.stringify(e)); });
    await Article.sync({ force: _force }).then(() => { DBERROR.info("Articles 表已创建"); }).catch(e => { DBERROR.error(JSON.stringify(e)); });
    await Comment.sync({ force: _force }).then(() => { DBERROR.info("Comments 表已创建"); }).catch(e => { DBERROR.error(JSON.stringify(e)); });

    // force: true 如果表已经存在，将会丢弃表 { force: true }
    // User.sync({ force: _force }).then(() => {
    //     DBERROR.info("Users 表已创建");
    //     Article.sync({ force: _force }).then(() => {
    //         DBERROR.info("Articles 表已创建");
    //         Comment.sync({ force: _force }).then(() => {
    //             DBERROR.info("Comments 表已创建");
    //         }).catch(e => {DBERROR.error(JSON.stringify(e));});
    //     }).catch(e => { DBERROR.error(JSON.stringify(e));});
    // }).catch(e => { DBERROR.error(JSON.stringify(e)); });

})();

const DbInitialization = {
    User: User,
    Article: Article,
    Comment: Comment
};

/**
 * 实例化数据库表
 */
export default DbInitialization;