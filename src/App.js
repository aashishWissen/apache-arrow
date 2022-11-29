import { tableFromIPC} from 'apache-arrow';
import './App.css';
import ArrowData from './components/arrowData/ArrowData';
import ScreenResizer from './screen-resize/ScreenResizer';

// export const loadData = async () => {
//   const data = {
//     table: null
//   };

//     const response = await fetch("https://chrisprice.io/d3fc-webgl-hathi-explorer/bundle/data-AYYLWMMN.arrows");
//     const reader = await Arrow.RecordBatchReader.from(response);
//     await reader.open();
//     data.table = new Arrow.Table(reader.schema);
//     for await (const recordBatch of reader) {
//       data.table = data.table.concat(recordBatch);
//       console.log(data.table.schema.fields.map((d) => d.name));


function App() {
  return (
    <>
         <div className="overlay">
      <ScreenResizer />
      </div>
    <div className="App content">
      <ArrowData />
    </div>
    </>
  );
}

export default App;
