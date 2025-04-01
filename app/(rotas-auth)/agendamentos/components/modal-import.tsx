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
import { importarIcs } from '@/services/agendamentos/server-functions/importar-ics';
import { CloudUpload, FilePlus, Loader2 } from 'lucide-react';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function ModalImportAgendamento() {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [file, setFile] = useState<string | null>();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		startTransition(async () => {
			e.preventDefault();
			const data = new FormData(e.target as HTMLFormElement);
			const resp = await importarIcs(data);
			if (!resp || !resp.ok) {
				toast.error('Algo deu errado');
			} else {
				const { agendamentos, duplicados } = resp.data as { agendamentos: number, duplicados: number };
				toast.success(`${agendamentos} agendamento${agendamentos > 1 && 's'} importado${agendamentos > 1 && 's'} com sucesso, ${duplicados} agendamento${duplicados > 1 && 's'} duplicado${duplicados > 1 && 's'} e não inserido${duplicados > 1 && 's'}.`);
				setIsOpen(false);
			}
		});
	}
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
				<form
					onSubmit={(e) => handleSubmit(e)}
					encType='multipart/form-data'>
					<label
						htmlFor='file'
						className='border flex p-4 rounded-lg cursor-pointer items-center justify-center gap-2 text-muted-foreground border-dashed hover:border-primary hover:text-primary transition-all ease-in-out duration-200'>
						<CloudUpload size={24} />
						{isPending ? 'Enviando...' : file ? file : 'Selecione o arquivo'}
					</label>
					<input
						onChange={(e) => {
							const files = e.target.files;
							if (files && files[0]) {
								setFile(files[0].name);
							}
						}}
						id='file'
						type='file'
						name='arquivo'
						accept='.ics'
						title='Selecione o arquivo'
						className='hidden'
					/>
					<Button
						disabled={isPending}
						type='submit'
						className='mt-5 w-full'>
						{isPending ? (
							<>
								Enviar <Loader2 className='animate-spin' />
							</>
						) : (
							'Enviar'
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
