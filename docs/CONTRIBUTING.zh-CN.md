# 贡献指南

[View English / 查看英语](./../CONTRIBUTING.md)

欢迎您的贡献！请遵循以下指南：

Fork 存储库。  
为您的功能或 bug 修复创建一个新分支。  
为您的更改编写代码。

<!-- 使用 [Prettier](https://prettier.cn) 格式化您的代码。   -->

使用描述性消息提交您的更改。  
**注意：更改消息 _必须_ 符合 [下文](#提交消息格式) 的格式**  
将您的分支推送到您的 fork。  
向主存储库提交拉取请求。

## 提交消息格式

提交信息遵守 [Angular 团队提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，即：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

具体含义见下文
可以安装 [此 VSCode 扩展](https://marketplace.visualstudio.com/items?itemName=redjue.git-commit-plugin) 辅助填写。  

### 标签含义

#### type

必须为下列类型之一：  
|     类型     |                         解释                    |
|--------------|------------------------------------------------|
| 🎉 init     | 项目初始化                                      |
| ✨ feat     | 添加新特性                                      |
| 🐞 fix      | 修复 bug                                        |
| 📃 docs     | 仅仅修改文档                                     |
| 🌈 style    | 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑  |
| 🦄 refactor | 代码重构，没有加新功能或者修复 bug                |
| 🎈 perf     | 优化相关，比如提升性能、体验                       |
| 🧪 test     | 增加测试用例                                     |
| 🔧 build    | 依赖相关的内容                                   |
| 🐎 ci       | ci 配置相关 例如对 k8s，docker 的配置文件的修改    |
| 🐳 chore    | 改变构建流程、或者增加依赖库、工具等               |
| ↩ revert    | 回滚到上一个版本                                  |

#### scope
**可选。**  
范围。  
范围可以是指定提交更改位置的任何内容。例如 `$location`、`$browser`、`$compile`、`$rootScope`、`ngHref`、`ngClick`、`ngView` 等......  
当更改影响多个范围时，可以使用 *。  

#### subject
主题。  
该主题包含对更改的简明描述：  
使用祈使式现在时：“change”而不是“changed”或“changes”  
~~不要将首字母大写~~ 其实可以首字母大写的  
末尾没有点 （.）  

#### BLANK LINE
空行。  

#### body
主体。  
就像在主语中一样，使用祈使式现在时：“change”而不是“changed”或“changes”。主体应该包括改变的动机，并将其与以前的行为进行对比。  

#### footer
页脚。  
页脚应包含有关重大更改的任何信息，并且也是引用此提交关闭的 GitHub Issue 的位置。  
重大变更应以 `BREAKING CHANGE`： 一词开头，并带有一个空格或两个换行符。然后，提交消息的其余部分将用于此目的。  