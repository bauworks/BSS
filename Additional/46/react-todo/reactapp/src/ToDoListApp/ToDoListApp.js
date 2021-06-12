import React, { useState, useEffect } from 'react'
import TaskInput from './TaskInput';
import TaskTable from './TaskTable';
//import axios from 'axios';

//***********************************
// ToDoListコンポーネント
//***********************************
const ToDoListApp = () => {

    //-------------------------
    // 全てのタスク
    //-------------------------
    const [taskAll, setTaskAll] = useState([]);

    /*** 初期値をDBから取得 ***/
    useEffect(() => {
        fetch('http://localhost:8080/api/selectall')
        .then(res => res.json()) 
        .then(json => {
            setTaskAll(json)
        });
        // axiosを使う場合（npm install axios が必要）
        // const fetchData = async () => {
        //     const result = await axios(
        //         'http://localhost:8080/api/selectall',
        //     );
        //     setTaskAll(result.data);
        // };
        // fetchData();
    }, []);

    /*** タスクの追加 ***/
    const addTask = (task) => {
        // テーブルを更新してタスクリストに追加
        fetch('http://localhost:8080/api/add', {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(json => {
            // タスクリストに追加
            const copied = taskAll.map((orgTask) => {
                return orgTask;
            });
            copied.push({id:json.id, done_flg:json.done_flg, title:json.title, time_limit:json.time_limit});
            setTaskAll(copied);
        });
    }

    /*** タスクの更新 ***/
    const modTask = (task) => {
        // テーブルを更新してIDが一致するタスクを差し替え
        fetch('http://localhost:8080/api/update', {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(json => {
            // IDが一致するタスクを差し替え
            const modified = taskAll.map((orgTask) => {
                if (task.id == orgTask.id) {
                    return task;
                } else {
                    return orgTask;
                }
            });
            setTaskAll(modified);
        });
    }

    /*** タスクの削除 ***/
    // [完了済みを削除]クリック時の処理
    const removeFinishedTask = () => {
        // テーブルを更新して未完了のタスクのみ抽出
        fetch('http://localhost:8080/api/delete')
        .then(res => {
            // 未完了のタスクのみ抽出して差し替え
            const unfinished = taskAll.filter((task) => {
                return task.done_flg === 0
            });
            setTaskAll(unfinished);
        });
    }
  

    return(
        <div>
            <h1>ToDoList</h1>
            <h3>■ 新しいタスクを追加</h3>
            <TaskInput addFunc={addTask} />

            <h3>■ マイタスク</h3>
            <TaskTable taskAll={taskAll} done_flg="0" modFunc={modTask} />

            <h3>■ 完了済み</h3>
            <TaskTable taskAll={taskAll} done_flg="1" modFunc={modTask} />
            <button type="button" onClick={removeFinishedTask}>完了済みを削除</button>

        </div>
    );
}

export default ToDoListApp
