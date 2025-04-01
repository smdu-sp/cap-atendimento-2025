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
import { atualizar } from '@/services/agendamentos/server-functions/atualizar';
import { IAgendamento } from '@/types/agendamentos';
import { ICoordenadoria } from '@/types/coordenadoria';
import { IMotivo } from '@/types/motivo';
import { IUsuarioTecnico } from '@/types/usuario';
// import { criar } from '@/services/agendamentos/server-functions/criar';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
	.object({
		municipe: z.string({
			coerce: true,
			required_error: 'Este campo é obrigatório',
			message: 'Este campo é obrigatório',
		}),
		rg: z.string().optional(),
		cpf: z.string().optional(),
		processo: z.string({
			coerce: true,
			required_error: 'Este campo é obrigatório',
			message: 'Este campo é obrigatório',
		}),
		motivoId: z.string({
			coerce: true,
			required_error: 'Este campo é obrigatório',
			message: 'Este campo é obrigatório',
		}),
		coordenadoriaId: z.string({
			coerce: true,
			required_error: 'Este campo é obrigatório',
			message: 'Este campo é obrigatório',
		}),
		tecnicoId: z.string({
			coerce: true,
			required_error: 'Este campo é obrigatório',
			message: 'Este campo é obrigatório',
		}),
		data: z.date({ coerce: true, message: 'Este campo é obrigatório' }),
		startTime: z
			.string()
			.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
				message: 'Horário deve estar no formato HH:MM',
			})
			.refine(
				(time: string) => {
					const [hours] = time.split(':').map(Number);
					return hours >= 10;
				},
				{
					message: 'O horário inicial não pode ser anterior às 10:00',
				},
			),
		endTime: z
			.string()
			.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
				message: 'Horário deve estar no formato HH:MM',
			})
			.refine(
				(time: string) => {
					const [hours, minutes] = time.split(':').map(Number);
					return hours < 17 || (hours === 17 && minutes === 0);
				},
				{
					message: 'O horário final não pode ser superior às 17:00',
				},
			),
		resumo: z.string(),
	})
	.refine(
		(data) => {
			const [startHours, startMinutes] = data.startTime.split(':').map(Number);
			const [endHours, endMinutes] = data.endTime.split(':').map(Number);

			const startTotalMinutes = startHours * 60 + startMinutes;
			const endTotalMinutes = endHours * 60 + endMinutes;

			return endTotalMinutes - startTotalMinutes >= 15;
		},
		{
			message: 'A reunião deve ter no mínimo 15 minutos',
			path: ['endTime'],
		},
	);

interface FormEditAgendamentoProps {
	agendamento: Partial<IAgendamento>;
	motivos: IMotivo[];
	coordenadorias: ICoordenadoria[];
	tecnicos: IUsuarioTecnico[];
}
export default function FormEditAgendamento({
	agendamento,
	coordenadorias,
	motivos,
	tecnicos,
}: FormEditAgendamentoProps) {
	const [isPending, startTransition] = useTransition();

	const startDate = new Date(agendamento?.dataInicio ?? Date.now());
	const endDate = new Date(agendamento?.dataFim ?? Date.now());
	const startTime = startDate.toTimeString().slice(0, 5);
	const endTime = endDate.toTimeString().slice(0, 5);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coordenadoriaId: agendamento.coordenadoriaId ?? '',
			cpf: agendamento.cpf ?? '',
			data: agendamento.dataInicio ?? new Date(),
			motivoId: agendamento.motivoId ?? '',
			municipe: agendamento.municipe ?? '',
			processo: agendamento.processo ?? '',
			rg: agendamento.rg ?? '',
			tecnicoId: agendamento.tecnicoId ?? '',
			resumo: agendamento.resumo ?? '',
			startTime: startTime ?? '',
			endTime: endTime ?? '',
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
			resumo,
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

		startTransition(async () => {
			if (!agendamento.id) {
				toast.error('ID do agendamento não encontrado');
				return;
			}
			const resp = await atualizar(agendamento.id, {
				coordenadoriaId,
				cpf,
				dataFim,
				dataInicio,
				motivoId,
				municipe,
				processo,
				resumo,
				rg,
				tecnicoId,
			});

			if (!resp.ok) {
				toast.error('Algo deu errado');
			} else {
				toast.success('Agendamento atualizado com sucesso');
			}
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid md:grid-cols-2 gap-5 items-end w-full mb-5'>
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
										<SelectTrigger className='w-full text-nowrap bg-background'>
											<SelectValue placeholder='Selecione a coordenadoria' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{coordenadorias.map((item) => {
											return (
												<SelectItem
													key={item.id}
													value={item.id}>
													{item.sigla}
												</SelectItem>
											);
										})}
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
										<SelectTrigger className='w-full text-nowrap bg-background'>
											<SelectValue placeholder='Selecione o motivo' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{motivos.map((item) => {
											return (
												<SelectItem
													key={item.id}
													value={item.id}>
													{item.texto}
												</SelectItem>
											);
										})}
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
										{tecnicos.map((item) => {
											return (
												<SelectItem
													key={item.id}
													value={item.id}>
													{item.nome}
												</SelectItem>
											);
										})}
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
													'w-full pl-3 text-left font-normal text-foreground',
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
				<div className='flex flex-col md:flex-row w-full md:items-center justify-between gap-5 mb-5'>
					<FormField
						control={form.control}
						name='startTime'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Horário Inicial</FormLabel>
								<FormControl>
									<Input
										className='md:w-76'
										placeholder='HH:MM'
										{...field}
										type='time'
									/>
								</FormControl>
								<FormMessage />
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
										className='md:w-76'
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
						Atualizar {isPending && <Loader2 className='animate-spin' />}
					</Button>
				</div>
			</form>
		</Form>
	);
}
