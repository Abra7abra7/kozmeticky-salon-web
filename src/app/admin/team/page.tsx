import { Metadata } from 'next';
import { getTeamMembers } from '@/lib/admin-service';
import TeamMemberList from '@/components/admin/TeamMemberList';
import { handleCreateTeamMember, handleUpdateTeamMember, handleDeleteTeamMember } from './actions';

export const metadata: Metadata = {
  title: 'Správa tímu | Admin Panel',
  description: 'Správa členov tímu kozmetického salónu',
};

export default async function TeamPage() {
  const { data: teamMembers, error } = await getTeamMembers();
  
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">Chyba pri načítaní členov tímu: {error.message}</p>
        </div>
      )}
      
      <TeamMemberList 
        teamMembers={teamMembers || []} 
        onUpdateAction={handleUpdateTeamMember} 
        onDeleteAction={handleDeleteTeamMember}
        onAddAction={handleCreateTeamMember}
      />
    </div>
  );
}
