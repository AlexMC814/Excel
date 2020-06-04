import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';

import { rootReducer } from '@/redux/rootReducer';
import { createStore } from '@core/createStore';

import './sass/index.scss';
import { storage, debounce } from '@core/utils';
import { initState } from '@/redux/initState';

const store = createStore(rootReducer, initState);

const stateListener = debounce(state => {
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
