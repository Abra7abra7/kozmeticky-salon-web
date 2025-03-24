'use client';

import { useState } from 'react';
import { Product } from '@/lib/admin-service';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import ProductForm from './forms/ProductForm';
import Image from 'next/image';

interface ProductListProps {
  products: Product[];
  onCreateAction: (product: Product) => Promise<{ success: boolean; error?: string }>;
  onUpdateAction: (id: string, product: Product) => Promise<{ success: boolean; error?: string }>;
  onDeleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export default function ProductList({
  products,
  onCreateAction,
  onUpdateAction,
  onDeleteAction
}: ProductListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  // Get unique categories from products
  const allCategories = Array.from(
    new Set(products.map(product => product.category).filter(Boolean))
  );

  // Handle create product
  const handleCreateProduct = async (product: Product) => {
    try {
      const result = await onCreateAction(product);
      if (result.success) {
        setIsAddModalOpen(false);
      } else {
        alert(`Chyba pri vytváraní produktu: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Nastala neočakávaná chyba pri vytváraní produktu.');
    }
  };

  // Handle update product
  const handleUpdateProduct = async (product: Product) => {
    if (!currentProduct?.id) return;
    
    try {
      const result = await onUpdateAction(currentProduct.id, product);
      if (result.success) {
        setIsEditModalOpen(false);
        setCurrentProduct(null);
      } else {
        alert(`Chyba pri aktualizácii produktu: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Nastala neočakávaná chyba pri aktualizácii produktu.');
    }
  };

  // Handle delete product
  const handleDeleteProduct = async () => {
    if (!currentProduct?.id) return;
    
    try {
      const result = await onDeleteAction(currentProduct.id);
      if (result.success) {
        setIsDeleteModalOpen(false);
        setCurrentProduct(null);
      } else {
        alert(`Chyba pri mazaní produktu: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Nastala neočakávaná chyba pri mazaní produktu.');
    }
  };

  // Filter products based on search term, category, and stock status
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || 
      product.category === categoryFilter;
    
    const matchesStock = stockFilter === '' || 
      (stockFilter === 'in_stock' && product.in_stock) ||
      (stockFilter === 'out_of_stock' && !product.in_stock);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Format price to display with 2 decimal places and € symbol
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Správa produktov</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Pridať produkt
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Vyhľadať produkt..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Všetky kategórie</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category || ''}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="">Všetky stavy</option>
                <option value="in_stock">Na sklade</option>
                <option value="out_of_stock">Vypredané</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produkt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategória
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cena
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stav
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Neboli nájdené žiadne produkty
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.image_url && (
                          <div className="flex-shrink-0 h-10 w-10 mr-4">
                            <div className="relative h-10 w-10">
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder-image.jpg';
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          {product.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Odporúčaný
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.in_stock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.in_stock ? 'Na sklade' : 'Vypredané'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsDetailsModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Zobraziť detail"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Upraviť"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Vymazať"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Pridať nový produkt</h2>
              
              <ProductForm
                onSubmitAction={handleCreateProduct}
                onCancelAction={() => setIsAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Upraviť produkt</h2>
              
              <ProductForm
                product={currentProduct}
                onSubmitAction={handleUpdateProduct}
                onCancelAction={() => {
                  setIsEditModalOpen(false);
                  setCurrentProduct(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Potvrdiť vymazanie</h2>
              <p className="mb-4">
                Naozaj chcete vymazať produkt <strong>{currentProduct.name}</strong>? Táto akcia sa nedá vrátiť späť.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Zrušiť
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Vymazať
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{currentProduct.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {currentProduct.image_url && (
                    <div className="relative w-full h-64 mb-4">
                      <Image
                        src={currentProduct.image_url}
                        alt={currentProduct.name}
                        fill
                        className="object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900">
                      Cena: {formatPrice(currentProduct.price)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Kategória: {currentProduct.category || '-'}
                    </p>
                    <div className="flex space-x-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          currentProduct.in_stock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {currentProduct.in_stock ? 'Na sklade' : 'Vypredané'}
                      </span>
                      
                      {currentProduct.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Odporúčaný produkt
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Popis produktu</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {currentProduct.description || 'Bez popisu'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Zavrieť
                </button>
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Upraviť
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
