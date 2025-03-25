/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogClose } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
// import { criar } from '@/services/agendamentos/server-functions/criar';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	municipe: z.string({
		coerce: true,
		required_error: 'Este campo é obrigatório',
	}),
	rg: z.string().optional(),
	cpf: z.string().optional(),
	processo: z.string({
		coerce: true,
		required_error: 'Este campo é obrigatório',
	}),
	motivoId: z.string({
		coerce: true,
		required_error: 'Este campo é obrigatório',
	}),
	coordenadoriaId: z.string({
		coerce: true,
		message: 'Este campo é obrigatório',
	}),
	tecnicoId: z.string({
		coerce: true,
		required_error: 'Este campo é obrigatório',
	}),
	data: z.date({ coerce: true, message: 'Este campo é obrigatório' }),
	startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'Horário deve estar no formato HH:MM',
	}),
	endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'Horário deve estar no formato HH:MM',
	}),
	resumo: z.string(),
});

export default function FormAgendamento() {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coordenadoriaId: '',
			cpf: '',
			data: new Date(),
			motivoId: '',
			municipe: '',
			processo: '',
			rg: '',
			tecnicoId: '',
			resumo: '',
			startTime: '',
			endTime: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		const {
			coordenadoriaId,
			data,
			startTime,
			endTime,
			motivoId,
			municipe,
			processo,
			tecnicoId,
			cpf,
			rg,
		} = values;

		const dataInicio = new Date(
			data.getFullYear(),
			data.getMonth(),
			data.getDate(),
			+startTime.split(':')[0],
			+startTime.split(':')[1],
		);

		const dataFim = new Date(
			data.getFullYear(),
			data.getMonth(),
			data.getDate(),
			+endTime.split(':')[0],
			+endTime.split(':')[1],
		);

		form.setValue(
			'resumo',
			`Motivo: ${motivoId}; Munícipe: ${municipe}; RG:${rg}; CPF:${cpf}; Técnico:${tecnicoId}; Coordenadoria: ${coordenadoriaId}; Processo:${processo}`,
		);

		console.log({ dataInicio, dataFim });

		startTransition(() => {
			toast.success('seus dados', {
				description: `${coordenadoriaId} - ${data}-${motivoId}-${municipe}-${tecnicoId}-${dataInicio} - ${dataFim}`,
			});
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-5 w-full mb-5'>
					<FormField
						control={form.control}
						name='municipe'
						render={({ field }) => (
							<FormItem aria-required>
								<FormLabel aria-required>Munícipe</FormLabel>
								<FormControl aria-required>
									<Input
										required
										placeholder='Nome do munícipe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='rg'
						render={({ field }) => (
							<FormItem>
								<FormLabel>RG</FormLabel>
								<FormControl>
									<Input
										placeholder='RG do munícipe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='cpf'
						render={({ field }) => (
							<FormItem>
								<FormLabel>CPF</FormLabel>
								<FormControl>
									<Input
										placeholder='CPF do munícipe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='processo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nº do Processo</FormLabel>
								<FormControl>
									<Input
										required
										placeholder='Número do processo'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='coordenadoriaId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Coordenadoria</FormLabel>
								<Select
									required
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-56 text-nowrap bg-background'>
											<SelectValue placeholder='Selecione a coordenadoria' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='RESID'>RESID</SelectItem>
										<SelectItem value='SERVIN'>SERVIN</SelectItem>
										<SelectItem value='GTEC'>GTEC</SelectItem>
										<SelectItem value='PARHIS'>PARHIS</SelectItem>
										<SelectItem value='CAP'>CAP</SelectItem>
										<SelectItem value='COMIN'>COMIN</SelectItem>
										<SelectItem value='CONTRU'>CONTRU</SelectItem>
										<SelectItem value='CAEPP'>CAEPP</SelectItem>
										<SelectItem value='ASCOM'>ASCOM</SelectItem>
										<SelectItem value='ATECC'>ATECC</SelectItem>
										<SelectItem value='ATIC'>ATIC</SelectItem>
										<SelectItem value='CASE'>CASE</SelectItem>
										<SelectItem value='DEUSO'>DEUSO</SelectItem>
										<SelectItem value='GAB'>COMIN</SelectItem>
										<SelectItem value='GAB_CI'>GAB/CI</SelectItem>
										<SelectItem value='GEOINFO'>GEOINFO</SelectItem>
										<SelectItem value='LICEN'>LICEN</SelectItem>
										<SelectItem value='PLANURB'>PLANURB</SelectItem>
										<SelectItem value='STEL'>STEL</SelectItem>
										<SelectItem value='URB'>URB</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='motivoId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Motivo</FormLabel>
								<Select
									required
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-56 text-nowrap bg-background'>
											<SelectValue placeholder='Selecione o motivo' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='1'>
											Atendimento Técnico - Comunicado
										</SelectItem>
										<SelectItem value='2'>
											Atendimento Técnico - Recurso
										</SelectItem>
										<SelectItem value='3'>
											Sala Arthur Saboya (Consulta Pré-Projeto)
										</SelectItem>
										<SelectItem value='4'>
											Protocolo (Entrega / Retirada de Documentos Físicos)
										</SelectItem>
										<SelectItem value='5'>
											Protocolo (Comunicado / Indeferimento)
										</SelectItem>
										<SelectItem value='6'>
											Notificação - Função Social da Propriedade
										</SelectItem>
										<SelectItem value='7'>Visita Institucional</SelectItem>
										<SelectItem value='8'>Evento</SelectItem>
										<SelectItem value='9'>Vistas a Processo Físico</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tecnicoId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Técnico</FormLabel>
								<Select
									required
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-full text-nowrap bg-background'>
											<SelectValue
												defaultValue={undefined}
												placeholder='Selecione o técnico'
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='t1'>Técnico 1</SelectItem>
										<SelectItem value='t2'>Técnico 2</SelectItem>
										<SelectItem value='t3'>Técnico 3</SelectItem>
										<SelectItem value='t4'>Técnico 4</SelectItem>
										<SelectItem value='t5'>Técnico 5</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='data'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Data</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal text-foreground',
													!field.value && 'text-muted-foreground',
												)}>
												{field.value ? (
													format(field.value, 'PPP', { locale: ptBR })
												) : (
													<span>Escolha uma data</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < new Date() || date < new Date('1900-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex w-full items-center justify-between gap-5 mb-5'>
					<FormField
						control={form.control}
						name='startTime'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Horário Inicial</FormLabel>
								<FormControl>
									<Input
										className='w-56'
										placeholder='HH:MM'
										{...field}
										type='time'
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='endTime'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Horário Final</FormLabel>
								<FormControl>
									<Input
										className='w-56'
										placeholder='HH:MM'
										{...field}
										type='time'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='resumo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Resumo</FormLabel>
							<FormControl>
								<Textarea
									placeholder='resumo e observações do agendamento'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex items-center gap-3 justify-end mt-10'>
					<DialogClose asChild>
						<Button variant='outline'>Sair</Button>
					</DialogClose>
					<Button
						disabled={isPending}
						type='submit'>
						Cadastrar {isPending && <Loader2 className='animate-spin' />}
					</Button>
				</div>
			</form>
		</Form>
	);
}
