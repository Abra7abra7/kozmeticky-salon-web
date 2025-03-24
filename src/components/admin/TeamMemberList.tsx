'use client';

import { useState } from 'react';
import { TeamMember } from '@/lib/admin-service';
import TeamMemberForm from './forms/TeamMemberForm';
import Image from 'next/image';

interface TeamMemberListProps {
  teamMembers: TeamMember[];
  onUpdateAction: (id: string, teamMember: TeamMember) => Promise<{ success: boolean; error?: string }>;
  onDeleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
  onAddAction: (teamMember: TeamMember) => Promise<{ success: boolean; error?: string }>;
}

export default function TeamMemberList(props: TeamMemberListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  const { teamMembers, onUpdateAction, onDeleteAction, onAddAction } = props;

  // Get unique positions
  const positionsSet = new Set(teamMembers.map(member => member.position));
  const positions = Array.from(positionsSet);

  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (member.bio || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === '' || member.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const handleAdd = async (teamMember: TeamMember) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await onAddAction(teamMember);
      
      if (result.success) {
        setIsAddModalOpen(false);
      } else {
        setError(result.error || 'Nastala chyba pri pridávaní člena tímu.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (teamMember: TeamMember) => {
    if (!currentTeamMember?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onUpdateAction(currentTeamMember.id, teamMember);
      
      if (result.success) {
        setIsEditModalOpen(false);
        setCurrentTeamMember(null);
      } else {
        setError(result.error || 'Nastala chyba pri aktualizácii člena tímu.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentTeamMember?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onDeleteAction(currentTeamMember.id);
      
      if (result.success) {
        setIsDeleteModalOpen(false);
        setCurrentTeamMember(null);
      } else {
        setError(result.error || 'Nastala chyba pri mazaní člena tímu.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Správa členov tímu</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Pridať člena tímu
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pozícia</label>
              <select 
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
              >
                <option value="">Všetky pozície</option>
                {positions.map((position) => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vyhľadávanie</label>
              <input
                type="text"
                placeholder="Hľadať člena tímu..."
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">
                Nenašli sa žiadni členovia tímu
              </div>
            ) : (
              filteredTeamMembers.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                      {member.image_url ? (
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-profile.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-4xl">?</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-600 mb-2">{member.position}</p>
                    
                    {member.specializations && member.specializations.length > 0 && (
                      <div className="mt-2 w-full">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Špecializácie:</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.specializations.map((spec, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex space-x-2">
                      <button 
                        onClick={() => {
                          setCurrentTeamMember(member);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200"
                      >
                        Upraviť
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentTeamMember(member);
                          setIsDeleteModalOpen(true);
                        }}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                      >
                        Zmazať
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Pridať nového člena tímu</h2>
              <TeamMemberForm 
                onSubmit={handleAdd} 
                onCancel={() => setIsAddModalOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentTeamMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Upraviť člena tímu</h2>
              <TeamMemberForm 
                teamMember={currentTeamMember} 
                onSubmit={handleUpdate} 
                onCancel={() => {
                  setIsEditModalOpen(false);
                  setCurrentTeamMember(null);
                }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentTeamMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Potvrdiť zmazanie</h2>
              <p className="mb-4">
                Naozaj chcete zmazať člena tímu <strong>{currentTeamMember.name}</strong>? Táto akcia je nenávratná.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setCurrentTeamMember(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Zrušiť
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Mazanie...' : 'Zmazať'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
