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
import { ICoordenadoria } from '@/types/coordenadoria';
import { Plus, SquarePen } from 'lucide-react';
import FormCoornadoria from './form-coordenadoria';
// import FormUsuario from './form-usuario';

export default function ModalUpdateAndCreate({
	isUpdating,
	coordenadoria,
}: {
	isUpdating: boolean;
	coordenadoria?: Partial<ICoordenadoria>;
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
					<DialogTitle>
						{isUpdating ? 'Editar ' : 'Criar '}Coordenadoria
					</DialogTitle>
					<DialogDescription>
						Gerencie as informações da coordenadoria selecionada
					</DialogDescription>
				</DialogHeader>
				<FormCoornadoria
					coordenadoria={coordenadoria}
					isUpdating={isUpdating}
				/>
			</DialogContent>
		</Dialog>
	);
}
