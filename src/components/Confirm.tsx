import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from '../styles/confirm.module.scss';

function ConfirmBox(props: any){
    return(
	<AlertDialog.Root open={props.open} onOpenChange={props.setOpen}>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className={styles.Overlay} />
			<AlertDialog.Content className={styles.Content}>
				<AlertDialog.Title className={styles.Title}>
					Você tem certeza?
				</AlertDialog.Title>
				<AlertDialog.Description className={styles.Description}>
					{props.description}
				</AlertDialog.Description>
				<div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
					<AlertDialog.Cancel asChild>
						<button className={`${styles.Button} muave`}>Cancelar</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className={`${styles.Button} red`}>
							Sim
						</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
    )
};

export default ConfirmBox;
