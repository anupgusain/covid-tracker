import React, { useEffect, useState, memo } from "react";

const CovidTracker = memo(() => {
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
    console.log(data);
    return (
        <div>
            {data.map((item, i) => (
                <div key={i}>{item.active}</div>
            ))}
        </div>
    );
});

export default CovidTracker;
