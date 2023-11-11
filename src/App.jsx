import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { InCompleteTodo } from "./components/InCompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

export const App = () => {
  //入力エリアのState
  const [todoText, setTodoText] = useState([""]);
  //未完了エリアのState
  const [inCompleteTodos, setIncompleteTodos] = useState([]);
  //完了エリアのState
  const [completeTodos, setCompleteTodos] = useState([]);

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
    const newCompleteTodos = [...completeTodos, inCompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  /**
   * タスクを戻す機能
   */
  const onClickReverse = (index) => {
    //完了済みのTODOから戻す対象を選択し、既存配列から削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    //未完了のTODO配列に戻すタスクを追加
    const newReverseTodos = [...inCompleteTodos, completeTodos[index]];

    //セット
    setIncompleteTodos(newReverseTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={inCompleteTodos.length >= 5}
      />
      {inCompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTodoは５コまでだよ</p>
      )}

      <InCompleteTodo
        inCompleteTodos={inCompleteTodos}
        onClickComp={onClickComplete}
        onClickDel={onClickDelete}
      />
      <CompleteTodo completeTodos={completeTodos} onClickRev={onClickReverse} />
    </>
  );
};
