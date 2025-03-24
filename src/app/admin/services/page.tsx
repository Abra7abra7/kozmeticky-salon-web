import { Metadata } from 'next';
import { getServices } from '@/lib/admin-service';
import ServiceList from '@/components/admin/ServiceList';
import { handleCreateService, handleUpdateService, handleDeleteService } from './actions';

export const metadata: Metadata = {
  title: 'Správa služieb | Admin Panel',
  description: 'Správa služieb kozmetického salónu',
};

export default async function ServicesPage() {
  const { data: services, error } = await getServices();
  
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">Chyba pri načítaní služieb: {error.message}</p>
        </div>
      )}
      
      <ServiceList 
        services={services || []} 
        onUpdateAction={handleUpdateService} 
        onDeleteAction={handleDeleteService}
        onAddAction={handleCreateService}
      />
    </div>
  );
}
