import React from "react";

function Ingredient({ name, increase, decrease, disable }) {
  return (
    <div>
      <div>
        <strong>{name}</strong>
      </div>
      <span>
        <button
          className="btn"
          type="button"
          disabled={disable}
          onClick={decrease}
          style={{
            backgroundColor: disable ? "#ac9980" : "#d39952",
            cursor: disable ? "not-allowed" : "pointer",
          }}
        >
          Less
        </button>
        <button type="button" className="more" onClick={increase}>
          More
        </button>
      </span>
    </div>
  );
}

export default Ingredient;
