/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { atualizar } from '@/services/coordenadorias/server-functions/atualizar';
import { criar } from '@/services/coordenadorias/server-functions/criar';
import { ICoordenadoria } from '@/types/coordenadoria';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	sigla: z.string().min(4).max(50),
	status: z.boolean().optional(),
});

interface FormMotivoProps {
	isUpdating: boolean;
	coordenadoria?: Partial<ICoordenadoria>;
}

export default function FormCoornadoria({
	isUpdating,
	coordenadoria,
}: FormMotivoProps) {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			sigla: coordenadoria?.sigla ?? '',
			status: coordenadoria?.status ?? true,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			if (isUpdating && coordenadoria?.id) {
				const resp = await atualizar(coordenadoria.id, {
					sigla: values.sigla,
					status: values.status,
				});

				if (resp.error) {
					toast.error('Algo deu errado', { description: resp.error });
				}
				if (resp.ok) {
					toast.success('Coordenadoria Atualizado', {
						description: values.sigla,
					});
					window.location.reload();
				}
			} else {
				//CRIA MOTIVO
				const { sigla } = values;
				const resp = await criar({ sigla });
				if (resp.error) {
					toast.error('Algo deu errado', { description: resp.error });
				}
				if (resp.ok) {
					toast.success('Coordenadoria Criada', { description: sigla });
					window.location.reload();
				}
			}
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=' flex flex-col gap-5 w-full mb-5'>
				<FormField
					control={form.control}
					name='sigla'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Coordenadoria</FormLabel>
							<FormControl>
								<Input
									placeholder='Sigla da coordenadoria para agendamento'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={isPending}
					type='submit'>
					{isPending ? (
						<>
							{isUpdating ? 'Atualizar' : 'Criar'}
							<Loader2 className='animate-spin' />
						</>
					) : (
						<>
							{isUpdating ? 'Atualizar' : 'Criar'} <ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
