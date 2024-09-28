import { useState } from "react";
import { calcProp, replaceOps } from "../lib/dataCalc"; 
import style from "../styles/keyboard.module.scss"

export function InputSimb(props: any){
  const [text, setText] = useState('');
  const simbLimited = props.options.simbLimited;

  function insertSimb(){
    let allowed = true;

    props.simbs.forEach((simb: string) => {
      if(simb == text){
        allowed = false;
        window.alert("Simbolo já inserido!")
      }
    });

    if(text.length != 1){
      allowed = false;
      window.alert("Um caractere por simbolo!")
    }

    if(text.search(/[∧∨¬⊻→⇔().,TFtf⊤⊥~⊕= ]/) != -1){
      allowed = false;
      window.alert("simbolo inválido");
    }

    if(allowed){
      if (props.simbs.length < 10 || !simbLimited){
        props.addSimb(text);
      }
      else{
        window.alert('Número máximo de simbolos inseridos')
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
      <input value={text} onChange={(e) => setText(e.target.value)} id="simb-input" type="text" />
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

    props.props.forEach((prop: string) => {
      if(prop == tempText){
        allowed = false;
        window.alert("proposição já inserida!");
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

      if(calcProp(testText.replace(/[⊤⊥]/g, "1")) !== ""){
        props.addProp(tempText);
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
        return (<input key={e} className={opsClass} id={"bt" + e} type="button" value={e} onClick={(e) => insertChar(e.currentTarget.value)}/>);
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