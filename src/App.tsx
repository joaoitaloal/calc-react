import { useState } from 'react'
import { DisplayArea } from './components/DisplayArea'
import InputSection from './components/InputKeyboard'
import { TableArea } from './components/TableArea'
import { ReferenceTable} from './components/referenceTable'
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
  //This one is a little more complicated because it checks props that use the simbol trying to be deleted and removes these props if the user confirms
  function rmvSimb(simb: string){
    let cancel = false;
    let ask = false;
    let rmv: Array<string> = [];

    propos.forEach((prop) => {
      if(prop.includes(simb) && !cancel){
        if (!ask && !window.confirm("As proposições que incluem este simbolo serão deletadas, tem certeza?")){
          // I want to change this window.confirm to something better if i have time
          cancel = true;
        }
        ask = true;
        rmv[propos.indexOf(prop)] = prop;
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
    const arr = [...propos];
    
    prop.forEach((p) => {
      arr.splice(arr.indexOf(p), 1);
    })

    setProps(arr);
  }
  function updateOptions(opt: option){
    setOptions(opt);
  }

  return (
    <>
      {/* https://www.radix-ui.com/primitives/docs/components/alert-dialog */}
      {/* Maybe i should use interfaces for all props, it looks good on options.tsx */}
      {/* had the idea to make an thing that calculates propositions from the table, like a karnaugh map, i need to do some research on that */}
      {/* would also be cool to change the style a little */}
      {/* starting to realize the structure is not very good, too much states on this file, thinking about putting the alert ones on a input component */}
      <ReferenceTable mobile={false}/>
      <Options options={options} updateOptions={updateOptions} mobile={false}/>
      <main>
        <h1>Calculadora lógica</h1>
        
        <InputSection simbs={simbs} addSimb={addSimb} propos={propos} addProp={addProp} options={options}/>

        <DisplayArea simbs={simbs} propos={propos} rmvSimb={rmvSimb} rmvProp={rmvProp}/>

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
