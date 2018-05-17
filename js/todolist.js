window.onload=function(){

      var todos = localStorage.getItem('todos');
      if(todos){
        todos = JSON.parse(todos);
      }else{
        todos = [];
      }

      var todosIndex;

      //IDの要素を取得
      var todoList = document.getElementById("todo-list");
      var listForm = document.getElementById("list-form");
      var dateSort = document.getElementById("date_sort");
      var lankSort = document.getElementById("lank_sort");

      var tsk = document.getElementById("task");
      var dln = document.getElementById("deadline");
      var lnk = document.getElementById("lank");
      var ctg = document.getElementById("category");
      var mmo = document.getElementById("memo");

      //------------------------------
      //  TODOリストを追加する
      // ------------------------------
      var deleteItem = function(event){
        todoList.removeChild(event.target.parentElement);
      };

      creat.addEventListener('click',function(event){
          // Formの送信による画面遷移を止める
          event.preventDefault();
          var message = document.getElementById("message");
      // テキストボックスが空なら何もしない
          if (!tsk.value || !dln.value || !mmo.value) {
            return message.innerHTML = "記入していない項目があります。";
          }

          var listData = {task: tsk.value,
  	                      deadline: dln.value,
  	                      lank: lnk.value,
  	                      category: ctg.value,
  	                      memo: mmo.value,
  	                      done: false};
          //todos配列にリスト項目の要素を入れる
          todos.push(listData);

          render();
          // テキストボックスの内容を空にする
          tsk.value = '';
          dln.value = '';
          mmo.value = '';
          message.innerHTML = "";
        });

    //------------------------------
    //  TODOリストのデータを配列に抜き出す
    // ------------------------------
    var render = function () {

      todoList.innerHTML = '';
      //配列の中身を１個ずつ渡してfunction()関数の処理を行う
      todos.forEach(function(todo){
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox'; //<input type = "checkbox>
        checkBox.checked = todo.done;
        checkBox.addEventListener('change',function(event){
          todo.done = event.target.checked;
        });
       var td1 = document.createElement('td');
       var td2 =document.createElement('td');
       var td3 =document.createElement('td');
       var td4 =document.createElement('td');
       var td5 =document.createElement('td');

        td1.textContent = todo.task;
        td2.textContent = todo.deadline;

        function setT3Val() {
          var t3_val = "";
          var flag = todo.lank;
          switch(flag) {
            case "1":
              t3_val = "低";
              break;
            case "2":
              t3_val = "中";
              break;
            case "3":
              t3_val = "高";
          }
          return t3_val;
        }

        td3.textContent = setT3Val();

        function setT4Val() {
          var t4_val = "";
          var flag = todo.category;
          switch(flag) {
            case "work":
              t4_val = "仕事";
              break;
            case "buy":
              t4_val = "買い物";
              break;
            case "study":
              t4_val = "勉強";
              break;
            case "private":
              t4_val = "私用";
              break;
            case "etc":
              t4_val = "その他";
          }
          return t4_val;
        }

        td4.textContent = setT4Val();
        td5.textContent = todo.memo;

        var tr = document.createElement('tr');
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        var span = document.createElement('span');
        span.appendChild(tr);

        var label = document.createElement('label');
        label.appendChild(checkBox);
        label.appendChild(span);

        // TODOリストの編集
        var editButton = document.createElement('button');
        editButton.textContent = '編集';
        editButton.addEventListener('click',function(){
          var index = todos.indexOf(todo);
          var todoItem = todos[index];
          tsk.value = todoItem.task;
          dln.value = todoItem.deadline;
          lnk.value = todoItem.lank;
          ctg.value = todoItem.category;
          mmo.value = todoItem.memo;
          todosIndex = index;
        });


        //削除ボタン
        var deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.addEventListener('click',function(){
          //配列のindex何番目から1個分要素を削除する
          var index = todos.indexOf(todo);
          console.log(todo);
          todos.splice(index,1);
          render();
          });

        var listItem = document.createElement('li');
        listItem.appendChild(label);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);

        localStorage.setItem('todos',JSON.stringify(todos));
      });
    };

      //------------------------------
      //編集処理
      //------------------------------


      editB.addEventListener('click',function(){
         // Formの送信による画面遷移を止める
         event.preventDefault();

         console.log(todosIndex);
        var message = document.getElementById("message");
        // テキストボックスが空なら何もしない
        if (!tsk.value || !dln.value || !mmo.value) {
        return message.innerHTML = "記入していない項目があります。";
        }
        var listData = {task: tsk.value,
                        deadline: dln.value,
                        lank: lnk.value,
                        category: ctg.value,
                        memo: mmo.value,
                        done: false};

        //編集ボタンが押されたtodos配列の要素を更新する
        var removed = todos.splice(todosIndex,1,listData);
        　
        todos.push(removed);
        todos.pop();

        // テキストボックスの内容を空にする
        tsk.value = '';
        dln.value = '';
        mmo.value = '';
        message.innerHTML = '';

        render();
        //listIndex = '';
    });

      //------------------------------
      // TODOリストのソート
      //------------------------------

      //期限順でソート
      dateSort.addEventListener('click',function(){
        todos.sort(function(a,b){
        return(a.deadline < b.deadline ? -1 : 1);
        });
        render();
      });

      //重要度順でソート
      lankSort.addEventListener('click',function(){
        todos.sort(function(a,b){
        return(a.lank < b.lank ? 1 : -1);
        });

        render();
      });
      render();
};
