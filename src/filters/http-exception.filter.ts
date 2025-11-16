
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";



@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp() // ctx就是上下文的意思 ，简单理解为上一步从哪来的，下一步是去哪
        //一般是拿到请求和响应
        const resp = ctx.getResponse()
        const req = ctx.getRequest()
        //http状态码
        const httpStatusCode = exception.getStatus()
        console.log('httpException', exception, resp)
        resp.status(httpStatusCode).json({
            code: httpStatusCode,
            time: new Date().toISOString(),
            method: req.method,
            url: req.url,
            message: exception.message || exception.name
        })
        // throw new Error("Method not implemented.");
    }

}
