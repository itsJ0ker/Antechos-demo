import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Trash2, Edit, CheckSquare, Square } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const BulkOperations = ({ tableName, data, onRefresh }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkAction, setBulkAction] = useState('');

  const handleSelectAll = () => {
    if (selectedItems.size === data.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(data.map(item => item.id)));
    }
  };

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedItems.size === 0) return;

    try {
      const itemIds = Array.from(selectedItems);
      
      switch (bulkAction) {
        case 'activate':
          await supabase
            .from(tableName)
            .update({ is_active: true })
            .in('id', itemIds);
          break;
        
        case 'deactivate':
          await supabase
            .from(tableName)
            .update({ is_active: false })
            .in('id', itemIds);
          break;
        
        case 'delete':
          if (confirm(`Are you sure you want to delete ${itemIds.length} items?`)) {
            await supabase
              .from(tableName)
              .delete()
              .in('id', itemIds);
          }
          break;
        
        case 'feature':
          if (tableName === 'testimonials') {
            await supabase
              .from(tableName)
              .update({ is_featured: true })
              .in('id', itemIds);
          }
          break;
        
        case 'unfeature':
          if (tableName === 'testimonials') {
            await supabase
              .from(tableName)
              .update({ is_featured: false })
              .in('id', itemIds);
          }
          break;
      }

      setSelectedItems(new Set());
      setBulkAction('');
      setShowBulkActions(false);
      onRefresh();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Error performing bulk action: ' + error.message);
    }
  };

  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).filter(key => 
      !key.includes('_at') && !key.includes('id') && typeof data[0][key] !== 'object'
    );
    
    const csvContent = [
      headers.join(','),
      ...data.map(item => 
        headers.map(header => 
          typeof item[header] === 'string' && item[header].includes(',') 
            ? `"${item[header]}"` 
            : item[header] || ''
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {selectedItems.size === data.length ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            <span>Select All ({data.length})</span>
          </button>
          
          {selectedItems.size > 0 && (
            <span className="text-sm text-blue-600 font-medium">
              {selectedItems.size} selected
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          
          {selectedItems.size > 0 && (
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-4 h-4" />
              <span>Bulk Actions</span>
            </button>
          )}
        </div>
      </div>

      {showBulkActions && selectedItems.size > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t pt-4"
        >
          <div className="flex items-center space-x-4">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Action</option>
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              {tableName === 'testimonials' && (
                <>
                  <option value="feature">Feature</option>
                  <option value="unfeature">Unfeature</option>
                </>
              )}
              <option value="delete">Delete</option>
            </select>
            
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Apply to {selectedItems.size} items
            </button>
            
            <button
              onClick={() => {
                setShowBulkActions(false);
                setBulkAction('');
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Selection checkboxes for each item */}
      <div className="hidden">
        {data.map(item => (
          <input
            key={item.id}
            type="checkbox"
            checked={selectedItems.has(item.id)}
            onChange={() => handleSelectItem(item.id)}
            className="bulk-select-checkbox"
            data-id={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BulkOperations;