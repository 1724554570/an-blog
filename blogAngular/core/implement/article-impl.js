import Sequelize from "sequelize";
import { createHash } from 'crypto';
import { getLogger } from "../../lib/log-config";
import Code from '../../lib/code';
import articleService from '../service/article-service';
const loggerInfo = getLogger('info');
const _articleService = new articleService();
const Op = Sequelize.Op;

const ArticleImpl = {
    getArticleList: function (req, resp, next) {
        let pageNum = req.body.p;
        let search = req.body.search;
        let set = {};
        if (pageNum) {
            set.offset = pageNum;
        }
        if (search) {
            set.where = {
                article_title: {
                    [Op.like]: '%' + search + '%'
                }
            };
        }
        set.cb = function (res) {
            resp.json(res);
        };
        _articleService.getArticleList(set);
    },
    addArticleInfo: function (req, resp, next) {
        let body = req.body;
        let title = body.title;
        let content = body.content;
        let set = {
            title: title,
            content: content
        };
        set.cb = function (res) {
            resp.json(res);
        }
        _articleService.addArticleInfo(set);
    },
    // getArticleList:function(req,resp,next){},
    // getArticleList:function(req,resp,next){}
};
export default ArticleImpl;