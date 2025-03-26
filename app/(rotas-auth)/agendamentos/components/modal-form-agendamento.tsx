/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { CalendarPlus } from 'lucide-react';
import { useState } from 'react';
import FormAgendamento from './form-agendamento';
import { ICoordenadoria } from '@/types/coordenadoria';
import { IMotivo } from '@/types/motivo';
import { IUsuarioTecnico } from '@/types/usuario';

interface FormAgendamentoProps {
	motivos: IMotivo[];
	coordenadorias: ICoordenadoria[];
	tecnicos: IUsuarioTecnico[];
}

export default function ModalFormAgendamento({
	motivos,
	coordenadorias,
	tecnicos,
}: FormAgendamentoProps) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger
				asChild
				className='flex items-center gap-3 cursor-pointer'>
				<Button
					onClick={() => setIsOpen(true)}
					variant={'ghost'}>
					<CalendarPlus />
					Novo Agendadamento
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md md:max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Cadastrar Agendamento</DialogTitle>
					<DialogDescription>
						Preencha os dados para cadastrar novo agendamento{' '}
					</DialogDescription>
				</DialogHeader>
				<FormAgendamento
					motivos={motivos}
					coordenadorias={coordenadorias}
					tecnicos={tecnicos}
				/>
			</DialogContent>
		</Dialog>
	);
}
