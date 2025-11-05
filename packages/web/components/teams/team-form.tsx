'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { teamCreateSchema, type TeamCreateInput, getCurrentSeason } from '@/lib/validation/team-schemas'
import { getAgeGroupOptions, formatAgeGroup } from '@/lib/utils/age-groups'

interface TeamFormProps {
  organizationId: string
  onSuccess: (team: any) => void
  onCancel?: () => void
  initialData?: Partial<TeamCreateInput>
}

export function TeamForm({ organizationId, onSuccess, onCancel, initialData }: TeamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TeamCreateInput>({
    resolver: zodResolver(teamCreateSchema),
    defaultValues: {
      organization_id: organizationId,
      region: initialData?.region || 'usa',
      season: initialData?.season || getCurrentSeason(),
      ...initialData,
    },
  })

  const region = watch('region')
  const selectedAgeYears = watch('age_years')
  const selectedLevel = watch('level')

  const ageGroupOptions = getAgeGroupOptions(region)

  const onSubmit = async (data: TeamCreateInput) => {
    setIsSubmitting(true)
    try {
      await onSuccess(data)
    } catch (error) {
      console.error('Error submitting team form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Hidden inputs for fields set via setValue */}
      <input type="hidden" {...register('organization_id')} />
      <input type="hidden" {...register('age_years', { valueAsNumber: true })} />
      <input type="hidden" {...register('level')} />

      {/* Team Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Team Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Thunder U10"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Region Selection */}
      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">Region</legend>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                {...register('region')}
                value="usa"
                className="mr-2"
              />
              <span>USA</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                {...register('region')}
                value="canada"
                className="mr-2"
              />
              <span>Canada</span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Age Group Selection */}
      <div>
        <label htmlFor="age-group" className="block text-sm font-medium text-gray-700 mb-2">
          Age Group
        </label>
        <div
          id="age-group"
          role="group"
          aria-label="Age Group"
          className="grid grid-cols-3 md:grid-cols-6 gap-2"
        >
          {ageGroupOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('age_years', value, { shouldValidate: true })}
              className={`
                px-4 py-3 rounded-md font-medium text-sm transition-colors
                ${
                  selectedAgeYears === value
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
        {errors.age_years && (
          <p className="mt-1 text-sm text-red-600">Please select an age group</p>
        )}
      </div>

      {/* Skill Level Selection */}
      <div>
        <label htmlFor="skill-level" className="block text-sm font-medium text-gray-700 mb-2">
          Skill Level
        </label>
        <div
          id="skill-level"
          role="group"
          aria-label="Skill Level"
          className="grid grid-cols-2 md:grid-cols-5 gap-2"
        >
          {[
            { value: 'house', label: 'House' },
            { value: 'travel', label: 'Travel' },
            { value: 'a', label: 'A' },
            { value: 'aa', label: 'AA' },
            { value: 'aaa', label: 'AAA' },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('level', value as any, { shouldValidate: true })}
              className={`
                px-4 py-3 rounded-md font-medium text-sm transition-colors
                ${
                  selectedLevel === value
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
        {errors.level && (
          <p className="mt-1 text-sm text-red-600">Please select a skill level</p>
        )}
      </div>

      {/* Season */}
      <div>
        <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
          Season
        </label>
        <input
          id="season"
          type="text"
          {...register('season')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="2024-25"
        />
        {errors.season && (
          <p className="mt-1 text-sm text-red-600">{errors.season.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">Format: YYYY-YY (e.g., 2024-25)</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating...' : 'Create Team'}
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
