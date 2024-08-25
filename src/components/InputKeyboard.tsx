import { useState } from "react";
import { calcProp } from "../lib/dataCalc"; 

export function InputSimb(props: any){
  const [text, setText] = useState('');

  function insertSimb(){
    props.addSimb(text)
  }

  return(
    <>
      <label htmlFor="simb-input">Insira até 10 simbolos</label>
      <input value={text} onChange={(e) => setText(e.target.value)} id="simb-input" type="text" />
      <button onClick={insertSimb}>inserir</button>
    </>
  );
}

export function InputProp(props: any){
  const [text, setText] = useState('');

  function insertProp(){
    //test if the prop will not error before adding it
    if(calcProp(text.replace(/[^∧∨¬⊻→⇔().,TF⊤⊥~⊕= ]/g, "1")) !== "")
      props.addProp(text);
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
    <>
      <label htmlFor="prop-input">Insira uma proposição</label>
      <input value={text} onChange={(e) => setText(e.target.value)} id="prop-input" type="text"/>
      <button onClick={insertProp} className="inserir">inserir</button>

      <div id="adicionador">{props.simbs.map((e: string) => {
        return (<input key={e} className="ops" id={"bt" + e} type="button" value={e} onClick={(e) => insertChar(e.currentTarget.value)}/>);
      })}</div>
            <input className="ops" type="button" value="∧" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="∨" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="¬" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="⊻" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="→" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="⇔" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="(" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value=")" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="⊤" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="ops" type="button" value="⊥" onClick={(e) => insertChar(e.currentTarget.value)}/>
            <input className="apagar" type="button" value="apagar" onClick={deleteText}/>
            <input className="apagar" type="button" value="limpar" onClick={clearText}/>
    </>
  );
}