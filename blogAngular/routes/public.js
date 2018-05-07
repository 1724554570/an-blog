import indexRouter from "./index";
import usersRouter from "./users";
import sequlizeUsersRouter from "./sequlize-user";

/**
 * 设置路由转发
 * @param {*} app 使用Express app
 */
export default function setRouter(app) {
    app.use('/', indexRouter);
    app.use('/api', usersRouter);
    app.use('/api', sequlizeUsersRouter);
}