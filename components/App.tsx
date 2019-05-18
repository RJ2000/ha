import React from 'react';
import './App.scss';

interface IMain {
  children?: React.ReactNode
}

export default ({ children }: IMain) => (
  <div className="App" > 
    {children}
  </div>
)