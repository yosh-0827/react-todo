import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  //入力エリアのState
  const [todoText, setTodoText] = useState([""]);
  //未完了エリアのState
  const [inCompleteTodos, setIncompleteTodos] = useState([
    "あああああ",
    "いいいいい",
  ]);
  //完了エリアのState
  const [comleteTodos, setCompleteTodos] = useState(["ううううう"]);

  //入力エリアで入力があったら制御する
  /*event.target.valueは実際の入力値が入ってくるところ
    event.target.valueをsetTodoTextで入力エリアに反映していく。
  */
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  /*
  onClickが走った時に行う関数を定義する。
  入力エリアの情報を未完了Todoの配列につめる。
  */
  const onClickAdd = () => {
    if (todoText === "") return; //入力エリアが空で入力された場合は何もしない
    const newTodo = [...inCompleteTodos, todoText];
    setIncompleteTodos(newTodo);
    setTodoText(""); //入力エリアをから文字にリセットする
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {inCompleteTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {comleteTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
