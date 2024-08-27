import { useState } from 'react'
import './App.css'
import { DisplayArea } from './components/DisplayArea'
import { InputSimb, InputProp } from './components/InputKeyboard'
import { TableArea } from './components/TableArea'
import gh_icon from '/github-icon.png';

function App() {
  const [simbs, setSimbs] = useState(new Array<string>);
  const [props, setProps] = useState(new Array<string>);

  function addSimb(simb: string){
    setSimbs(simbs.concat(simb));
  }
  function addProp(prop: string){
    setProps(props.concat(prop));
  }
  //This one is a little more complicated because it checks props that use the simbol trying to be deleted and removes these props if the user confirms
  function rmvSimb(simb: string){
    let cancel = false;
    let ask = false;
    let rmv: Array<string> = [];

    props.forEach((prop) => {
      if(prop.includes(simb) && !cancel){
        if (!ask && !window.confirm("As proposições que incluem este simbolo serão deletadas, tem certeza?")){
          // I want to change this window.confirm to something better if i have time
          cancel = true;
        }
        ask = true;
        rmv[props.indexOf(prop)] = prop;
      }
    });
    if(!cancel){
      rmvProp(rmv);
      const arr = [...simbs];
      arr.splice(arr.indexOf(simb), 1);
      setSimbs(arr);
    }
  }
  function rmvProp(prop: Array<string>){
    const arr = [...props];
    
    prop.forEach((p) => {
      arr.splice(arr.indexOf(p), 1);
    })

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
      <footer>
        <p>Feito por <a href="https://github.com/joaoitaloal" target="_blank">Italo<img id='logo-img' src={gh_icon} alt="logo do github" /></a></p>
      </footer>
    </>
  )
}

export default App
