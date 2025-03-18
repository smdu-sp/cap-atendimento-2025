/** @format */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const FormSchema = z.object({
	motivo: z.string({
		required_error: 'A cpf is required.',
	}),
});

export function AgendamentoPorMotivo() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast('You submitted the following values:', {
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex items-end gap-5'>
				<FormField
					control={form.control}
					name='motivo'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Motivo</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-60 text-nowrap bg-background'>
										<SelectValue placeholder='Selecione o Motivo' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem
										value='all'
										className='text-nowrap'>
										Todas os motivos
									</SelectItem>
									<SelectItem value='COMUNICADO'>
										Atendimento Técnico - Comunicado
									</SelectItem>
									<SelectItem value='RECURSO'>
										Atendimento Técnico - Recurso
									</SelectItem>
									<SelectItem value='CONSULTA'>
										Sala Arthur Saboya (Consulta Pré-Projeto)
									</SelectItem>
									<SelectItem value='P-ENT/RET'>
										Protocolo (Entrega / Retirada de Documentos Físicos)
									</SelectItem>
									<SelectItem value='P-COM/INDEF'>
										Protocolo (Comunicado / Indeferimento)
									</SelectItem>
									<SelectItem value='N-FSP'>
										Notificação - Função Social da Propriedade
									</SelectItem>
									<SelectItem value='VI'>Visita Institucional</SelectItem>
									<SelectItem value='EVENTO'>Evento</SelectItem>
									<SelectItem value='VPF'>Vistas a Processo Físico</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
