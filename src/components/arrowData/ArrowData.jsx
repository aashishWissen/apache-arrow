import React, { useEffect, useState } from "react";
import { tableFromIPC } from "apache-arrow";
import * as Arrow from "apache-arrow";

const ArrowData = () => {
  const [arrowData, setArrowData] = useState();
  const [columns, setColumns] = useState([]);
  const dataArray = [];

  useEffect(() => {
    loadArrowData();
  }, []);

  const loadArrowData = async () => {
    const data = {
      table: [],
    };
    let colums;
    const response = await fetch(
      "https://chrisprice.io/d3fc-webgl-hathi-explorer/bundle/data-AYYLWMMN.arrows"
    );
    const reader = await Arrow.RecordBatchReader.from(response);
    await reader.open();
    data.table = new Arrow.Table(reader.schema);
    let i = 0;
    for await (const recordBatch of reader) {
      data.table = data.table.concat(recordBatch);
      console.log("data ", dataArray.push(data.table.get(i).toArray()));
      colums = data.table.schema.fields.map((d) => d.name);
      console.log(colums);
      i++;
    }

    setArrowData(dataArray);
    setColumns(colums);
    console.table("Arrow data = ", arrowData);

    // const arrowURL = 'https://raw.githubusercontent.com/RandomFractals/ChicagoCrimes/master/data/chicago-crimes-2017.arrow';
    // const arrowURL = 'https://chrisprice.io/d3fc-webgl-hathi-explorer/bundle/data-AYYLWMMN.arrows';
    // const table = await tableFromIPC(fetch(arrowURL));
    // console.log(data.table.concat(table.get(0).toArray()), ' table')
    // setArrowData(data)
    // console.table([...table]);
  };

  return (
    <>
      {arrowData ? (
        <>
          <table>
            {columns && (
              <thead>
                <tr>{tableHeader(columns)}</tr>
              </thead>
            )}
            <tbody>
              {arrowData.map((item, index) => {
                return <tr key={index}>{tableList(item)}</tr>;
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
};

const tableList = (dataSource) => {
  return dataSource.map((d) => <td>{d}</td>);
};

const tableHeader = (columnHeader) => {
  return columnHeader.map((d) => <th>{d}</th>);
};

export default React.memo(ArrowData);
