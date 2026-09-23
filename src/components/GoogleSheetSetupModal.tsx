import React, { useState } from 'react';
import {
  getSavedScriptUrl,
  setSavedScriptUrl,
  getSavedBackendUrl,
  setSavedBackendUrl,
  getSavedDoctorEmail,
  setSavedDoctorEmail,
  generateGoogleAppsScriptCode,
  submitLead
} from '../services/leadService';
import { X, Copy, Check, ExternalLink, Mail, Table, Send, Sparkles, Server } from 'lucide-react';

interface GoogleSheetSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetSetupModal: React.FC<GoogleSheetSetupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [scriptUrl, setScriptUrl] = useState(getSavedScriptUrl());
  const [backendUrl, setBackendUrl] = useState(getSavedBackendUrl());
  const [doctorEmail, setDoctorEmail] = useState(getSavedDoctorEmail());
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const scriptCode = generateGoogleAppsScriptCode(doctorEmail);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    setSavedScriptUrl(scriptUrl);
    setSavedBackendUrl(backendUrl);
    setSavedDoctorEmail(doctorEmail);
    setTestStatus('Settings saved successfully!');
    setTimeout(() => setTestStatus(null), 3000);
  };

  const handleTestDispatch = async () => {
    setIsTesting(true);
    setTestStatus(null);
    try {
      const res = await submitLead({
        name: 'Test Patient (Setup Verification)',
        phone: '+91 98470 12345',
        email: doctorEmail,
        condition: 'infertility',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: 'Morning (9:30 AM - 1:00 PM)',
        language: 'Malayalam',
        notes: 'This is a test lead from the MHD website setup assistant to verify Google Sheet insertion and email alert.',
      });

      if (res.isSimulated) {
        setTestStatus('⚠️ Simulated test successful (saved to local vault). If you want it in Google Sheets, paste your deployed Web App URL below.');
      } else {
        setTestStatus('✅ Test lead sent to Google Sheet & email alert dispatched! Check your Sheet and inbox.');
      }
    } catch (e: any) {
      setTestStatus('❌ Test failed: ' + (e?.message || 'Check URL and permissions'));
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-herbal-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-healing-100 text-healing-800 flex items-center justify-center">
            <Table className="w-6 h-6 text-healing-700" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              Google Sheet & Email Lead Setup
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Connect patient bookings directly to your Google Sheet & receive automated email alerts.
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-6 text-sm text-slate-700">
          
          {/* Step 1: Doctor Email */}
          <div className="p-4 rounded-2xl bg-warmth-50 border border-herbal-200/80">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-healing-700" />
              <span>Step 1: Your Mother's / Clinic's Notification Email</span>
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Every time a patient books a consultation, an instant email summary with the patient's phone and condition will be sent to this email.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                placeholder="e.g. madappallilhomoeo@gmail.com"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-healing-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2.5 bg-healing-700 hover:bg-healing-800 text-white rounded-xl font-bold text-xs shadow-xs"
              >
                Save Email
              </button>
            </div>
          </div>

          {/* Step 2: Google Apps Script Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Step 2: Copy-Paste Google Apps Script Code</span>
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 bg-healing-50 text-healing-800 border border-healing-300 rounded-lg hover:bg-healing-100 text-xs font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Script Code'}</span>
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 text-slate-200 text-xs font-mono max-h-48 overflow-y-auto leading-relaxed border border-slate-800">
              <pre>{scriptCode}</pre>
            </div>

            <div className="mt-2 text-[11px] text-slate-500 space-y-1">
              <p>1. Open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-healing-700 underline font-semibold">sheets.new <ExternalLink className="w-3 h-3 inline" /></a> and name your sheet "MHD Patient Leads".</p>
              <p>2. In the Google Sheet, click <strong>Extensions &gt; Apps Script</strong>.</p>
              <p>3. Delete any boilerplate, paste the code above, and click <strong>Deploy &gt; New deployment</strong>.</p>
              <p>4. Select <strong>Type: Web app</strong>, Execute as: <strong>Me</strong>, Who has access: <strong>Anyone</strong>.</p>
              <p>5. Authorize the script, copy the provided Web App URL, and paste it in Step 3 below.</p>
            </div>
          </div>

          {/* Step 3: Paste Webhook URL */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Step 3: Paste Your Deployed Web App URL (100% Free Google Script)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={scriptUrl}
                onChange={(e) => setScriptUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-healing-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2.5 bg-healing-700 hover:bg-healing-800 text-white rounded-xl font-bold text-xs shadow-xs"
              >
                Save URL
              </button>
            </div>
          </div>

          {/* Optional: Render Free Backend URL */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-healing-700" />
              <span>Step 4 (Optional): Render Backend URL (Free Tier)</span>
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              If you host the provided <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">madappallilBE</code> on Render Free Plan ($0), paste its URL here (e.g. <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">https://madappallilbe.onrender.com</code>).
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder="https://madappallilbe.onrender.com"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-healing-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2.5 bg-healing-700 hover:bg-healing-800 text-white rounded-xl font-bold text-xs shadow-xs"
              >
                Save Backend
              </button>
            </div>
          </div>

          {/* Status Message */}
          {testStatus && (
            <div className="p-3 rounded-xl bg-slate-100 text-xs font-medium text-slate-800 border border-slate-200">
              {testStatus}
            </div>
          )}

          {/* Test Submission Button */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Test with one click before publishing.
            </span>
            <button
              type="button"
              disabled={isTesting}
              onClick={handleTestDispatch}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTesting ? 'Sending Test...' : 'Send Test Lead'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
