-- src                                       -- dist
    |----- css        concat, compress           |------ css
    |----- less       compile, concat, compress  |
    |----- img        compress                   |------ img
    |----- js         concat, compress           |------ js
    |----- views      compress                   |------ views

-- less
    | ---- *.less                                | ---- *.less.min.css
    | ---- global/*                              |
    | ---- global.less                           | ---- global.less.min.css        

    | ---- partial                               |
            | ---- /*.less                       | ---- *.less.min.css
            | ---- detail/*                      | 
            | ---- detail.less                   | ---- partial/detail.less.min.css
            | ---- list/*                        | 
            | ---- list.less                     | ---- partial/list.less.min.css

-- js
    | ---- *.js                                  | ---- *.min.js
    | ---- global/*.js                           | ---- global.min.js
    | ---- global/plugin/*.js                    | ---- global/plugin.min.js


### command

fry new  新建项目

fry build 打包发布

engine/config/app.js 
override,自定义npmtasks 配置，收入grunt.initconfig()

engine/config/files.js 
自定义拓展的src/dest对应

engine/config/npmtasks.js 
注册自定义的npmtasks




