import style from "../styles/option.module.scss"

export class option{

    simbLimited: boolean;
    test: number;

    constructor(simbLimited = true, test = 1){
        this.simbLimited = simbLimited;
        this.test = test;
    }   
}

interface optionsProps{
    options: option;
    updateOptions: (option: option) => void;
    mobile: boolean;
}

export function Options(props: optionsProps){

    return(
    <div className={props.mobile?`${style.options_mobile}`:`${style.options_desktop}`}>
        <h2>Opções</h2>
        <label >Desativar limitação de símbolos</label>
        <input checked={!props.options.simbLimited} type="checkbox" onChange={() => props.updateOptions(new option(!props.options.simbLimited, props.options.test))}/>
    </div>
    );
}
