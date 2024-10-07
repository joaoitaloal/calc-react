import { useEffect, useState } from "react";
import { calcProp, replaceOps } from "../lib/dataCalc"; 
import style from "../styles/keyboard.module.scss"
import DialogBox from "./Dialog";

export function InputSimb(props: any){
  const [text, setText] = useState('');
  const simbLimited = props.options.simbLimited;

  function insertSimb(){
    let allowed = true;

    props.simbs.forEach((simb: string) => {
      if(simb == text){
        allowed = false;
        props.alert("Simbolo já inserido!")
      }
    });

    if(text.length == 0){
      allowed = false;
      props.alert("Insira um simbolo!")
    }
    else if(text.length > 1){
      allowed = false;
      props.alert("Apenas um caractere por simbolo!")
    }

    if(text.search(/[∧∨¬⊻→⇔().,TFtf⊤⊥~⊕= ]/) != -1){
      allowed = false;
      props.alert("simbolo inválido");
    }

    if(allowed){
      if (props.simbs.length < 10 || !simbLimited){
        props.addSimb(text);
      }
      else{
        props.alert('Número máximo de simbolos inseridos')
      } 
    } 
    setText('');
  }

  return(
    <form onSubmit={(e) =>{
        e.preventDefault();
        insertSimb();
      }}>
      <label htmlFor="simb-input">Insira até 10 simbolos</label>
      <input value={text} onChange={(e) => setText(e.target.value)} id="simb-input" type="text" autoFocus />
      <button type="submit">inserir</button>
    </form>
  );
}

export function InputProp(props: any){
  const [text, setText] = useState('');

  let opsClass = style.ops;

  function insertProp(){
    let allowed = true;
    let tempText = replaceOps(text);

    props.propos.forEach((prop: string) => {
      if(prop == tempText){
        allowed = false;
        props.alert("proposição já inserida!");
        setText('');
        return;
      }
    });

    //test if the prop will not error before adding it
    if(allowed){
      let testText = tempText;

      props.simbs.forEach((simb: string) => {
        testText = testText.replace(new RegExp(simb, "g"), "1");
      });

      let testedProp = calcProp(testText.replace(/[⊤⊥]/g, "1"))
      if(testedProp === '1' || testedProp === '0'){
        props.addProp(tempText);
      }else{
        props.alert(testedProp)
      }

      setText('');
    }
  }
  function insertChar(char: string){
    setText(text+char);
  }
  function deleteText(){
    setText(text.slice(0,text.length-1));
  }
  function clearText(){
    setText("");
  }

  return(
    <div id={style.keyboard}>
    <form onSubmit={(e) => {
      e.preventDefault();
      insertProp();
    }}>
      <label htmlFor="prop-input">Insira uma proposição, escreva ou use o teclado virtual</label>
      <input value={text} onChange={(e) => setText(e.target.value)} id="prop-input" type="text"/>
      <button type="submit" className="inserir">inserir</button>

      <div>{props.simbs.map((e: string) => {
        return (<input key={e} className={opsClass} id={"bt" + e} type="button" value={e} onClick={(e) => insertChar(e.currentTarget.value)} />);
      })}</div>
            <input className={opsClass} type="button" value="∧" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="∨" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="¬" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="⊻" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="→" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="⇔" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="(" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value=")" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="⊤" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={opsClass} type="button" value="⊥" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className={style.apagar} type="button" value="apagar" onClick={deleteText}/>
            <input className={style.apagar} type="button" value="limpar" onClick={clearText}/>
    </form>
    </div>
  );
}

function InputSection(props: any){
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertDescription, setAlertDescription] = useState('');
  const [inputFocus, setInputFocus] = useState(true);
  
  // Focus control after the alert
  useEffect(() =>{
    if(document.activeElement === document.getElementById('simb-input')){
      setInputFocus(true)
    }else if(document.activeElement === document.getElementById('prop-input')){
      setInputFocus(false)
    }
    if(inputFocus){
      document.getElementById('simb-input')?.focus()
    }else{
      document.getElementById('prop-input')?.focus()
    }
  }, [alertOpen])

  function updateAlert(description: string){
    setAlertOpen(prevState => !prevState);
    setAlertDescription(description);
  }
  
  return(
    <section className='input-section'>
      <InputSimb addSimb={props.addSimb} simbs={props.simbs} options={props.options} alert={updateAlert}/>
        <p id="warning">Por favor insira os simbolos antes de usa-los e utilize os parenteses em proposições grandes ou complexas</p>
      <InputProp simbs={props.simbs} propos={props.propos} addProp={props.addProp} alert={updateAlert}/>
      <button onClick={() => setAlertOpen(prevState => !prevState)}>{inputFocus?'true':'false'}</button>
      <DialogBox alertOpen={alertOpen} updateAlert={updateAlert} description={alertDescription}/>
    </section>
  )
}

export default InputSection;