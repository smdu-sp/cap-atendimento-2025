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
import { FilePlus } from 'lucide-react';
import { useState } from 'react';

export default function ModalImportAgendamento() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger
				asChild
				className='flex justify-start w-full gap-3 cursor-pointer'>
				<Button
					variant={'ghost'}
					onClick={() => setIsOpen(true)}>
					<FilePlus />
					Importar ICS
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Importar Dados</DialogTitle>
					<DialogDescription>
						Adicione o arquivo ICS para adicionar novos agendamentos
					</DialogDescription>
				</DialogHeader>
				INPUT
			</DialogContent>
		</Dialog>
	);
}
