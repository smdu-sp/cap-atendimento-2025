/** @format */

'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useTransition } from 'react';

export default function StatusFilter() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const param = useSearchParams();
	const initial = param.get('status') || '';
	const [status, setStatus] = useState(initial);

	function handleChange(e: string) {
		startTransition(() => {
			setStatus(e);
			router.push(`?status=${e}`);
		});
	}
	return (
		<div className='my-5 max-w-xs flex items-center gap-3'>
			<Select
				onValueChange={(e) => handleChange(e)}
				defaultValue={status}>
				<SelectTrigger className='w-[220px]'>
					<SelectValue placeholder='Selecione um status' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Status</SelectLabel>
						<Separator />
						<SelectItem value='all'>Todos</SelectItem>
						<SelectItem value='ATIVO'>Ativo</SelectItem>
						<SelectItem value='INATIVO'>Inativo</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			{isPending && (
				<Loader2 className='animate-spin text-muted-foreground opacity-50' />
			)}
		</div>
	);
}
