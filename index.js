import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./src/reducers/store";
import UIkit from "uikit";
// import "uikit/src/scss/uikit-theme.scss";
// UIkit.icon();
import "./src/styles/mystyle.scss";
// import "uikit/src/scss/uikit-theme.scss";
import CovidTracker from "./src/screen/covid-tracker-screen";
const App = () => {
    return (
        <Provider store={store}>
            <CovidTracker />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
