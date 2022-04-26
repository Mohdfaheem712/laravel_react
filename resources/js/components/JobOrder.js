import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Routes, Route,Redirect, Switch } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import ApplyJob from "./JobOrder/ApplyJob";
import AppliedJobs from "./JobOrder/AppliedJobs";
import NotFoundPage from "./NotFoundPage";
import axios from 'axios';


window.$axios = axios;



function JobOrder() {
    return (
        <>
            <Routes>
                <HeaderNav />
                    <Switch>
                        <Route path="/jobs/create" exact={true} component={ApplyJob} />
                        <Route path="/" component={AppliedJobs} />
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
            </Routes>
        </>
    );
}

export default JobOrder;
// DOM element
if (document.getElementById("app")) {
    ReactDOM.render(<JobOrder />, document.getElementById("app"));
}
