import { memo, lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import BaseLayout from './../components/base-layout';

const MovieList = lazy(() => import('../pages/movie/list'));
const MovieDetail = lazy(() => import('../pages/movie/detail'));

export default memo((): JSX.Element => {
    return (
        <Router>
            <BaseLayout>
                <Suspense fallback={null}>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/movies" />
                        </Route>
                        <Route exact path="/movies" component={MovieList} />
                        <Route
                            exact
                            path="/movies/:movieId"
                            component={MovieDetail}
                        />
                        <Route path="*">
                            <Redirect to="/movies" />
                        </Route>
                    </Switch>
                </Suspense>
            </BaseLayout>
        </Router>
    );
});
