export function ReferenceTable(props: any){
    return (
        <div id={'reference'+(props.mobile?'-mobile':'')}>
            <h2>Tabela de referência</h2>
            <p>As formas de escrever que estão na mesma linha dão o mesmo resultado:</p>
            <table>
            <tbody>
                <tr>
                <td>and</td>
                <td>∧</td>
                <td>.</td>
                </tr>
                <tr>
                <td>or</td>
                <td>∨</td>
                <td>+</td>
                </tr>
                <tr>
                <td>not</td>
                <td>~</td>
                <td>¬</td>
                </tr>
                <tr>
                <td>xor</td>
                <td>⊕</td>
                <td>⊻</td>
                </tr>
                <tr>
                <td>imp</td>
                <td>implicacao</td>
                <td>={'>'}</td>
                <td>→</td>
                </tr>
                <tr>
                <td>biimp</td>
                <td>=</td>
                <td>⇔</td>
                <td>xnor</td>
                </tr>
                <tr>
                <td>tautologia</td>
                <td>T(t maiusculo)</td>
                <td>⊤</td>
                </tr>
                <tr>
                <td>absurdo</td>
                <td>F</td>
                <td>⊥</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}