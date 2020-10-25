import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {Page1} from './page1/page1';
import {Page2} from './page2/page2';

const pathRoot = "/page";
const pathPage1 = pathRoot + "/page1"
const pathPage2 = pathRoot + "/page2"

const PageMenu = () => {
    return (
      <div>
        <Link to={pathPage1}>
          <button>Page1</button>
        </Link>
        <Link to={pathPage2}>
          <button>Page2</button>
        </Link>
      </div>
    );
};
  
export const PageMain = () => {

  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path={pathRoot} component={PageMenu} />
          <Route path={pathPage1} component={Page1} />
          <Route path={pathPage2} component={Page2} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default PageMain;
