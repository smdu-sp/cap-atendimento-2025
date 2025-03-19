/** @format */

'use client';

import type React from 'react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ProfileFieldProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	editable: boolean;
	badge?: boolean;
}

export function ProfileField({
	icon,
	label,
	value,
	onChange,
	editable,
	badge = false,
}: ProfileFieldProps) {
	return (
		<div className='group'>
			<div className='flex items-center gap-3 mb-2'>
				{icon}
				<label className='font-medium text-sm'>{label}</label>
			</div>

			{badge ? (
				<div className='bg-background rounded-md p-3 border'>
					<Badge
						variant='secondary'
						className='text-sm'>
						{value}
					</Badge>
				</div>
			) : (
				<div className='relative'>
					<Input
						value={value}
						onChange={onChange}
						disabled={!editable}
						className={`
              ${editable ? 'bg-background' : 'bg-muted cursor-not-allowed'}
              transition-all duration-300
              ${editable ? 'group-hover:border-primary' : ''}
            `}
					/>

					{editable && (
						<div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity'>
							<span className='text-xs text-primary'>Editar</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
