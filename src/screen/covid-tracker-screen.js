import React, { useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { setData, filterChange } from "../actions/action.js";

const CovidTracker = memo((props) => {
    async function getData() {
        const res = await fetch("https://api.covid19india.org/data.json");
        const actualData = await res.json();
        props.Set_Data(actualData.statewise);
    }
    useEffect(() => {
        // console.log("efect");
        getData();
    }, []);
    const filterChange = (event) => {
        const selectedFilter = event.target.value;
        const data = [...props.data];
        let newData;
        if (selectedFilter !== "state") {
            newData = data
                .slice(1)
                .sort((a, b) =>
                    +a[selectedFilter] > +b[selectedFilter]
                        ? -1
                        : +a[selectedFilter] < +b[selectedFilter]
                        ? 1
                        : 0
                );
        } else {
            newData = data
                .slice(1)
                .sort((a, b) =>
                    a[selectedFilter] > b[selectedFilter]
                        ? 1
                        : a[selectedFilter] < b[selectedFilter]
                        ? -1
                        : 0
                );
        }
        props.Filter_Change({
            selected_filter: selectedFilter,
            new_data: newData,
        });
    };
    const data = props.data;
    const state_data =
        props.sort_data.length > 0 ? props.sort_data : props.data.slice(1);
    console.log(props.filter_value);
    return (
        <div className="uk-container">
            <div className="uk-grid uk-margin-medium-top uk-margin-medium-bottom">
                <div className="uk-width-expand">
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
                </div>
                <div className="uk-width-auto">
                    <select
                        className="uk-select"
                        value={props.filter_val}
                        onChange={filterChange}
                    >
                        <option>--Sort By--</option>
                        <option value="state">State</option>
                        <option value="active">Active</option>
                        <option value="recovered">Recovered</option>
                        <option value="deaths">Death</option>
                        <option value="confirmed">Confirm</option>
                    </select>
                </div>
            </div>
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
                {state_data.map((item, i) => (
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
                                {props.filter_value === "state" ? (
                                    <span
                                        className="fontDanger uk-inline"
                                        style={{ fontSize: 8, marginLeft: 5 }}
                                    >
                                        ▼
                                    </span>
                                ) : null}
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>
                                    Active{" "}
                                    {props.filter_value === "active" ? (
                                        <span
                                            className="fontDanger uk-inline"
                                            style={{
                                                fontSize: 8,
                                                marginLeft: 5,
                                            }}
                                        >
                                            ▼
                                        </span>
                                    ) : null}
                                </label>
                                <p className="fontDanger">{item.active}</p>
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>
                                    Confirmed
                                    {props.filter_value === "confirmed" ? (
                                        <span
                                            className="fontDanger uk-inline"
                                            style={{
                                                fontSize: 8,
                                                marginLeft: 5,
                                            }}
                                        >
                                            ▼
                                        </span>
                                    ) : null}
                                </label>
                                <p>{item.confirmed}</p>
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>
                                    Deaths
                                    {props.filter_value === "deaths" ? (
                                        <span
                                            className="fontDanger uk-inline"
                                            style={{
                                                fontSize: 8,
                                                marginLeft: 5,
                                            }}
                                        >
                                            ▼
                                        </span>
                                    ) : null}
                                </label>
                                <p>{item.deaths}</p>
                            </div>
                            <div className="uk-width-1-4@s uk-width-1-2 stateData">
                                <label>
                                    Recovered
                                    {props.filter_value === "recovered" ? (
                                        <span
                                            className="fontDanger uk-inline"
                                            style={{
                                                fontSize: 8,
                                                marginLeft: 5,
                                            }}
                                        >
                                            ▼
                                        </span>
                                    ) : null}
                                </label>
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
    data: state.indexReducer.datalist,
    filter_value: state.indexReducer.filter_value,
    sort_data: state.indexReducer.sort_data,
});
const mapDispatchToProps = {
    Set_Data: setData,
    Filter_Change: filterChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(CovidTracker);
