/** @format */
'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { atualizar } from '@/services/coordenadorias/server-functions/atualizar';
import { Check, Loader2, Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function ModalDelete({
	id,
	status,
}: {
	id: string;
	status: boolean;
}) {
	const [isPending, startTransition] = useTransition();

	async function handleDelete(id: string) {
		const resp = status
			? await atualizar(id, { status: false })
			: await atualizar(id, { status: true });
		if (!resp.ok) {
			toast.error('Algo deu errado', { description: resp.error });
		} else {
			window.location.reload();
			toast.success(
				status
					? 'Coordenadoria Ativado com sucesso'
					: 'Coordenadoria Deletada com sucesso',
				{
					description: resp.status,
				},
			);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					variant={'outline'}
					className={`${
						!status ? 'hover:bg-primary' : 'hover:bg-destructive'
					} cursor-pointer hover:text-white group transition-all ease-linear duration-200`}>
					{!status ? (
						<Check
							size={24}
							className='text-primary dark:text-white group-hover:text-white group'
						/>
					) : (
						<Trash2
							size={24}
							className='text-destructive dark:text-white group-hover:text-white group'
						/>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{!status ? 'Ativar Motivo' : 'Excluir Motivo'}
					</DialogTitle>
				</DialogHeader>
				{!status ? (
					<p>Tem certeza que deseja ativar essa coordenadoria?</p>
				) : (
					<p>Tem certeza que deseja remover essa coordenadoria?</p>
				)}
				<DialogFooter>
					<div className='flex gap-2'>
						<DialogClose asChild>
							<Button
								id='close'
								variant={'outline'}>
								Voltar
							</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							onClick={() =>
								startTransition(() => {
									handleDelete(id);
								})
							}
							type='submit'
							variant={!status ? 'default' : 'destructive'}
							className='opacity-80'>
							{status ? (
								<>Deletar {isPending && <Loader2 className='animate-spin' />}</>
							) : (
								<>Ativar {isPending && <Loader2 className='animate-spin' />}</>
							)}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
