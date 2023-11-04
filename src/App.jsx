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

  /*
  削除ボタンを押した時に対象を削除する
  index:要素が何番目か
   */
  const onClickDelete = (index) => {
    const newTodos = [...inCompleteTodos]; //未完成リスト（配列）をコピー
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  /*
  完了ボタンを押したらタスクが作成される
   */
  const onClickComplete = (index) => {
    //完了のTodoでも未完了のTodoから完了したらタスクを削除するので、削除機能を使う
    const newIncompleteTodos = [...inCompleteTodos];
    newIncompleteTodos.splice(index, 1);

    //完了のTodoの後ろに未完了のTodoで完了したものを持ってくる
    const newCompleteTodos = [...comleteTodos, inCompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
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
          {inCompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
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
