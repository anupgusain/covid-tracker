import React, { useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../actions/action.js";

const CovidTracker = memo((props) => {
    const [data, setData] = useState([]);
    async function getData() {
        const res = await fetch("https://api.covid19india.org/data.json");
        const actualData = await res.json();

        setData(actualData.statewise);
    }
    useEffect(() => {
        // console.log("efect");
        getData();
    }, []);
    console.log("---------------");
    console.log(props.count);
    return (
        <div className="uk-container">
            <h1>
                Live Corona Updates{" "}
                {data.length > 0 ? (
                    <span className="fontSm uk-inline-block uk-margin-medium-left">
                        <span className="indicatorWrap">
                            <span className="indicatorBg" />
                            <span className="indicator" />
                        </span>
                        {data[0].lastupdatedtime}
                    </span>
                ) : null}
            </h1>
            <button onClick={props.increment}>Increment</button>
            {props.count}
            <button onClick={props.decrement}>decrement</button>
            {data.length > 0 ? (
                <div className="uk-grid uk-child-width-1-4@s uk-grid-column-small uk-margin-small-top">
                    <div>
                        <div className="caseOverviewCards activeCase uk-card uk-card-default">
                            <p>Active</p>
                            <h2> {data[0].active} </h2>
                        </div>
                    </div>
                    <div>
                        <div className="caseOverviewCards uk-card uk-card-default">
                            <p>Confirmed</p>
                            <h2> {data[0].confirmed} </h2>
                        </div>
                    </div>
                    <div>
                        <div className="caseOverviewCards uk-card uk-card-default">
                            <p>Deaths</p>
                            <h2> {data[0].deaths} </h2>
                        </div>
                    </div>
                    <div>
                        <div className="caseOverviewCards recoveredCase uk-card uk-card-default">
                            <p>Recovered</p>
                            <h2> {data[0].recovered} </h2>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="uk-margin-medium-top uk-margin-medium-bottom">
                <div className="uk-text-bold">State Corona Update</div>
                {data.slice(1).map((item, i) => (
                    <div
                        key={i}
                        className="uk-card uk-card-default uk-padding-small stateInfoCard"
                    >
                        <div className="uk-grid uk-grid-column-small">
                            <div className="uk-width-1-1">
                                {item.state}{" "}
                                <span className="fontXs fontGrayMd">
                                    ({item.lastupdatedtime})
                                </span>
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>Active</label>
                                <p className="fontDanger">{item.active}</p>
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>Confirmed</label>
                                <p>{item.confirmed}</p>
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>Deaths</label>
                                <p>{item.deaths}</p>
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>Recovered</label>
                                <p className="fontSuccess">{item.recovered}</p>
                            </div>
                        </div>
                        <div className="deltaInfoWrap">
                            <p>Delta Variant Update</p>
                            <div className="uk-grid uk-grid-column-small uk-child-width-1-3@s">
                                <div className="deltaInfo">
                                    <label>Confirmed : </label>
                                    {item.deltaconfirmed}
                                </div>
                                <div className="deltaInfo">
                                    <label>Deaths : </label>
                                    {item.deltadeaths}
                                </div>
                                <div className="deltaInfo">
                                    <label>Recovered : </label>
                                    {item.deltarecovered}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

const mapStateToProps = (state) => ({
    count: state.calculationReducer.value,
});
const mapDispatchToProps = {
    increment,
    decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(CovidTracker);
