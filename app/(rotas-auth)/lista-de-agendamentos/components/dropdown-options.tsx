/** @format */

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus } from 'lucide-react';
import ModalFormAgendamento from './modal-form-agendamento';
import ModalImportAgendamento from './modal-import';

export default function DropdownImportacao() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					<Plus />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start'>
				<DropdownMenuLabel className='font-semibold'>Opções</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<ModalImportAgendamento />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<ModalFormAgendamento />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
