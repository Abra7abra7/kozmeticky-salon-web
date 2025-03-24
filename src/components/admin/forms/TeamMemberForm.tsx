'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TeamMember } from '@/lib/admin-service';

interface TeamMemberFormProps {
  teamMember?: TeamMember;
  onSubmit: (data: TeamMember) => void;
  onCancel: () => void;
}

export default function TeamMemberForm(props: TeamMemberFormProps) {
  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<TeamMember>({
    defaultValues: props.teamMember || {
      name: '',
      position: '',
      specializations: [],
      bio: '',
      image_url: '',
      certifications: []
    }
  });

  const { teamMember, onSubmit, onCancel } = props;

  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const positions = [
    'Kozmetička',
    'Manikérka',
    'Masérka',
    'Vizážistka',
    'Lash Expert',
    'Manažérka',
    'Recepčná',
    'Iné'
  ];

  const handleAddSpecialization = (e: React.FormEvent, setValue: any, currentValues: string[] = []) => {
    e.preventDefault();
    if (newSpecialization.trim()) {
      setValue('specializations', [...(currentValues || []), newSpecialization.trim()]);
      setNewSpecialization('');
    }
  };

  const handleRemoveSpecialization = (index: number, setValue: any, currentValues: string[] = []) => {
    setValue('specializations', currentValues.filter((_, i) => i !== index));
  };

  const handleAddCertification = (e: React.FormEvent, setValue: any, currentValues: string[] = []) => {
    e.preventDefault();
    if (newCertification.trim()) {
      setValue('certifications', [...(currentValues || []), newCertification.trim()]);
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (index: number, setValue: any, currentValues: string[] = []) => {
    setValue('certifications', currentValues.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Meno a priezvisko
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Meno je povinné' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Pozícia
        </label>
        <select
          id="position"
          {...register('position', { required: 'Pozícia je povinná' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Vyberte pozíciu</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        {errors.position && (
          <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Biografia
        </label>
        <textarea
          id="bio"
          rows={3}
          {...register('bio')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
          URL fotografie
        </label>
        <input
          id="image_url"
          type="text"
          {...register('image_url')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Špecializácie
        </label>
        <Controller
          name="specializations"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <div className="flex mt-1">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Pridať špecializáciu"
                />
                <button
                  type="button"
                  onClick={(e) => handleAddSpecialization(e, onChange, value)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Pridať
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {value?.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {spec}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialization(index, onChange, value)}
                      className="ml-1.5 inline-flex text-indigo-500 hover:text-indigo-700"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Certifikácie
        </label>
        <Controller
          name="certifications"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <div className="flex mt-1">
                <input
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Pridať certifikáciu"
                />
                <button
                  type="button"
                  onClick={(e) => handleAddCertification(e, onChange, value)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Pridať
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {value?.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index, onChange, value)}
                      className="ml-1.5 inline-flex text-green-500 hover:text-green-700"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Zrušiť
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Uložiť
        </button>
      </div>
    </form>
  );
}
