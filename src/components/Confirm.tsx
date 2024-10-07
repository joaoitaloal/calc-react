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
            <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                <AlertDialog.Cancel asChild>
                    <button className={styles.Button} onClick={() => props.setConfirm(false)}>Cancelar</button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                    <button className={styles.Button} onClick={() => props.setConfirm(true)}>Sim</button>
                </AlertDialog.Action>
            </div>
        </AlertDialog.Content>
	</AlertDialog.Root>
    )
};

export default ConfirmBox;
