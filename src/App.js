import React from 'react';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import {BookmarksProvider} from './contexts/BookmarksProvider';
import Home from './components/Home';
import Form from './components/Form';
import Header from "./components/Header";

function App() {
    return (
        <BookmarksProvider>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/add" exact>
                        <Form/>
                    </Route>
                    <Route path="/edit/:id" >
                        <Form/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </BookmarksProvider>
    );
}

export default App;
