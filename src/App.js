import React from 'react'
import StopWatch from './components/StopWatch/index'

function App() {

  React.useEffect(() => {
    (document.title = "Stopwatch");
  });
  return (
    <React.Fragment>
      <StopWatch />
    </React.Fragment>
  );
}

export default App;
