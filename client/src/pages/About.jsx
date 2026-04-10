import React from 'react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          About Our <span className="text-primary-600">Institution</span>
        </h1>
        <p className="text-xl text-slate-500">
          Dedicated to excellence in education, fostering innovation, and preparing students for the challenges of tomorrow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="College Campus" 
            className="rounded-3xl shadow-xl w-full h-auto object-cover aspect-video"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our History & Legacy</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Founded in 1995, our institution has grown from a modest learning center to a premier educational hub. We have consistently ranked among the top institutions for our commitment to academic excellence and holistic student development.
          </p>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Over the decades, we've nurtured thousands of bright minds who have gone on to become industry leaders, innovators, and responsible global citizens.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <div className="text-3xl font-extrabold text-primary-600 mb-1">10k+</div>
              <div className="text-sm font-medium text-slate-500">Alumni Worldwide</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <div className="text-3xl font-extrabold text-primary-600 mb-1">25+</div>
              <div className="text-sm font-medium text-slate-500">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Vision</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-primary-400 mb-3">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                To provide accessible, high-quality education that empowers students to reach their full potential and make positive contributions to society.
              </p>
            </div>
            <div className="w-16 h-1 bg-slate-700 mx-auto rounded-full"></div>
            <div>
              <h3 className="text-xl font-semibold text-primary-400 mb-3">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                To be a globally recognized center of academic excellence that fosters innovation, critical thinking, and social responsibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
