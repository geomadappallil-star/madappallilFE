import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitLead, SubmitLeadResult } from '../services/leadService';
import { Confetti } from './Confetti';
import {
  Calendar,
  Phone,
  Mail,
  User,
  HeartHandshake,
  Clock,
  Globe,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Settings,
  Baby,
  Brain,
  Sparkles
} from 'lucide-react';

interface LeadBookingFormProps {
  selectedCondition?: 'infertility' | 'mental_health' | 'general';
  onOpenSettings: () => void;
}

export const LeadBookingForm: React.FC<LeadBookingFormProps> = ({
  selectedCondition = 'infertility',
  onOpenSettings,
}) => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    condition: selectedCondition,
    preferredDate: '',
    preferredTime: 'Morning (9:30 AM - 1:00 PM)',
    consultLanguage: language === 'ml' ? 'Malayalam' : 'English',
    notes: '',
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      condition: selectedCondition,
    }));
  }, [selectedCondition]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      consultLanguage: language === 'ml' ? 'Malayalam' : 'English',
    }));
  }, [language]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmitLeadResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [confettiActive, setConfettiActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage(
        language === 'ml'
          ? 'ദയവായി രോഗിയുടെ പേരും ഫോൺ നമ്പറും നൽകുക.'
          : 'Please provide patient name and contact phone number.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        condition: formData.condition,
        preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
        preferredTime: formData.preferredTime,
        language: formData.consultLanguage as 'English' | 'Malayalam',
        notes: formData.notes.trim(),
      });

      setSubmissionResult(result);
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 5000);
    } catch (err: any) {
      setErrorMessage(
        language === 'ml'
          ? 'സമർപ്പണത്തിൽ തടസ്സം നേരിട്ടു. ദയവായി WhatsApp വഴി ബന്ധപ്പെടുക.'
          : 'Submission issue. Please contact us directly via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    const phoneClean = '919544548826';
    const text =
      language === 'ml'
        ? `നമസ്കാരം, മാടപ്പള്ളിൽ ഹോമിയോ ഡിസ്പെൻസറിയിൽ ഞാൻ ഒരു കൺസൾട്ടേഷൻ അന്വേഷണം നടത്തിയിട്ടുണ്ട് (Ref: ${
            submissionResult?.leadId || 'MHD'
          }). പേര്: ${formData.name}, ഫോൺ: ${formData.phone}, വിഷയം: ${formData.condition}. കൂടുതൽ വിവരങ്ങൾ അറിയാൻ ആഗ്രഹിക്കുന്നു.`
        : `Hello, I submitted a consultation enquiry at Madappallil Homoeo Dispensary (Ref: ${
            submissionResult?.leadId || 'MHD'
          }). Name: ${formData.name}, Phone: ${formData.phone}, Department: ${
            formData.condition
          }. Looking forward to connecting.`;
    return `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
  };

  const getEmailMessageUrl = () => {
    const emailTo = 'geomadappallil@gmail.com';
    const subject = `🌿 [MHD Patient Enquiry] ${formData.name} (Ref: ${submissionResult?.leadId || 'MHD'})`;
    const body = `Patient Consultation Enquiry:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Department: ${formData.condition}
Preferred Slot: ${formData.preferredDate || 'Flexible'} (${formData.preferredTime})
Language: ${formData.consultLanguage}
Symptoms / Notes: ${formData.notes || 'None'}

Submitted to Madappallil Homoeo Dispensary, Kattappana (Q447+7WJ, Kattappana, Kerala 685508).`;
    return `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="book-form" className="py-12 sm:py-16 bg-white border-t border-slate-100 relative">
      <Confetti active={confettiActive} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-100">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.form.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mb-1.5">
            {t.form.title}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm">
            {t.form.subtitle}
          </p>
        </div>

        {/* Integration Notification / Direct Contact Pill */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              <strong className="font-bold">{language === 'ml' ? 'നേരിട്ടുള്ള ബുക്കിംഗ്:' : 'Direct Booking:'}</strong>{' '}
              <a href="tel:+919544548826" className="font-bold text-emerald-900 underline">+91 95445 48826</a>
              {' • '}
              <a href="mailto:geomadappallil@gmail.com" className="text-emerald-800 underline">geomadappallil@gmail.com</a>
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1 px-2.5 py-1 bg-white text-emerald-900 border border-emerald-300 rounded-lg hover:bg-emerald-100 font-bold text-[11px] transition-colors shrink-0"
          >
            <Settings className="w-3 h-3 text-emerald-700" />
            <span>{t.form.configBtn}</span>
          </button>
        </div>

        {/* Success Card */}
        {submissionResult ? (
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border-2 border-emerald-400 shadow-md text-center animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="text-[11px] uppercase font-bold text-emerald-800 bg-emerald-100/70 px-3 py-0.5 rounded-full inline-block mb-2">
              {t.form.leadRef}: {submissionResult.leadId}
            </span>

            <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">
              {t.form.successTitle}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-5 leading-relaxed">
              {t.form.successMessage}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.form.directWhatsappBtn}</span>
              </a>

              <a
                href={getEmailMessageUrl()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{language === 'ml' ? 'ഇമെയിൽ വഴി അയക്കുക' : 'Send via Email'}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmissionResult(null);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    condition: 'infertility',
                    preferredDate: '',
                    preferredTime: 'Morning (9:30 AM - 1:00 PM)',
                    consultLanguage: language === 'ml' ? 'Malayalam' : 'English',
                    notes: '',
                  });
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs transition-colors hover:bg-slate-100"
              >
                {language === 'ml' ? 'മറ്റൊരു ബുക്കിംഗ്' : 'Book Another Visit'}
              </button>
            </div>
          </div>
        ) : (
          /* Actual Compact Form */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50/70 rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-card"
          >
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-3.5">
              
              {/* Department Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  <span>{t.form.conditionLabel} *</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, condition: 'infertility' })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                      formData.condition === 'infertility'
                        ? 'border-emerald-600 bg-white text-emerald-950 font-bold ring-2 ring-emerald-600 shadow-2xs'
                        : 'border-slate-200 bg-white/70 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <Baby className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-xs">{t.form.conditionInfertility}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, condition: 'mental_health' })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                      formData.condition === 'mental_health'
                        ? 'border-emerald-600 bg-white text-emerald-950 font-bold ring-2 ring-emerald-600 shadow-2xs'
                        : 'border-slate-200 bg-white/70 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <Brain className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-xs">{t.form.conditionMental}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, condition: 'general' })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                      formData.condition === 'general'
                        ? 'border-emerald-600 bg-white text-emerald-950 font-bold ring-2 ring-emerald-600 shadow-2xs'
                        : 'border-slate-200 bg-white/70 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs">{t.form.conditionGeneral}</span>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <User className="w-3 h-3 text-emerald-700" />
                  <span>{t.form.nameLabel} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.form.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-700" />
                    <span>{t.form.phoneLabel} *</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.form.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-emerald-700" />
                    <span>{t.form.emailLabel}</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-700" />
                    <span>{t.form.dateLabel}</span>
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-700" />
                    <span>{t.form.timeLabel}</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Morning (9:30 AM - 1:00 PM)">{t.form.timeMorning}</option>
                    <option value="Evening (4:30 PM - 7:30 PM)">{t.form.timeEvening}</option>
                  </select>
                </div>
              </div>

              {/* Language Choice */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-700" />
                  <span>{t.form.languageLabel}</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="consultLanguage"
                      value="Malayalam"
                      checked={formData.consultLanguage === 'Malayalam'}
                      onChange={() => setFormData({ ...formData, consultLanguage: 'Malayalam' })}
                      className="text-emerald-700 focus:ring-emerald-500"
                    />
                    <span>മലയാളം (Malayalam)</span>
                  </label>

                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="consultLanguage"
                      value="English"
                      checked={formData.consultLanguage === 'English'}
                      onChange={() => setFormData({ ...formData, consultLanguage: 'English' })}
                      className="text-emerald-700 focus:ring-emerald-500"
                    />
                    <span>English</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-emerald-700" />
                  <span>{t.form.notesLabel}</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t.form.notesPlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

            </div>

            {/* Privacy */}
            <div className="my-3 text-[10px] text-slate-500 text-center">
              {t.form.privacyNotice}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.form.submitting}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{t.form.submitBtn}</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
