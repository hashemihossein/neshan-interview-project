import React from "react";
import SpinnerSvg from "../../assets/SpinnerSvg.svg";

export const SearchListRender = ({ data, loading }) => {
  return (
    <div>
      {loading ? <img width={"30px"} src={SpinnerSvg} /> : <div>selam</div>}
    </div>
  );
};
