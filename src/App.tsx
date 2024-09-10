import { useState } from 'react'
import { DisplayArea } from './components/DisplayArea'
import { InputSimb, InputProp } from './components/InputKeyboard'
import { TableArea } from './components/TableArea'
import { ReferenceTable} from './components/referenceTable'
import { option, Options } from './components/options'
import './App.css'
import style from './styles/footer.module.scss'
import gh_icon from '/github-icon.png';

function App() {
  const [simbs, setSimbs] = useState(new Array<string>);
  const [props, setProps] = useState(new Array<string>);
  const [options, setOptions] = useState(new option());

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
  function updateOptions(opt: option){
    setOptions(opt);
  }
  

  return (
    <>
      {/* https://www.radix-ui.com/primitives/docs/components/alert-dialog */}
      {/* Maybe i should use interfaces for all props, it looks good on options.tsx */}
      {/* had the idea to make an thing that calculates propositions from the table, like a karnaugh map, i need to do some research on that */}
      {/* would also be cool to change the style a little */}
      {/* Should probably change styling method, the css file is getting absurdly big */}
      <ReferenceTable mobile={false}/>
      <Options options={options} updateOptions={updateOptions} mobile={false}/>
      <main>
        <h1>Calculadora lógica</h1>
        
        <section className='input-section'>
          <InputSimb addSimb={addSimb} simbs={simbs} options={options}/>
          <p id="warning">Por favor insira os simbolos antes de usa-los e utilize os parenteses em proposições grandes ou complexas</p>
          <InputProp simbs={simbs} props={props} addProp={addProp}/>
        </section>

        <DisplayArea simbs={simbs} props={props} rmvSimb={rmvSimb} rmvProp={rmvProp}/>

        <TableArea simbs={simbs} props={props}/>

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
