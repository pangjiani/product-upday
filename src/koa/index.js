const koa = require("koa");
const app = new koa();
const router = require("koa-router")();
// jsonwebtoken 用来生成 token
const jsonwebtoken = require("jsonwebtoken");
// koa-bodyparser  用来解析用户 post 请求的数据
const bodyparser = require("koa-bodyparser");
// 引入密钥，生成  token 的时候需要密钥
const { secret } = require("./privateConf");
// koa-jwt 用来访问页面时验证token，实现路由权限控制
const koaJwt = require("koa-jwt")



// 设置 url 和数据
router.get("/api/getPicList", async (ctx) => {
  ctx.body = {
    data: [
      "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
      "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
      "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
      "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
      "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
      "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
    ],
    code: 0,
    msg: "成功",
  }
})
/**** 添加 /api/login 接口 ********/
const userNameList = ["jane"]
router.post("/api/login", async (ctx) => {
  const { body } = ctx.request
  try {
    const { userName } = body
    // 匹配用户名是否相等
    if(userNameList.includes(userName)) {
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: "登录成功",
        data: {
          // 生成 token 返回给客户端
          token: jsonwebtoken.sign(
            {
              data: userName,
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            secret
          )
        }
      }
    } else {
      ctx.status = 401
      ctx.body = {
        code: 1,
        message: "账号错误",
        data: null,
      }
    }
  } catch(error) {
    ctx.throw(500);
  }
})
// 引入 bodyParser 中间件
app.use(bodyparser());

// 去掉 koa 跨域设置：
/* 通过 CORS 配置解决跨域*/
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "http://pc.jiani.online"); // 添加前端的域名
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method === "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});
// 路由权限控制，除了`path`里匹配的路径，都需要验证 token
app.use(koaJwt({ secret }).unless({path: [/^\/api\/login/]}))

// 启动路由
app.use(router.routes());
// 设置响应头
app.use(router.allowedMethods());

// 监听端口
app.listen(3002);
