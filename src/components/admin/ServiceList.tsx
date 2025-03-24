'use client';

import { useState } from 'react';
import { Service } from '@/lib/admin-service';
import ServiceForm from './forms/ServiceForm';

interface ServiceListProps {
  services: Service[];
  onUpdateAction: (id: string, service: Service) => Promise<{ success: boolean; error?: string }>;
  onDeleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
  onAddAction: (service: Service) => Promise<{ success: boolean; error?: string }>;
}

export default function ServiceList(props: ServiceListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { services, onUpdateAction, onDeleteAction, onAddAction } = props;

  // Convert Set to Array for categories
  const categoriesSet = new Set(services.map(service => service.category));
  const categories = Array.from(categoriesSet);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (service.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = async (service: Service) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await onAddAction(service);
      
      if (result.success) {
        setIsAddModalOpen(false);
      } else {
        setError(result.error || 'Nastala chyba pri pridávaní služby.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (service: Service) => {
    if (!currentService?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onUpdateAction(currentService.id, service);
      
      if (result.success) {
        setIsEditModalOpen(false);
        setCurrentService(null);
      } else {
        setError(result.error || 'Nastala chyba pri aktualizácii služby.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentService?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onDeleteAction(currentService.id);
      
      if (result.success) {
        setIsDeleteModalOpen(false);
        setCurrentService(null);
      } else {
        setError(result.error || 'Nastala chyba pri mazaní služby.');
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
          <h1 className="text-2xl font-bold tracking-tight">Správa služieb</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Pridať službu
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategória</label>
              <select 
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Všetky kategórie</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vyhľadávanie</label>
              <input
                type="text"
                placeholder="Hľadať službu..."
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
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Názov
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategória
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trvanie
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cena
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularita
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcie
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Nenašli sa žiadne služby
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.duration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.price} €
                        {service.discounted_price && (
                          <span className="ml-2 line-through text-gray-400">
                            {service.discounted_price} €
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${service.popularity || 0}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => {
                            setCurrentService(service);
                            setIsEditModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Upraviť
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentService(service);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Zmazať
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Pridať novú službu</h2>
              <ServiceForm 
                onSubmit={handleAdd} 
                onCancel={() => setIsAddModalOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentService && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Upraviť službu</h2>
              <ServiceForm 
                service={currentService} 
                onSubmit={handleUpdate} 
                onCancel={() => {
                  setIsEditModalOpen(false);
                  setCurrentService(null);
                }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentService && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Potvrdiť zmazanie</h2>
              <p className="mb-4">
                Naozaj chcete zmazať službu <strong>{currentService.name}</strong>? Táto akcia je nenávratná.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setCurrentService(null);
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
