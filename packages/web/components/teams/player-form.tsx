'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { playerCreateSchema, type PlayerCreateInput } from '@/lib/validation/player-schemas'

interface PlayerFormProps {
  teamId: string
  onSuccess: (player: any) => void
  onCancel?: () => void
  initialData?: Partial<{
    id: string
    jersey_number: number
    first_name: string
    last_name: string
    position: 'forward' | 'defense' | 'goalie'
    birthdate: string
  }>
}

export function PlayerForm({ teamId, onSuccess, onCancel, initialData }: PlayerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PlayerCreateInput>({
    resolver: zodResolver(playerCreateSchema),
    defaultValues: {
      team_id: teamId,
      jersey_number: initialData?.jersey_number,
      first_name: initialData?.first_name || '',
      last_name: initialData?.last_name || '',
      position: initialData?.position,
      birthdate: initialData?.birthdate,
    },
  })

  const selectedPosition = watch('position')

  const onSubmit = async (data: PlayerCreateInput) => {
    setIsSubmitting(true)
    try {
      await onSuccess(data)
    } catch (error) {
      console.error('Error submitting player form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditMode = !!initialData?.id

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 pb-8">
      {/* Hidden team_id */}
      <input type="hidden" {...register('team_id')} />
      <input type="hidden" {...register('position')} />

      {/* Jersey Number */}
      <div>
        <label htmlFor="jersey_number" className="block text-sm font-medium text-gray-700 mb-2">
          Jersey Number
        </label>
        <input
          id="jersey_number"
          type="number"
          {...register('jersey_number', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1-99"
          min={1}
          max={99}
        />
        {errors.jersey_number && (
          <p className="mt-1 text-sm text-red-600">{errors.jersey_number.message}</p>
        )}
      </div>

      {/* First Name */}
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input
          id="first_name"
          type="text"
          {...register('first_name')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John"
        />
        {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
          Last Name
        </label>
        <input
          id="last_name"
          type="text"
          {...register('last_name')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Doe"
        />
        {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>}
      </div>

      {/* Position Selection */}
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <div id="position" role="group" aria-label="Position" className="grid grid-cols-3 gap-2">
          {[
            { value: 'forward', label: 'Forward' },
            { value: 'defense', label: 'Defense' },
            { value: 'goalie', label: 'Goalie' },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('position', value as any, { shouldValidate: true })}
              className={`
                px-4 py-3 rounded-md font-medium text-sm transition-colors
                ${
                  selectedPosition === value
                    ? 'bg-blue-600 text-white selected'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
              tabIndex={0}
            >
              {label}
            </button>
          ))}
        </div>
        {errors.position && <p className="mt-1 text-sm text-red-600">Please select a position</p>}
      </div>

      {/* Birthdate (Optional) */}
      <div>
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">
          Birthdate <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <input
          id="birthdate"
          type="date"
          {...register('birthdate')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.birthdate && <p className="mt-1 text-sm text-red-600">{errors.birthdate.message}</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : isEditMode ? 'Update Player' : 'Add Player'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-md font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
