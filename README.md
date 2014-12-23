## Grunt-fry

  A javascript task runner, build on grunt, make everthing just work as expected


### Installation

  ` sudo npm install grunt-fry -g `


### Command
  
  ` fry < option > `

##### supported options: 

  ` new < project_name > `  Start a new project

  ` build `                 Compile & compress source code to dist directory

  ` clean `                 clean dist directory

  ` watch `                 Watch source file, compile & compress changed file to dist directory in real time

  ` help `                  help info

  ` jshint `, ` concat `, ` copy `, ` cssmin `, ` less `, ` uglify `


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

      | ---- sub                                   |
              | ---- *.less                       | ---- *.less.min.css
              | ---- detail/*                      | 
              | ---- detail.less                   | ---- sub/detail.less.min.css
              | ---- list/*                        | 
              | ---- list.less                     | ---- sub/list.less.min.css

 
    -- js ( css )
      | ---- *.js                                  | ---- *.min.js
      | ---- global/*.js                           | ---- global.min.js

      | ---- sub               
              | ---- *.js                          | ---- sub/*.min.js
              | ---- detail/*.js                   | ---- sub/detail.min.js
      
      
### Configuration

  ` engine/config/files `       Custom source-destnation map

  ` engine/config/cmd `         Custom command integration

  ` engine/config/npmtasks `    Registe Custom installed grunt plugin

  ` engine/config/app `         Custom npm tasks config

  ` engine/tasks/* `            Write your grunt tasks




