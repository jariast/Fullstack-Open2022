import React from 'react';

const Filter = ({ filterString, changeHandler }) => {
  return (
    <>
      <label>Filter</label>
      <input value={filterString} onChange={changeHandler}></input>
    </>
  );
};

export default Filter;
