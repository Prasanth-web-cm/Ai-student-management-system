import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit action
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          Contact <span className="text-primary-600">Us</span>
        </h1>
        <p className="text-xl text-slate-500">
          Have questions or need assistance? We're here to help. Reach out to our team using the form or contact details below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary-50 rounded-full blur-2xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>

          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="ENTER NAME"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="abc@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Admission Inquiry"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-primary-600/20"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information & Map */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-xl shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Our Location</h4>
                  <p className="text-slate-200">siddartha University Avenue,<br />puttur District, ED 2004</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-xl shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</h4>
                  <p className="text-slate-200">+91 9876543210<br /><span className="text-sm text-slate-400">Mon-Fri 8am-6pm</span></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-xl shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</h4>
                  <p className="text-slate-200">SDTN@institution.edu<br />support@institution.edu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-3xl overflow-hidden h-64 relative border border-slate-200">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="font-medium">Interactive Map Integration Here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
