# 开始开发

## C#项目

### 一、环境安装

* 下载并安装Visual Studio 2015
* 安装4个.NET core包（也可跟其他同事要一下）
    * dotnet-dev-win-x64.1.0.0-preview2.1-003155.exe
    * dotnet-dev-win-x64.1.0.0-preview2-1-003177.exe
    * dotnet-win-x64.1.1.0-preview1-001100-00.exe
    * DotNetCore.1.0.1-VS2015Tools.Preview2.0.3.exe
* 下载安装web ied, 例如webstorm、vscode
* 安装配置：node、gulp、webpack等

### 二、项目开发简易流程

1. clone代码，并初始化项目，c#代码库采用subtree
	* git clone [地址]
	* git pull
	* git submodule init
	* git submodule update
	* git submodule foreach git checkout master
	* dotnet restore -s http://nga.aihuishou.com/nuget

2. 新建开发分支（PS:先咨询后端是否已经建好相应需求的分支，以免重复）

3. 将其他同级的其他分支切换到对应分支，并更新到最新版本

4. 提交代码
	* git add .
	* git commit -m '[提示内容]'
	* git pull --rebase origin [分支名]
	* git push origin 分支名:分支名

5. 将代码合并到测试服务上 （**注意：一定是将代码合到test分支上**）
	* 测试远程服务地址

		> IP：          192.168.3.116

    	> 用户名：      administrator

   		> 密码：        L00easy.test

6. 发布到测试环境，发送提测邮件（发给测试、产品，抄送相关负责人、开发等，邮件格式固定，可咨询徐迅、李兵）

7. 提交merge request http://code.aihuishou.com/

8. 公司每周二、周四发布日

## 前后端分离项目环境搭建

### 依据项目文档
* 依据每个项目的README.md文件
* 一般会分为dev环境和production环境
   *  npm install
   *  dev：npm run dev
   *  production: npm run prod