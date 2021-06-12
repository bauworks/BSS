import React, { useState } from 'react'

//***********************************
// タスクカラムの表示
//***********************************
const Task = (props) => {

    // タスクタイトル
    const [title, setTitle] = useState("");
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
  
    // タスク期限
    const [time_limit, setTime_limit] = useState("");
    const changeTime_limit = (e) => {
        setTime_limit(e.target.value);
    }

  
    // [追加]クリック時の処理
    const addTask = () => {
      const task = {id:"", done_flg:0, title:title, time_limit:time_limit};
    //   alert("Add [" + task.title + "], [" + task.time_limit + "]");
      props.addFunc(task);
      setTitle("");
      setTime_limit("");
    }

    return(
      <div>
          <input type="text" name="title" value={title} onChange={changeTitle} />
          <input type="date" name="time_limit" value={time_limit} onChange={changeTime_limit}/>
          <button type="button" onClick={addTask}>追加</button>
      </div>
    );
  }

export default Task