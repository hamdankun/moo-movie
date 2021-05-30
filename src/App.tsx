import { Provider } from 'react-redux';

import './theme/main.sass';

import RouterView from './router';

import { store } from './redux/store';

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <RouterView />
        </Provider>
    );
}

export default App;
