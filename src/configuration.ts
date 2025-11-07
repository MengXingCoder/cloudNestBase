import { readFileSync } from "fs";
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as _ from 'lodash'

//基本公共的config配置
const yamlConfigFileName = 'config.yml'
//拿到公共配置文件的绝对路径
const filePth = join(__dirname, '../config', yamlConfigFileName)
//拿到生产或者开发环境的文件配置路径
const envFilePath = join(__dirname, '../config', `config_${process.env.NODE_ENV || 'development'}.yml`)

//因为configmodule的load方法需要导入一个函数，
// 就是appmodule 里的
//  ConfigModule.forRoot({
//         isGlobal: true,
//         envFilePath,
//         //load 是需要一个函数，包含着键值对，
//         load: [() => dotenv.config({ path: ".env" })]
//     })

//读取配置文件
const commonConfig = yaml.load(readFileSync(filePth, 'utf8'))
const envConfig = yaml.load(readFileSync(envFilePath, 'utf8'))

console.log(commonConfig, envConfig, _.merge(commonConfig, envConfig))
//合并配置文件并导出
export default () => { return _.merge(commonConfig, envConfig) }