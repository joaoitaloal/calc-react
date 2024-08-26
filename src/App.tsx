import { useState } from 'react'
import './App.css'
import { DisplayArea } from './components/DisplayArea'
import { InputSimb, InputProp } from './components/InputKeyboard'
import { TableArea } from './components/TableArea'

function App() {
  const [simbs, setSimbs] = useState(new Array<string>);
  const [props, setProps] = useState(new Array<string>);

  function addSimb(simb: string){
    setSimbs(simbs.concat(simb));
  }
  function addProp(prop: string){
    setProps(props.concat(prop));
  }
  function rmvSimb(simb: string){
    let cancel = false;
    props.forEach((prop) => {
      if(prop.includes(simb)){
        if (!window.confirm("As proposições que incluem este simbolo serão deletadas, tem certeza?")){
          cancel = true;
          return; //i think this is not good practice but it works maybe kinda
        }
        rmvProp(prop)
      }
    });
    if(!cancel){
      const arr = [...simbs];
      arr.splice(arr.indexOf(simb), 1);
      setSimbs(arr);
    }
  }
  function rmvProp(prop: string){
    const arr = [...props];
    arr.splice(arr.indexOf(prop), 1);
    setProps(arr);
  }

  return (
    <>
      {/* need to decide if the amount os symbols will be hard limited or just put a warning about putting too much of them */}
      {/* also need to make a reference table for showing what kind of symbols are accepted as input(Left of app on desktop and Bellow on mobile, pushed when the table is created) */}
      {/* would also be cool to change the style a little */}
      <div id='reference'>

      </div>
      <main>
        <h1>Calculadora lógica</h1>
        
        <section className='input-section'>
          <InputSimb addSimb={addSimb} simbs={simbs}/>
          <p id="warning">Por favor insira os simbolos antes de usa-los e utilize os parenteses em proposições grandes ou complexas</p>
          <div id='keyboard'> 
            <InputProp simbs={simbs} props={props} addProp={addProp}/>
          </div>
        </section>

        <DisplayArea simbs={simbs} props={props} rmvSimb={rmvSimb} rmvProp={rmvProp}/>

        <TableArea simbs={simbs} props={props}/>

      </main>
    </>
  )
}

export default App