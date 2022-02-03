import React from 'react';
import ReactDOM from 'react-dom';
import Dog from './Dog'
import Position from './Position';
const element = (
  <div>
    <h1>根组件</h1>
      <Position></Position>
  </div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
);
