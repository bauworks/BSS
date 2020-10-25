import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {Context} from './simplectx/Context';
import ReduceCtx from './reducectx/App';

const pathRoot = "/ctx";
const pathSimple = pathRoot + "/simplectx"
const pathReduce = pathRoot + "/reducectx"

const CtxMenu = () => {
    return (
      <div>
        <Link to={pathSimple}>
          <button>Simple</button>
        </Link>
        <Link to={pathReduce}>
          <button>Reduce</button>
        </Link>
      </div>
    );
};
  
export const CtxMain = () => {

  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path={pathRoot}   component={CtxMenu} />
          <Route path={pathSimple} component={Context} />
          <Route path={pathReduce} component={ReduceCtx} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default CtxMain;
