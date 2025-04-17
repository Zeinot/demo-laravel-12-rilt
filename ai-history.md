i am using laravel 12 and react starter kit with shadcn ui
in this file write a history of all my prompts and everything you did with timestamps so that ai can keep track of all the changes and updates


at each step write the following:
1. prompt
2. action
3. result
4. timestamp

and also i plan to make a presentation in french for class so make sure to write in an another file steps for the presentation in presentation.md, each step should be numbered and include the following:
1. title
2. explanations
3. the name of the files and also the edits that were made to the files
4. timestamp
these things should be in french

i ran 
PS C:\Users\Zeinot\Desktop\Laravel12-Demo\demo-laravel-12-rilt> php artisan make:model Todo -m

   INFO  Model [C:\Users\Zeinot\Desktop\Laravel12-Demo\demo-laravel-12-rilt\app\Models\Todo.php] created successfully.

   INFO  Migration [C:\Users\Zeinot\Desktop\Laravel12-Demo\demo-laravel-12-rilt\database\migrations/2025_04_17_174106_create_todos_table.php] created successfully.  

PS C:\Users\Zeinot\Desktop\Laravel12-Demo\demo-laravel-12-rilt> php artisan make:controller   

  What should the controller be named?
❯ TodoController

  Which type of controller would you like?
  Empty ............................................................................................... empty  
  Resource ......................................................................................... resource  
  Singleton ....................................................................................... singleton  
  API ................................................................................................... api  
  Invokable ....................................................................................... invokable  
❯ resource

  What model should this resource controller be for? (Optional):
❯ Todo

   INFO  Controller [C:\Users\Zeinot\Desktop\Laravel12-Demo\demo-laravel-12-rilt\app\Http\Controllers\TodoController.php] created successfully.  


todos should have crud functionality using different pages to create and edit and see one and see all todos, also associate the todos with the current user and add authentication middleware to protect the todos routes, only display todos for current user, only allow crud for user that owns the todos, also add pagination to todos, add search bar and filters, you do not need to do everything in one shot if you cannot do it, do it step by step, ask me questions if you need any information, add validation to todos 