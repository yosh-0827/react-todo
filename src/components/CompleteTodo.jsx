import React from "react";

/**
 * 完了エリアのコンポーネント
 * @returns
 */
export const CompleteTodo = (props) => {
  const { completeTodos, onClickRev } = props;
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickRev(index)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
