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

export default function ModalFormAgendamento() {
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
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cadastrar Agendamento</DialogTitle>
					<DialogDescription>
						Preencha os dados para cadastrar novo agendamento{' '}
					</DialogDescription>
				</DialogHeader>
				<FormAgendamento />
			</DialogContent>
		</Dialog>
	);
}
