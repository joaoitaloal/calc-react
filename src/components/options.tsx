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
    let mobId = props.mobile?"-mobile":'';

    return(
    <div id={'options'+mobId}>
        <h2>Opções</h2>
        <label htmlFor={"simb-limited"+mobId}>Desativar limitação de símbolos</label>
        <input checked={!props.options.simbLimited} type="checkbox" name={"simb-limited"+mobId} id={"simb-limited"+mobId} onChange={() => props.updateOptions(new option(!props.options.simbLimited, props.options.test))}/>
    </div>
    );
}
