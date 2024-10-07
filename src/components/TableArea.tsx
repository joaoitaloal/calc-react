import { readProp, initialSimbValue } from "../lib/dataCalc";
import style from "../styles/tableArea.module.scss";

export function TableArea(props: any){
    function TableCells(cellProps: any){
        let cells = [];
        let simbsValue = [];
        let x = 0;

        for(x = 0; x < props.simbs.length; x++){
            let value = initialSimbValue(x, cellProps.y);
            cells[x] = <td key={`x${x}y${cellProps.y}`} id={`x${x}y${cellProps.y}`} className={value == "v"?`${style.v}`:`${style.f}`}>{value}</td>
            simbsValue[x] = value;
        }
        for(let x2 = 0; x2 < props.propos.length; x2++){
            let value = readProp(props.simbs, simbsValue, props.propos[x2]);
            cells[x] = <td key={`x${x}y${cellProps.y}`} id={`x${x}y${cellProps.y}`} className={value=="1"?`${style.verdadeiroprop}`:`${style.falsoprop}`}>{value=="1"?"v":"f"}</td>
            x++;
        }
        return <>{cells}</>;
    }

    function TableBody(){
        let tableRows = [];
        
        for(let y = 0; y < 2**props.simbs.length; y++){
            tableRows[y] = <tr className="row" id={'row'+String(y)} key={'tr'+String(y)}>
                <TableCells y={y}/>
            </tr>;
        }

        return <>{tableRows}</>;
    }

    return(
        <div >
            <table className={style.table}>
                <thead>
                    <tr id="table-header">
                        {props.simbs.map((e: string) => {
                            return (<th key={e} className={"sim"+String(props.simbs.indexOf(e))}>{e}</th>)
                        })}
                        {props.propos.map((e: string) => {
                            return (<th key={e} className={"prop"+String(props.propos.indexOf(e))}>{e}</th>)
                        })}
                    </tr>
                </thead>
                <tbody id="table-body">
                    <TableBody />
                </tbody>
            </table>
        </div>
    );
}