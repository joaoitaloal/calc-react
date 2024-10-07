import { useState } from 'react'
import { DisplayArea } from './components/DisplayArea'
import InputSection from './components/InputKeyboard'
import { TableArea } from './components/TableArea'
import { ReferenceTable} from './components/ReferenceTable'
import { option, Options } from './components/options'
import './App.css'
import style from './styles/footer.module.scss'
import gh_icon from '/github-icon.png';

function App() {
  const [simbs, setSimbs] = useState(new Array<string>);
  const [propos, setProps] = useState(new Array<string>);
  const [options, setOptions] = useState(new option());
  
  function addSimb(simb: string){
    setSimbs(simbs.concat(simb));
  }
  function addProp(prop: string){
    setProps(propos.concat(prop));
  }

  function updateOptions(opt: option){
    setOptions(opt);
  }

  return (
    <>
      {/* ToDo's and ideas */}
      {/* Update the readme with new things i am using like radix UI and SASS */}
      {/* Maybe i should use interfaces for all props, it looks good on options.tsx */}
      {/* had the idea to make an thing that calculates propositions from the table, like a karnaugh map, i need to do some research on that */}
      {/* would also be cool to change the style a little */}

      <ReferenceTable mobile={false}/>
      <Options options={options} updateOptions={updateOptions} mobile={false}/>
      <main>
        <h1>Calculadora lógica</h1>
        
        <InputSection simbs={simbs} addSimb={addSimb} propos={propos} addProp={addProp} options={options}/>

        <DisplayArea simbs={simbs} propos={propos} setSimbs={setSimbs} setProps={setProps}/>

        <TableArea simbs={simbs} propos={propos}/>

      </main>
      <ReferenceTable mobile={true}/>
      <Options options={options} updateOptions={updateOptions} mobile={true} />
      <footer className={style.footer}>
        <p>Feito por <a href="https://github.com/joaoitaloal" target="_blank">Italo<img src={gh_icon} alt="logo do github" /></a></p>
      </footer>
    </>
  )
}

export default App
