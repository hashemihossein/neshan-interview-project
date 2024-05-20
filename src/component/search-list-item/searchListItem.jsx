import React from "react";

export const SearchListItem = (props) => {
  const { item, index } = props;
  return (
    <li>
      <div>item {index}</div>
    </li>
  );
};
