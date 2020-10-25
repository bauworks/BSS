import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Origin from './origin/App';
import {PageMain} from './page/PageMain';
import {CtxMain} from './ctx/CtxMain';

const Menu = () => {
    return (
      <div>
        <Link to="/origin">
          <button>Origin</button>
        </Link>
        <Link to="/page">
          <button>Page</button>
        </Link>
        <Link to="/ctx">
          <button>Context</button>
        </Link>
      </div>
    );
};
  
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/"       component={Menu} />
          <Route path="/origin" component={Origin} />
          <Route path="/page"   component={PageMain} />
          <Route path="/ctx"    component={CtxMain} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
