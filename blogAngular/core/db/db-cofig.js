/**
 * 数据库配置
 */
export const mongdbDb = {
    cookieSecret: 'myblog',
    db: 'blogAngular',
    host: 'localhost',
    port: 27017,
    urlConnection: 'mongodb://machine:123456@localhost/blogAngular'
};

export const mysqlDb = {
    connectionLimit : 10,
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'db_blog'
};