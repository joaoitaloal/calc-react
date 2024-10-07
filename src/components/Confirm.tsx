import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from '../styles/confirm.module.scss';

function ConfirmBox(props: any){
    return(
	<AlertDialog.Root open={props.open} onOpenChange={props.updateConfirm}>
        <AlertDialog.Content className={styles.Content}>
            <AlertDialog.Title className={styles.Title}>
                Você tem certeza?
            </AlertDialog.Title>
            <AlertDialog.Description className={styles.Description}>
                {props.description || "Error: No description"}
            </AlertDialog.Description>
            <div style={{ display: "flex", gap: 50, justifyContent: 'center'}}>
                <AlertDialog.Cancel asChild>
                    <button id={styles.cancel} className={styles.Button} onClick={() => props.setConfirm(false)}>cancelar</button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                    <button id={styles.confirm} className={styles.Button} onClick={() => props.setConfirm(true)}>sim</button>
                </AlertDialog.Action>
            </div>
        </AlertDialog.Content>
	</AlertDialog.Root>
    )
};

export default ConfirmBox;
