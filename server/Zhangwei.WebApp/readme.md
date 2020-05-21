# Zhangwei.WebApp

>**现在还处于开发阶段，数据库不需要通过下面的方式生成，
>直接运行即可，自动生成库,Zhangwei.WebApp目录下有数据库，则删掉就会重新生成。**

**运行此项目需要把appsettings.json下的ServerIp改成自己的Ip**

此项目的数据库相关的实现使用的框架是 .Net Core EF Core

使用类库 Microsoft.EntityFrameworkCore.Sqlite

目前支持的数据库是 sqlite

在**程序包管理器控制台**执行如下脚本

在**EDoc2.InDrive\apm\server**目录下执行,模型项目和启动的项目是两个，所以要指定上

初始化

```
Add-Migration initial -o Migrations -v -p Zhangwei.Data -s Zhangwei.WebApp
```


添加新的数据迁移版本
```
Add-Migration v1.0 -o Migrations -v -p Zhangwei.Models -s Zhangwei.WebApp
```

撤销添加版本

```
Remove-Migration -v -p Zhangwei.Models -s Zhangwei.WebApp
```

更新到数据库

```
Update-Database -p Zhangwei.Models -s Zhangwei.WebApp
```

更新到指定版本数据库

```
Update-Database initial -p Zhangwei.Models -s Zhangwei.WebApp
```

## 启动web端服务

没有安装nodejs要先装 node 10.16.0 ，然后安装 yarn
命令是`npm install -g yarn`，
最后进入 `wwwroot/Client` ，执行 `run.bat`脚本

可以通过 http://localhost:7001 访问

## 启动Platform 项目

在appsetting.json文件里面把ServerIp改为本机ip，然后Ctrl+F5执行，需要先启动web端服务，可以通过 http://localhost 访问

## 指令无效的情况下，先执行如下指令

```
Import-Module C:\Users\Administrator\.nuget\packages\microsoft.entityframeworkcore.tools\3.1.3\tools\EntityFrameworkCore.psd1
```
