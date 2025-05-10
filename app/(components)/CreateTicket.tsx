import React, { useState } from 'react';

interface CreateTicketProps {
  onSubmit: (ticketData: {
    issue: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
  }) => void;
}

const CreateTicket: React.FC<CreateTicketProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    issue: '',
    description: '',
    priority: 'Medium' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ issue: '', description: '', priority: 'Medium' });
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-end w-full">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Ticket
          </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 transition-opacity duration-300">
          <div className="relative top-0 sm:top-20 mx-auto p-4 sm:p-6 md:p-10 w-full sm:w-[90%] md:w-[700px] shadow-2xl rounded-xl bg-white transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6 sm:mb-8 pb-4 sm:pb-6">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Create New Ticket</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                  Issue Title
                </label>
                <input
                  type="text"
                  id="issue"
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base transition-colors duration-200 px-3 sm:px-4 py-2 sm:py-3"
                  placeholder="Enter a brief title for your issue"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base transition-colors duration-200 px-3 sm:px-4 py-2 sm:py-3"
                  placeholder="Provide detailed information about your issue"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority Level
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as "Low" | "Medium" | "High" })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base transition-colors duration-200 px-3 sm:px-4 py-2 sm:py-3"
                >
                  <option value="Low" className="text-green-600">Low - Not urgent</option>
                  <option value="Medium" className="text-yellow-600">Medium - Normal priority</option>
                  <option value="High" className="text-red-600">High - Urgent attention needed</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTicket; 