## Grunt-fry

  A javascript task runner, build on grunt, make everthing just work as expected


### Installation

  ` sudo npm install grunt-fry -g `


### Command

  ` new < project_name > `  Start a new project

  ` build `                 Compile & compress source code to dist directory

  ` watch `                 Watch source file, compile & compress changed file to dist directory in real time


### Structure Rule

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
      
      
### Configuration

  ` engine/config/files `       Custom source-destnation map

  ` engine/config/cmd `         Custom command integration

  ` engine/config/npmtasks `    Registe Custom installed grunt plugin

  ` engine/config/app `         Custom npm tasks config

  ` engine/tasks/* `            Write your grunt tasks




