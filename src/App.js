import React from "react";
import NavBar from "./Components/NavBar";
import Field from './Components/Field';

class App extends React.Component {
  render() {
    return (
      <div className='flex justify-center items-center w-full min-h-screen flex-col'>
      <div className="w-[80%] max-sm:w-full">
        <NavBar/>
        <Field/>
      </div>
      </div>
    )
  }
}

export default App;
