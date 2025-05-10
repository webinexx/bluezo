import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import CreateTicket from './CreateTicket'

interface Ticket {
  id: string;
  issue: string;
  createdBy: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  priority?: 'Low' | 'Medium' | 'High';
  description?: string;
}

interface DashboardLayoutProps {
  roleId: number;
}

function DashboardLayout({ roleId }: DashboardLayoutProps) {
  // Sample ticket data - in real app, this would come from an API
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TICK-001",
      issue: "Login page not working",
      createdBy: "John Doe",
      status: "Open",
      createdAt: "2024-03-20",
      priority: "High",
      description: "Unable to login to the system"
    },
    {
      id: "TICK-002",
      issue: "Payment gateway error",
      createdBy: "Jane Smith",
      status: "In Progress",
      createdAt: "2024-03-19",
      priority: "Medium",
      description: "Payment processing failed"
    },
    {
      id: "TICK-003",
      issue: "Profile update failed",
      createdBy: "Mike Johnson",
      status: "Resolved",
      createdAt: "2024-03-18",
      priority: "Low",
      description: "Cannot update profile information"
    }
  ]);

  const handleStatusChange = (ticketId: string, newStatus: Ticket['status']) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
  };

  const handleCreateTicket = (ticketData: { issue: string; description: string; priority: 'Low' | 'Medium' | 'High' }) => {
    // In real app, this would make an API call to create the ticket
    const newTicket: Ticket = {
      id: `TICK-${String(tickets.length + 1).padStart(3, '0')}`,
      issue: ticketData.issue,
      createdBy: "Current User", // This would come from the user context
      status: "Open",
      createdAt: new Date().toISOString().split('T')[0],
      priority: ticketData.priority,
      description: ticketData.description
    };
    setTickets([newTicket, ...tickets]);
  };

  return (
    <div>
      {roleId === 1 && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  Total Tickets
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                  Admin
                </span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-700">156</p>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm text-green-500">
                <span>+12</span>
                <span className="ml-1">new this week</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  Open Tickets
                </h3>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                  Urgent
                </span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-700">23</p>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm text-red-500">
                <span>5 high priority</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  Resolved Today
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                  Success
                </span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-700">18</p>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm text-green-500">
                <span>+8</span>
                <span className="ml-1">vs yesterday</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  Avg. Response Time
                </h3>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                  Performance
                </span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-700">2.5h</p>
              <div className="flex items-center mt-3 sm:mt-4 text-xs sm:text-sm text-green-500">
                <span>-15%</span>
                <span className="ml-1">vs last week</span>
              </div>
            </div>
          </div>

          {/* Admin Ticket List */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Ticket Management</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ticket ID</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Issue</th>
                      <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created By</th>
                      <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created At</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-indigo-600">{ticket.id}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700">{ticket.issue}</td>
                        <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{ticket.createdBy}</td>
                        <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{ticket.createdAt}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="relative">
                            <select
                              value={ticket.status}
                              onChange={(e) => handleStatusChange(ticket.id, e.target.value as Ticket['status'])}
                              className={`appearance-none block w-full pl-3 pr-10 py-2 text-xs sm:text-sm font-medium rounded-lg border-0 focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer
                                ${ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500' : 
                                  ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500' :
                                  ticket.status === 'Resolved' ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500' :
                                  'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500'}`}
                            >
                              <option value="Open" className="bg-white text-yellow-800">Open</option>
                              <option value="In Progress" className="bg-white text-blue-800">In Progress</option>
                              <option value="Resolved" className="bg-white text-green-800">Resolved</option>
                              <option value="Closed" className="bg-white text-gray-800">Closed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors duration-200">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {roleId === 2 && (
        <div className="space-y-4 sm:space-y-6">
          {/* Create Ticket Button and Form */}
          <CreateTicket onSubmit={handleCreateTicket} />

          {/* User Ticket List */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">My Tickets</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-blue-500 to-cyan-500">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ticket ID</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Issue</th>
                      <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Priority</th>
                      <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created At</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-blue-600">{ticket.id}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700">{ticket.issue}</td>
                        <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`px-2 sm:px-3 py-1 inline-flex text-xs font-medium rounded-full
                            ${ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                              ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{ticket.createdAt}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`px-2 sm:px-4 py-1 sm:py-1.5 inline-flex items-center text-xs font-medium rounded-full 
                              ${ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 
                                ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'}`}>
                              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2
                                ${ticket.status === 'Open' ? 'bg-yellow-500' : 
                                  ticket.status === 'In Progress' ? 'bg-blue-500' :
                                  ticket.status === 'Resolved' ? 'bg-green-500' :
                                  'bg-gray-500'}`}>
                              </span>
                              {ticket.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback content if no role detected */}
      {!roleId && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <FaUserCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
            <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">
              Loading user data...
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Please wait while we retrieve your information.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout