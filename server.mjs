import * as http from 'http'
import * as crypto from 'crypto'
import Koa from 'koa'
import Router from 'koa-router'
import socketIO from 'socket.io'
import next from 'next'
import 'isomorphic-fetch'

const port = process.env.PORT && parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'

const n = next({ dev })
const handle = n.getRequestHandler()
const app = new Koa()
const router = new Router()
const server = http.createServer(app.callback())
const io = socketIO(server)

let userCount = 0
let roomMap = {}

n.prepare()
    .then(() => {
        router.get('/', async (ctx) => {
            await n.render(ctx.req, ctx.res, '/', ctx.query);
            ctx.respond = false
        })
        router.get('/room/create', async (ctx) => {
            const roomId = crypto.randomBytes(8).toString('hex')
            ctx.response.body = {
                status: 200,
                result: {
                    roomId
                }
            }
        })

        // 如果没有配置nginx做静态文件服务，下面代码请务必开启
        router.get('*', async (ctx) => {
           await handle(ctx.req, ctx.res);
           ctx.respond = false
        })
        // Koa doesn't seems to set the default statusCode.
        // So, this middleware does that.
        app.use(async (ctx, next) => {
            ctx.res.statusCode = 200
            await next()
        })
        app.use(router.routes())

        io.of('/room').on('connection', (socket) => {
            socket.on('login', (msg) => {
                userCount++
                console.log(userCount)
            })
            socket.on('disconnect', () => {
                userCount--
            })
        })

        server.listen(port, () => {
            console.log(`listening on *: ${port}`);
        })
    })