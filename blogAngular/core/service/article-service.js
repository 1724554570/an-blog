import { getLogger } from "../../lib/log-config";
import { SymbolUuid, callBack } from '../../lib/util';
import Article from '../model/article-model';

const DBERROR = getLogger('dberr');
const DBINFO = getLogger('info');

export default class articleService {
    constructor() { }

    getArticleList(set) {
        let opt = {
            offset: 0,
            limit: 2
        }
        if (set.limit) {
            opt.limit = set.limit;
        }
        if (set.offset) {
            opt.offset = (set.offset - 1) * opt.limit;
        }
        if (set.where) {
            opt.where = set.where;
        }
        Article.findAndCountAll(opt).then(res => {
            DBINFO.info("getArticleList_success=" + JSON.stringify(res));
            return set.cb && set.cb({ data: res, code: 200, message: "查找成功" });
        }).catch(e => {
            DBERROR.error("getAriticleList_catch=" + JSON.stringify(e));
            return set.cb && set.cb(callBack());
        });
    }

    addArticleInfo(set) {
        let id = SymbolUuid();
        let article = {
            article_id: id,
            article_title: set.title || 'test Title',
            article_content: set.content || 'test Content',
            user_key: set.user_key || '1a13dfae-8172-4844-94be-51b0fab64f52'
        }
        Article.create(article).then(res => {
            DBINFO.info("addArticleInfo_success=" + JSON.stringify(res));
            let jsonRes = res.get({ plain: true });
            return set.cb && set.cb({ data: jsonRes, code: 200, message: "创建成功" });
        }).catch(e => {
            DBERROR.error("getAriticleList_catch=" + JSON.stringify(e));
            return set.cb && set.cb(callBack());
        });
    }
}