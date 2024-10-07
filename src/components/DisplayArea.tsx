import { useEffect, useState } from "react";
import style from "../styles/displayArea.module.scss";
import ConfirmBox from "./Confirm";

export function DisplayArea(props: any){
    const [confirm, setConfirm] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmDescription, setConfirmDescription] = useState('');
    const [currDelSimb, setCurrDelSimb] = useState('');
    const [rmv, setRmv] = useState(new Array<string>);
    
    //This one is a little more complicated because it checks props that use the simbol trying to be deleted and removes these props if the user confirms
    //A lot of extra code originated from the confirm window
    function delSimb(simb: string){
        let asked = false;
        setCurrDelSimb(simb);
        let i = 0;
        let arr = [];

        props.propos.forEach((prop: string) => {
            if(prop.includes(simb)){
                if (!asked){
                    updateConfirm("As proposições que incluem este simbolo serão deletadas!")
                }
                // dont ask everytime the foreach loops
                asked = true;

                arr[i] = prop;
                i++;

                setRmv(arr)
            }
        });
        if(!asked){
            const arr = [...props.simbs];
            arr.splice(arr.indexOf(simb), 1);
            props.setSimbs(arr);
        }
    }

    useEffect(() =>{
        if(confirm){
            delProp(rmv);
            const arr = [...props.simbs];
            arr.splice(arr.indexOf(currDelSimb), 1);
            props.setSimbs(arr);

            setRmv([])
            setCurrDelSimb('');
            setConfirm(false)
        }
    })

    function delProp(prop: Array<string>){
        const arr = [...props.propos];
        
        prop.forEach((p) => {
        arr.splice(arr.indexOf(p), 1);
        })

        props.setProps(arr);
    }

    function updateConfirm(description: string){
        setConfirmDescription(description)
        setOpenConfirm(prevstate => !prevstate)
    }

    return(
        <>
        <div id={style.inserted}>
            <div id="simb-inserted">
                <p>Simbolos inseridos:</p>
                {props.simbs.map((simb: string) => {
                    return (
                    <div key={'divs'+simb} id={'divs'+simb}>
                        <p className={style.bt}>{simb}</p>
                        <input id={'del'+simb} type="button" value="apagar" onClick={() => delSimb(simb)}/>
                    </div>);
                })}
            </div>
            <div id="prop-inserted">
                <p>Proposições inseridas:</p>
                {props.propos.map((prop: string) => {
                    return (
                    <div key={'divs'+prop} id={'divs'+prop}>
                        <p className={style.bt}>{prop}</p>
                        <input id={'del'+prop} type="button" value="apagar" onClick={() => delProp([prop])}/>
                    </div>);
                })}
            </div>
        </div>
        <button onClick={() => setOpenConfirm(prevState => !prevState)}>{confirm?'true':'false'}</button>
        <ConfirmBox open={openConfirm} updateConfirm={updateConfirm} description={confirmDescription} setConfirm={setConfirm}/>
        </>
    );
}