import React from "react";

const matrix = (props) => {
  return(
    <section className="woordzoeker__matrix">
      <ul className="woordzoeker__matrix__lijst">
        {props.matrix}
      </ul>
    </section>
  )
}

export default matrix;
