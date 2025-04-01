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
import { atualizar } from '@/services/motivos/server-functions/atualizar';
import { criar } from '@/services/motivos/server-functions/criar';
import { IMotivo } from '@/types/motivo';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	texto: z.string().min(4).max(50),
	status: z.boolean().optional(),
});

interface FormMotivoProps {
	isUpdating: boolean;
	motivo?: Partial<IMotivo>;
}

export default function FormMotivo({ isUpdating, motivo }: FormMotivoProps) {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			texto: motivo?.texto ?? '',
			status: motivo?.status ?? true,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			if (isUpdating && motivo?.id) {
				const resp = await atualizar(motivo.id, {
					texto: values.texto,
					status: values.status,
				});
				if (resp.error) {
					toast.error('Algo deu errado', { description: resp.error });
				}
				if (resp.ok) {
					toast.success('Motivo Atualizado', { description: values.texto });
					window.location.reload();
				}
			} else {
				//CRIA MOTIVO
				const { texto } = values;
				const resp = await criar({ texto });
				if (resp.error) {
					toast.error('Algo deu errado', { description: resp.error });
				}
				if (resp.ok) {
					toast.success('Motivo Criado', { description: texto });
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
					name='texto'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Motivo</FormLabel>
							<FormControl>
								<Input
									placeholder='Motivo para agendamento'
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
