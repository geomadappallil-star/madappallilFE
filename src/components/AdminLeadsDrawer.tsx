import { useState, useEffect } from 'react';
import { getLocalLeads } from '../services/leadService';
import { LeadData } from '../types';
import { X, Download, Phone, MessageSquare, Calendar, HeartHandshake } from 'lucide-react';

interface AdminLeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsDrawer: React.FC<AdminLeadsDrawerProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<LeadData[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLeads(getLocalLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Lead ID', 'Date', 'Name', 'Phone', 'Email', 'Department', 'Slot', 'Language', 'Notes'];
    const rows = leads.map((l) => [
      l.id || '',
      l.submittedAt || '',
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.condition}"`,
      `"${l.preferredDate || ''} ${l.preferredTime || ''}"`,
      `"${l.language}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MHD_Patient_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col animate-slideLeft">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-warmth-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-healing-700 text-white flex items-center justify-center font-bold text-sm">
              MHD
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Local Patient Leads Vault
              </h3>
              <p className="text-xs text-slate-500">
                {leads.length} enquiry record{leads.length === 1 ? '' : 's'} stored securely
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                title="Download CSV file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lead List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {leads.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <HeartHandshake className="w-12 h-12 mx-auto mb-3 opacity-40 text-healing-700" />
              <p className="text-sm font-semibold text-slate-600">No leads recorded yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                When patients submit the booking form, their contact details will appear here immediately.
              </p>
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-warmth-50/70 border border-herbal-200 rounded-2xl p-4.5 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{lead.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-healing-100 text-healing-800">
                        {lead.id}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {lead.condition === 'infertility'
                        ? '🌱 Infertility Care'
                        : lead.condition === 'mental_health'
                        ? '🧠 Mental Health'
                        : '🌿 General Care'}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    {lead.submittedAt ? new Date(lead.submittedAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-healing-600" />
                    <span className="font-semibold text-slate-800">{lead.phone}</span>
                  </div>
                  {lead.email && (
                    <div className="text-slate-500 truncate">
                      {lead.email}
                    </div>
                  )}
                  {lead.preferredDate && (
                    <div className="flex items-center gap-1.5 col-span-2 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>Preferred: {lead.preferredDate} ({lead.preferredTime})</span>
                    </div>
                  )}
                </div>

                {lead.notes && (
                  <p className="text-xs bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 italic">
                    "{lead.notes}"
                  </p>
                )}

                {/* Quick Doctor Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-healing-700 hover:bg-healing-800 text-white font-semibold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Patient</span>
                  </a>

                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
