import React from "react";
import ReactDOM from "react-dom";
import UIkit from "uikit";
// import "uikit/src/scss/uikit-theme.scss";
// UIkit.icon();
import "./src/styles/mystyle.scss";
// import "uikit/src/scss/uikit-theme.scss";
import CovidTracker from "./src/screen/covid-tracker-screen";

ReactDOM.render(<CovidTracker />, document.getElementById("root"));
