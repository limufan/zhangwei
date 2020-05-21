# Read Me

Model存储项目

- MapModels - EF Core 和数据库映射的模型
- DTOs - 存储返回到前端的数据传输模型
- Enums - 存放一些常用的枚举
- Context - EFCore上下文和数据库初始化数据
- Migrations - 存放数据迁移内容
- RequestParams - 存放请求参数模型
- RequestResults - 存放请求返回模型
- RequestResults/DTOs - 存放一些公共DTO（数据传输对象）
- RequestResults/UserLoginDTOs - 存放用户登录相关的DTO，其他也可以进行如此定制

大部分情况下返回MapModels下的模型即可，有特殊数据定制的时候才定义DTO来返回数据

