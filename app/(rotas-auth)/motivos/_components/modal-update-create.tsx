/** @format */

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { IMotivo } from '@/types/motivo';
import { Plus, SquarePen } from 'lucide-react';
import FormMotivo from './form-motivo';
// import FormUsuario from './form-usuario';

export default function ModalUpdateAndCreate({
	isUpdating,
	motivo,
}: {
	isUpdating: boolean;
	motivo?: Partial<IMotivo>;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					variant={'outline'}
					className={`${
						isUpdating
							? 'bg-background hover:bg-primary '
							: 'bg-primary hover:bg-primary hover:opacity-70'
					} group transition-all ease-linear duration-200`}>
					{isUpdating ? (
						<SquarePen
							size={28}
							className='text-primary group-hover:text-white group'
						/>
					) : (
						<Plus
							size={28}
							className='text-white group'
						/>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{isUpdating ? 'Editar ' : 'Criar '}Motivo</DialogTitle>
					<DialogDescription>
						Gerencie as informações do motivo selecionado
					</DialogDescription>
				</DialogHeader>
				<FormMotivo
					motivo={motivo}
					isUpdating={isUpdating}
				/>
			</DialogContent>
		</Dialog>
	);
}
