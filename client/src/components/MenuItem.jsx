import React from 'react';

const MenuItem = ({ snippets }) => {
  if (!snippets.length) {
    return <h3>No Save Snippets</h3>;
  }

  return (
    <div>
        {snippets &&
          snippets.map((snippet) => (
          <div theme="dark" key={snippet._id} onClick={handleClick} mode="inline">
          </div>
        
          ))}
      </div>
  );
};

export default MenuItem;


// const newState = snippets.map(obj => {
    //     console.log(obj.name);
    //     return {label: obj.name, key: obj._id, icon: <RightSquareOutlined />, code: obj.code, explanation: obj.explanation};