/** @format */

'use client';

import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle, Calendar, Clock, Users, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type Unavailability = {
	id: string;
	technicianId: string;
	date: Date;
	startTime: string;
	endTime: string;
	reason?: string;
	isFullDay?: boolean;
};

type Appointment = {
	id: string;
	technicianId: string;
	date: Date;
	startTime: string;
	endTime: string;
	institution: string;
	projectName: string;
	notes?: string;
};

// Adicionar o tipo LeaveRequest após o tipo Appointment
type LeaveRequest = {
	id: string;
	technicianId: string;
	startDate: Date;
	endDate: Date;
	reason: string;
	type: 'vacation' | 'medical' | 'other';
};

// Dados de exemplo para agendamentos
const sampleAppointments: Appointment[] = [
	{
		id: '1',
		technicianId: '1',
		date: new Date(2025, 3, 2), // 2 de abril de 2025
		startTime: '10:00',
		endTime: '10:30',
		institution: 'Escola Municipal',
		projectName: 'Reforma da Biblioteca',
	},
	{
		id: '2',
		technicianId: '1',
		date: new Date(2025, 3, 2), // 2 de abril de 2025
		startTime: '11:30',
		endTime: '12:00',
		institution: 'Hospital Regional',
		projectName: 'Ampliação da Ala Pediátrica',
	},
	{
		id: '3',
		technicianId: '2',
		date: new Date(2025, 3, 3), // 3 de abril de 2025
		startTime: '14:00',
		endTime: '14:30',
		institution: 'Centro Cultural',
		projectName: 'Restauração da Fachada',
	},
];

// Horários disponíveis (10h às 17h com intervalos de 30min)
const timeSlots = [
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
];

export function Content() {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		new Date(),
	);
	// Definir um técnico fixo para simular o login do usuário atual
	const [selectedTechnician] = useState<string>('1');
	const [unavailabilities, setUnavailabilities] = useState<Unavailability[]>([
		{
			id: '1',
			technicianId: '1',
			date: new Date(2025, 3, 2), // 2 de abril de 2025
			startTime: '13:00',
			endTime: '15:00',
			reason: 'Reunião interna',
		},
		{
			id: '2',
			technicianId: '2',
			date: new Date(2025, 3, 3), // 3 de abril de 2025
			startTime: '10:00',
			endTime: '12:00',
			reason: 'Treinamento',
		},
	]);
	const [appointments] = useState<Appointment[]>(sampleAppointments);
	// Adicionar o estado leaveRequests após o estado appointments
	const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
		{
			id: '1',
			technicianId: '1',
			startDate: new Date(2025, 3, 15), // 15 de abril de 2025
			endDate: new Date(2025, 3, 25), // 25 de abril de 2025
			reason: 'Férias anuais',
			type: 'vacation',
		},
	]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isFullDayDialogOpen, setIsFullDayDialogOpen] = useState(false);
	// Adicionar o estado isLeaveDialogOpen após o estado isFullDayDialogOpen
	const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
	const [newUnavailability, setNewUnavailability] = useState<
		Partial<Unavailability>
	>({
		technicianId: '1',
		startTime: '10:00',
		endTime: '11:00',
	});
	const [fullDayReason, setFullDayReason] = useState<string>('');
	// Adicionar o estado newLeaveRequest após o estado fullDayReason
	const [newLeaveRequest, setNewLeaveRequest] = useState<Partial<LeaveRequest>>(
		{
			technicianId: '1',
			type: 'vacation',
		},
	);

	// Filtra indisponibilidades pelo técnico e data selecionados
	const filteredUnavailabilities = unavailabilities.filter(
		(unavailability) =>
			unavailability.technicianId === selectedTechnician &&
			selectedDate &&
			isSameDay(unavailability.date, selectedDate),
	);

	// Filtra agendamentos pelo técnico e data selecionados
	const filteredAppointments = appointments.filter(
		(appointment) =>
			appointment.technicianId === selectedTechnician &&
			selectedDate &&
			isSameDay(appointment.date, selectedDate),
	);

	// Verifica se um horário está marcado como indisponível
	const isTimeSlotUnavailable = (time: string) => {
		if (!selectedDate) return false;

		return filteredUnavailabilities.some(
			(unavailability) =>
				time >= unavailability.startTime && time < unavailability.endTime,
		);
	};

	// Verifica se um horário tem agendamento
	const getAppointmentAtTime = (time: string) => {
		if (!selectedDate) return null;

		return filteredAppointments.find(
			(appointment) =>
				time >= appointment.startTime && time < appointment.endTime,
		);
	};

	// Verifica se o dia inteiro está indisponível
	const isFullDayUnavailable = () => {
		if (!selectedDate) return false;

		// Verificar se há uma indisponibilidade marcada como dia inteiro
		const hasFullDayUnavailability = filteredUnavailabilities.some(
			(unavailability) => unavailability.isFullDay,
		);

		if (hasFullDayUnavailability) return true;

		// Verificar se todos os horários estão indisponíveis
		return timeSlots.every((time) => isTimeSlotUnavailable(time));
	};

	// Verifica se há agendamentos no dia
	const hasAppointmentsOnDay = () => {
		return filteredAppointments.length > 0;
	};

	// Adicionar a função isDateInLeaveRequest após a função hasAppointmentsOnDay
	// Verifica se uma data está dentro de um período de férias/licença
	const isDateInLeaveRequest = (date: Date | undefined) => {
		if (!date) return false;

		return leaveRequests.some(
			(leave) =>
				leave.technicianId === selectedTechnician &&
				date >= leave.startDate &&
				date <= leave.endDate,
		);
	};

	// Adicionar a função getActiveLeaveRequest após a função isDateInLeaveRequest
	// Obtém o período de férias/licença ativo para a data selecionada
	const getActiveLeaveRequest = (date: Date | undefined) => {
		if (!date) return null;

		return leaveRequests.find(
			(leave) =>
				leave.technicianId === selectedTechnician &&
				date >= leave.startDate &&
				date <= leave.endDate,
		);
	};

	// Manipula a criação de uma nova indisponibilidade
	const handleCreateUnavailability = () => {
		if (
			!selectedDate ||
			!newUnavailability.startTime ||
			!newUnavailability.endTime
		) {
			toast.error('Erro ao marcar indisponibilidade', {
				description: 'Preencha os horários de início e término.',
			});
			return;
		}

		// Verificar se o horário de início é anterior ao horário de término
		if (newUnavailability.startTime >= newUnavailability.endTime) {
			toast.error('Erro de horário', {
				description:
					'O horário de início deve ser anterior ao horário de término.',
			});
			return;
		}

		const unavailability: Unavailability = {
			id: Date.now().toString(),
			technicianId: selectedTechnician,
			date: selectedDate,
			startTime: newUnavailability.startTime,
			endTime: newUnavailability.endTime,
			reason: newUnavailability.reason,
		};

		setUnavailabilities([...unavailabilities, unavailability]);
		setIsDialogOpen(false);
		setNewUnavailability({
			technicianId: selectedTechnician,
			startTime: '10:00',
			endTime: '11:00',
		});

		toast.success('Indisponibilidade registrada', {
			description: `Você estará indisponível em ${format(
				selectedDate,
				'dd/MM/yyyy',
			)} das ${newUnavailability.startTime} às ${newUnavailability.endTime}.`,
		});
	};

	// Manipula a criação de indisponibilidade para o dia inteiro
	const handleCreateFullDayUnavailability = () => {
		if (!selectedDate) {
			toast.error('Erro ao marcar indisponibilidade', {
				description: 'Selecione uma data.',
			});
			return;
		}

		// Verificar se há agendamentos no dia
		if (hasAppointmentsOnDay()) {
			toast.error('Conflito de horário', {
				description:
					'Você já possui agendamentos neste dia. Remova os agendamentos antes de indisponibilizar o dia inteiro.',
			});
			return;
		}

		// Remover indisponibilidades existentes para este dia
		const updatedUnavailabilities = unavailabilities.filter(
			(unavailability) =>
				!(
					unavailability.technicianId === selectedTechnician &&
					isSameDay(unavailability.date, selectedDate)
				),
		);

		// Criar uma nova indisponibilidade para o dia inteiro
		const fullDayUnavailability: Unavailability = {
			id: Date.now().toString(),
			technicianId: selectedTechnician,
			date: selectedDate,
			startTime: '10:00',
			endTime: '17:00',
			reason: fullDayReason,
			isFullDay: true,
		};

		setUnavailabilities([...updatedUnavailabilities, fullDayUnavailability]);
		setIsFullDayDialogOpen(false);
		setFullDayReason('');

		toast.success('Dia inteiro indisponível', {
			description: `Você estará indisponível durante todo o dia ${format(
				selectedDate,
				'dd/MM/yyyy',
			)}.`,
		});
	};

	// Adicionar a função handleCreateLeaveRequest após a função handleCreateFullDayUnavailability
	// Manipula a criação de um novo período de férias/licença
	const handleCreateLeaveRequest = () => {
		if (
			!newLeaveRequest.startDate ||
			!newLeaveRequest.endDate ||
			!newLeaveRequest.reason ||
			!newLeaveRequest.type
		) {
			toast.error('Erro ao registrar período', {
				description: 'Preencha todos os campos obrigatórios.',
			});
			return;
		}

		// Verificar se a data de início é anterior à data de término
		if (newLeaveRequest.startDate > newLeaveRequest.endDate) {
			toast.error('Erro de datas', {
				description: 'A data de início deve ser anterior à data de término.',
			});
			return;
		}

		const leaveRequest: LeaveRequest = {
			id: Date.now().toString(),
			technicianId: selectedTechnician,
			startDate: newLeaveRequest.startDate,
			endDate: newLeaveRequest.endDate,
			reason: newLeaveRequest.reason || '',
			type: newLeaveRequest.type || 'vacation',
		};

		setLeaveRequests([...leaveRequests, leaveRequest]);
		setIsLeaveDialogOpen(false);
		setNewLeaveRequest({
			technicianId: selectedTechnician,
			type: 'vacation',
		});

		toast.success('Período registrado com sucesso', {
			description: `Você estará indisponível de ${format(
				newLeaveRequest.startDate,
				'dd/MM/yyyy',
			)} a ${format(newLeaveRequest.endDate, 'dd/MM/yyyy')}.`,
		});
	};

	// Remove uma indisponibilidade
	const handleRemoveUnavailability = (id: string) => {
		setUnavailabilities(unavailabilities.filter((item) => item.id !== id));
		toast.success('Indisponibilidade removida', {
			description: 'O período de indisponibilidade foi removido com sucesso.',
		});
	};

	// Adicionar a função handleRemoveLeaveRequest após a função handleRemoveUnavailability
	// Remove um período de férias/licença
	const handleRemoveLeaveRequest = (id: string) => {
		setLeaveRequests(leaveRequests.filter((item) => item.id !== id));
		toast.success('Período removido', {
			description: 'O período de férias/licença foi removido com sucesso.',
		});
	};

	// Abre o diálogo para criar uma nova indisponibilidade
	const openNewUnavailabilityDialog = (time?: string) => {
		// Se um horário foi selecionado, use-o como horário de início
		const startTime = time || '10:00';

		setNewUnavailability({
			technicianId: selectedTechnician,
			startTime: startTime,
			endTime: getNextTimeSlot(startTime),
		});

		setIsDialogOpen(true);
	};

	// Abre o diálogo para indisponibilizar o dia inteiro
	const openFullDayUnavailabilityDialog = () => {
		if (hasAppointmentsOnDay()) {
			toast.error('Não é possível indisponibilizar o dia inteiro', {
				description:
					'Você já possui agendamentos neste dia. Remova os agendamentos antes de indisponibilizar o dia inteiro.',
			});
			return;
		}

		setIsFullDayDialogOpen(true);
	};

	// Adicionar a função openLeaveRequestDialog após a função openFullDayUnavailabilityDialog
	// Abre o diálogo para registrar um novo período de férias/licença
	const openLeaveRequestDialog = () => {
		// Inicializar com a data atual e uma semana depois
		const today = new Date();
		const nextWeek = new Date();
		nextWeek.setDate(today.getDate() + 7);

		setNewLeaveRequest({
			technicianId: selectedTechnician,
			startDate: today,
			endDate: nextWeek,
			type: 'vacation',
		});

		setIsLeaveDialogOpen(true);
	};

	// Obtém o próximo horário na lista de horários
	const getNextTimeSlot = (time: string) => {
		const index = timeSlots.indexOf(time);
		if (index >= 0 && index < timeSlots.length - 1) {
			return timeSlots[index + 1];
		}
		return '11:00'; // Fallback para o próximo horário após 10:00
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6'>
			<div className='space-y-6'>
				<CalendarComponent
					mode='single'
					selected={selectedDate}
					onSelect={setSelectedDate}
					className='border rounded-md w-full'
					locale={ptBR}
					disabled={(date) => {
						// Desabilitar finais de semana
						const day = date.getDay();
						return day === 0 || day === 6;
					}}
				/>

				<div className='grid grid-cols-1 gap-2'>
					<Button
						onClick={() => openNewUnavailabilityDialog()}
						className='w-full'>
						Informar Período Indisponível
					</Button>

					<Button
						onClick={openFullDayUnavailabilityDialog}
						variant='outline'
						className='w-full'
						disabled={isFullDayUnavailable()}>
						Indisponibilizar Dia Inteiro
					</Button>

					<Button
						onClick={openLeaveRequestDialog}
						variant='secondary'
						className='w-full'>
						Registrar Férias/Licença
					</Button>
				</div>
			</div>
			<div className='border rounded-md p-4'>
				<Tabs defaultValue='availability'>
					<TabsList className='mb-4 w-full  justify-between'>
						<TabsTrigger
							className='w-full'
							value='availability'>
							Disponibilidade
						</TabsTrigger>
						<TabsTrigger
							className='w-full'
							value='appointments'>
							Meus Agendamentos
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value='availability'
						className='space-y-4'>
						<div>
							<h2 className='text-xl font-semibold'>
								{selectedDate
									? format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })
									: 'Selecione uma data'}
							</h2>
							<p className='text-sm text-muted-foreground mt-1'>
								Clique em um horário para informar sua indisponibilidade
							</p>
						</div>
						{isFullDayUnavailable() && (
							<div className='bg-destructive/10 border border-destructive/20 rounded-md p-3 flex items-center gap-2'>
								<AlertCircle className='h-5 w-5 text-destructive' />
								<div>
									<p className='font-medium'>Dia inteiro indisponível</p>
									{filteredUnavailabilities.find((u) => u.isFullDay)
										?.reason && (
										<p className='text-sm text-muted-foreground'>
											{
												filteredUnavailabilities.find((u) => u.isFullDay)
													?.reason
											}
										</p>
									)}
								</div>
							</div>
						)}

						{isDateInLeaveRequest(selectedDate) && (
							<div className='bg-blue-500/10 border border-blue-500/20 rounded-md p-3 flex items-center gap-2'>
								<Users className='h-5 w-5 text-blue-500' />
								<div>
									<p className='font-medium'>Período de férias/licença</p>
									{getActiveLeaveRequest(selectedDate)?.reason && (
										<p className='text-sm text-muted-foreground'>
											{getActiveLeaveRequest(selectedDate)?.reason}
										</p>
									)}
								</div>
							</div>
						)}
						<div className='grid gap-2'>
							{timeSlots.map((time) => {
								const isUnavailable = isTimeSlotUnavailable(time);
								const appointment = getAppointmentAtTime(time);
								const unavailability = filteredUnavailabilities.find(
									(u) => u.startTime <= time && u.endTime > time,
								);

								return (
									<div
										key={time}
										className={`p-3 rounded-md flex items-center ${
											appointment
												? 'bg-primary/10 border border-primary/20'
												: isUnavailable
												? 'bg-destructive/10 border border-destructive/20'
												: 'bg-muted hover:bg-muted/80 cursor-pointer'
										}`}
										onClick={() => {
											// Só permitir clicar se não houver agendamento neste horário
											if (!appointment && !isFullDayUnavailable()) {
												openNewUnavailabilityDialog(time);
											}
										}}>
										<div className='w-16 font-medium'>{time}</div>
										<div className='ml-2 flex-1'>
											{appointment ? (
												<div>
													<span className='font-medium'>Agendado</span>
													{appointment.startTime === time && (
														<div className='text-sm text-muted-foreground mt-1'>
															{appointment.institution} -{' '}
															{appointment.projectName}
														</div>
													)}
												</div>
											) : isUnavailable ? (
												<div>
													<span className='font-medium'>Indisponível</span>
													{unavailability &&
														unavailability.startTime === time &&
														unavailability.reason && (
															<div className='text-sm text-muted-foreground mt-1'>
																{unavailability.reason}
															</div>
														)}
												</div>
											) : (
												<span className='text-sm'>Disponível</span>
											)}
										</div>
									</div>
								);
							})}
						</div>
						<div className='mt-8'>
							<h3 className='text-lg font-medium mb-4'>
								Períodos de Indisponibilidade
							</h3>

							{filteredUnavailabilities.length === 0 ? (
								<p className='text-muted-foreground'>
									Nenhuma indisponibilidade registrada para esta data.
								</p>
							) : (
								<div className='space-y-3'>
									{filteredUnavailabilities.map((unavailability) => (
										<div
											key={unavailability.id}
											className='flex items-center justify-between border rounded-md p-3'>
											<div>
												<div className='font-medium'>
													{unavailability.isFullDay
														? 'Dia inteiro'
														: `${unavailability.startTime} - ${unavailability.endTime}`}
												</div>
												{unavailability.reason && (
													<div className='text-sm text-muted-foreground'>
														{unavailability.reason}
													</div>
												)}
											</div>
											<Button
												variant='ghost'
												size='icon'
												onClick={() =>
													handleRemoveUnavailability(unavailability.id)
												}>
												<X className='h-4 w-4' />
												<span className='sr-only'>Remover</span>
											</Button>
										</div>
									))}
								</div>
							)}
						</div>

						<div className='mt-8'>
							<h3 className='text-lg font-medium mb-4'>
								Períodos de Férias e Licenças
							</h3>

							{leaveRequests.filter(
								(leave) => leave.technicianId === selectedTechnician,
							).length === 0 ? (
								<p className='text-muted-foreground'>
									Nenhum período de férias ou licença registrado.
								</p>
							) : (
								<div className='space-y-3'>
									{leaveRequests
										.filter(
											(leave) => leave.technicianId === selectedTechnician,
										)
										.map((leave) => (
											<div
												key={leave.id}
												className='flex items-center justify-between border rounded-md p-3'>
												<div>
													<div className='font-medium'>
														{format(leave.startDate, 'dd/MM/yyyy')} a{' '}
														{format(leave.endDate, 'dd/MM/yyyy')}
													</div>
													<div className='text-sm text-muted-foreground mt-1'>
														<span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mr-2'>
															{leave.type === 'vacation'
																? 'Férias'
																: leave.type === 'medical'
																? 'Licença Médica'
																: 'Outro'}
														</span>
														{leave.reason}
													</div>
												</div>
												<Button
													variant='ghost'
													size='icon'
													onClick={() => handleRemoveLeaveRequest(leave.id)}>
													<X className='h-4 w-4' />
													<span className='sr-only'>Remover</span>
												</Button>
											</div>
										))}
								</div>
							)}
						</div>
					</TabsContent>

					<TabsContent value='appointments'>
						<div className='space-y-4'>
							<h2 className='text-xl font-semibold'>Meus Agendamentos</h2>

							{filteredAppointments.length === 0 ? (
								<p className='text-muted-foreground'>
									Nenhum agendamento para esta data.
								</p>
							) : (
								<div className='grid gap-4'>
									{filteredAppointments.map((appointment) => (
										<div
											key={appointment.id}
											className='border rounded-md p-4 space-y-2'>
											<div className='flex justify-between'>
												<h3 className='font-medium'>
													{appointment.institution}
												</h3>
												<div className='flex items-center text-sm text-muted-foreground'>
													<Clock className='h-4 w-4 mr-1' />
													{appointment.startTime} - {appointment.endTime}
												</div>
											</div>
											<div className='text-sm'>
												<p>
													<strong>Projeto:</strong> {appointment.projectName}
												</p>
												{appointment.notes && (
													<p>
														<strong>Observações:</strong> {appointment.notes}
													</p>
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
			{/* Diálogo para período específico */}
			<Dialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>Marcar Indisponibilidade</DialogTitle>
						<DialogDescription className='text-balance'>
							Informe os períodos em que você não estará disponível para
							agendamentos.
						</DialogDescription>
					</DialogHeader>

					<div className='grid gap-4 py-4'>
						<div className='space-y-2'>
							<Label htmlFor='unavailability-date'>Data</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className='w-full justify-start text-left font-normal'
										id='unavailability-date'>
										<Calendar className='mr-2 h-4 w-4' />
										{selectedDate
											? format(selectedDate, 'dd/MM/yyyy')
											: 'Selecione uma data'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<CalendarComponent
										mode='single'
										selected={selectedDate}
										onSelect={setSelectedDate}
										initialFocus
										locale={ptBR}
										disabled={(date) => {
											const day = date.getDay();
											return day === 0 || day === 6;
										}}
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='start-time'>Horário de Início</Label>
								<Select
									value={newUnavailability.startTime}
									onValueChange={(value) =>
										setNewUnavailability({
											...newUnavailability,
											startTime: value,
											// Ajustar o horário de término automaticamente se necessário
											endTime:
												value >= (newUnavailability.endTime || '')
													? getNextTimeSlot(value)
													: newUnavailability.endTime,
										})
									}>
									<SelectTrigger id='start-time'>
										<SelectValue placeholder='Selecione um horário' />
									</SelectTrigger>
									<SelectContent>
										{timeSlots.map((time) => {
											const appointment = getAppointmentAtTime(time);
											return (
												<SelectItem
													key={time}
													value={time}
													disabled={!!appointment}>
													{time} {appointment ? '(Agendado)' : ''}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='end-time'>Horário de Término</Label>
								<Select
									value={newUnavailability.endTime}
									onValueChange={(value) =>
										setNewUnavailability({
											...newUnavailability,
											endTime: value,
										})
									}>
									<SelectTrigger id='end-time'>
										<SelectValue placeholder='Selecione um horário' />
									</SelectTrigger>
									<SelectContent>
										{timeSlots.map((time) => {
											// Verificar se há agendamentos entre o horário de início e este horário
											const hasAppointmentBefore = appointments.some(
												(appointment) =>
													appointment.technicianId === selectedTechnician &&
													isSameDay(appointment.date, selectedDate!) &&
													appointment.startTime >=
														(newUnavailability.startTime || '') &&
													appointment.startTime < time,
											);

											return (
												<SelectItem
													key={time}
													value={time}
													disabled={
														time <= (newUnavailability.startTime || '') ||
														hasAppointmentBefore
													}>
													{time}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='reason'>
								Motivo{' '}
								<span className='text-muted-foreground text-xs'>
									(opcional)
								</span>
							</Label>
							<Textarea
								id='reason'
								value={newUnavailability.reason || ''}
								onChange={(e) =>
									setNewUnavailability({
										...newUnavailability,
										reason: e.target.value,
									})
								}
								placeholder='Informe o motivo da indisponibilidade (opcional)'
								rows={3}
							/>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => setIsDialogOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={handleCreateUnavailability}>Confirmar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{/* Diálogo para dia inteiro */}
			<Dialog
				open={isFullDayDialogOpen}
				onOpenChange={setIsFullDayDialogOpen}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>Indisponibilizar Dia Inteiro</DialogTitle>
						<DialogDescription className='text-balance'>
							Você estará indisponível durante todo o dia{' '}
							{selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}.
						</DialogDescription>
					</DialogHeader>

					<div className='grid gap-4 py-4'>
						<div className='space-y-2'>
							<Label htmlFor='full-day-reason'>
								Motivo{' '}
								<span className='text-muted-foreground text-xs'>
									(opcional)
								</span>
							</Label>
							<Textarea
								id='full-day-reason'
								value={fullDayReason}
								onChange={(e) => setFullDayReason(e.target.value)}
								placeholder='Informe o motivo da indisponibilidade (opcional)'
								rows={3}
							/>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => setIsFullDayDialogOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={handleCreateFullDayUnavailability}>
							Confirmar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Diálogo para férias/licença */}
			<Dialog
				open={isLeaveDialogOpen}
				onOpenChange={setIsLeaveDialogOpen}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>Registrar Férias ou Licença</DialogTitle>
						<DialogDescription className='text-balance'>
							Informe o período em que você estará de férias ou licença.
						</DialogDescription>
					</DialogHeader>

					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='leave-start-date'>Data de Início</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant='outline'
											className='w-full justify-start text-left font-normal'
											id='leave-start-date'>
											<Calendar className='mr-2 h-4 w-4' />
											{newLeaveRequest.startDate
												? format(newLeaveRequest.startDate, 'dd/MM/yyyy')
												: 'Selecione uma data'}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0'>
										<CalendarComponent
											mode='single'
											selected={newLeaveRequest.startDate}
											onSelect={(date) =>
												setNewLeaveRequest({
													...newLeaveRequest,
													startDate: date,
													// Se a data de fim for anterior à data de início, ajustar
													endDate:
														newLeaveRequest.endDate &&
														date! > newLeaveRequest.endDate
															? date
															: newLeaveRequest.endDate,
												})
											}
											initialFocus
											locale={ptBR}
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='leave-end-date'>Data de Término</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant='outline'
											className='w-full justify-start text-left font-normal'
											id='leave-end-date'>
											<Calendar className='mr-2 h-4 w-4' />
											{newLeaveRequest.endDate
												? format(newLeaveRequest.endDate, 'dd/MM/yyyy')
												: 'Selecione uma data'}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0'>
										<CalendarComponent
											mode='single'
											selected={newLeaveRequest.endDate}
											onSelect={(date) =>
												setNewLeaveRequest({
													...newLeaveRequest,
													endDate: date,
												})
											}
											initialFocus
											locale={ptBR}
											disabled={(date) =>
												newLeaveRequest.startDate
													? date < newLeaveRequest.startDate
													: false
											}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='leave-type'>Tipo</Label>
							<Select
								value={newLeaveRequest.type}
								onValueChange={(value: 'vacation' | 'medical' | 'other') =>
									setNewLeaveRequest({ ...newLeaveRequest, type: value })
								}>
								<SelectTrigger id='leave-type'>
									<SelectValue placeholder='Selecione o tipo' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='vacation'>Férias</SelectItem>
									<SelectItem value='medical'>Licença Médica</SelectItem>
									<SelectItem value='other'>Outro</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='leave-reason'>Motivo</Label>
							<Textarea
								id='leave-reason'
								value={newLeaveRequest.reason || ''}
								onChange={(e) =>
									setNewLeaveRequest({
										...newLeaveRequest,
										reason: e.target.value,
									})
								}
								placeholder='Informe o motivo das férias ou licença'
								rows={3}
							/>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => setIsLeaveDialogOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={handleCreateLeaveRequest}>Confirmar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
