import * as Dialog from '@radix-ui/react-dialog';
import styles from '../styles/dialog.module.scss'

function DialogBox(props: any){

    return (
        <Dialog.Root open={props.alertOpen} onOpenChange={props.updateAlert}>
        <Dialog.Portal>
            <Dialog.Overlay className={styles.Overlay} />
            <Dialog.Content className={styles.Content}>
            <Dialog.Title className={styles.Title}>AVISO!</Dialog.Title>
            <Dialog.Description className={styles.Description}>
                {props.description || "Error: No description"}
            </Dialog.Description>
            <Dialog.Close asChild>
            <button className={styles.Button}>OK</button>
            </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
        </Dialog.Root>
    );
}

export default DialogBox;