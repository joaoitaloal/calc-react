export function DisplayArea(props: any){
    function delSimb(simb: string){
        props.rmvSimb(simb);
    }
    function delProp(prop: string){
        let arr = [prop];
        props.rmvProp(arr);
    }

    return(
        <div id="inserted">
            <div id="simb-inserted">
                <p>Simbolos inseridos:</p>
                {props.simbs.map((simb: string) => {
                    return (
                    <div key={'divs'+simb} id={'divs'+simb}>
                        <p className="btsimb">{simb}</p>
                        <input id={'del'+simb} type="button" value="apagar" onClick={() => delSimb(simb)}/>
                    </div>);
                })}
            </div>
            <div id="prop-inserted">
                <p>Proposições inseridas:</p>
                {props.props.map((prop: string) => {
                    return (
                    <div key={'divs'+prop} id={'divs'+prop}>
                        <p className="btprop">{prop}</p>
                        <input id={'del'+prop} type="button" value="apagar" onClick={() => delProp(prop)}/>
                    </div>);
                })}
            </div>
        </div>
    );
}