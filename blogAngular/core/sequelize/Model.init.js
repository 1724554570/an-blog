import { createHash } from 'crypto';
import { getLogger } from '../../lib/log-config';
import { SymbolUuid } from '../../lib/util';
import User from './User.model';
import Article from './Article.model';
import Comment from './Comment.model';

const loggerDb = getLogger('dberr');
const _force = false;

// force: true 如果表已经存在，将会丢弃表 { force: true }
 User.sync({ force: _force }).then(() => {
     loggerDb.info("Users 表已创建");
     let uuid = SymbolUuid();
     // uuid = '5b43fd6b-c28b-433a-bc90-00e871cfc687';
     let user_name = 'machine';
     let user_pass = '123456';
     let user_email = '1724554570@qq.com';
     let md5Pass = createHash('md5');
     // user_pass = md5Pass.update(user_pass).digest('hex');
     // User.create({ user_id: uuid, user_name: user_name, user_pass: user_pass, user_email: user_email })
     //     .then(result => {
     //         console.log(result.get('user_name'));
     //         console.log(result.get('user_pass'));
     //     }).catch(err => {
     //         loggerDb.error(JSON.stringify(err));
     //     });
     Article.sync({ force: _force }).then(() => {
         loggerDb.info("Articles 表已创建");
         Comment.sync({ force: _force }).then(() => {
             loggerDb.info("Comments 表已创建");
         });
     });
 });

const DbInitialization = {
    User: User,
    Article: Article,
    Comment: Comment
};
export default DbInitialization;