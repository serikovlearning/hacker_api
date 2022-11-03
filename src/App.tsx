import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './layouts/Layout';
import NewsPage from './pages/NewsPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path={'/'}>
          <PostsPage />
        </Route>
        <Route exact path={'/news/:id'}>
          <NewsPage />
        </Route>
        <Route exact path={'*'}>
          <Redirect from="*" to={'/'} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
