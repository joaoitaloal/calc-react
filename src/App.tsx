import { useState } from 'react'
import './App.css'
import { DisplayArea } from './components/DisplayArea'
import { InputSimb, InputProp } from './components/InputKeyboard'
import { TableArea } from './components/TableArea'

function App() {
  const [simbs, setSimbs] = useState(new Array<String>);
  const [props, setProps] = useState(new Array<String>);

  function addSimb(simb: String){
    setSimbs(simbs.concat(simb));
  }
  function addProp(prop: String){
    setProps(props.concat(prop));
  }

  return (
    <>
      {/* need to make a reference table for showing what kind of symbols are accepted as input(Left of app on desktop and Bellow on mobile, pushed when the table is created) */}
      <div id='reference'>

      </div>
      <main>
        <h1>Calculadora lógica</h1>
        {/* Input area */}
        
        <section className='input-section'>
          <InputSimb addSimb={addSimb}/>
          {/* Still need to do input using mouse/touch, the keyboard div here basically */}
          <div id='keyboard'> 
            <InputProp simbs={simbs} addProp={addProp}/>
          </div>
        </section>

        {/* Display area */}
        <DisplayArea />

        {/* Table area */}
        <TableArea simbs={simbs} props={props}/>

      </main>
    </>
  )
}

export default App
