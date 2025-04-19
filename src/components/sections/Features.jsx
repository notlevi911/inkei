import React from 'react';
import { Card, CardContent } from '../ui/card';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Advanced Analytics',
      description: 'Gain powerful insights with our advanced analytics dashboard. Track performance metrics and make data-driven decisions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 21H3" />
          <path d="M21 9H3" />
          <path d="M8 17V13" />
          <path d="M16 17V13" />
          <path d="M12 17V13" />
          <path d="M12 9V3" />
          <path d="M16 9V3" />
          <path d="M8 9V3" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Cloud Integration',
      description: 'Seamlessly integrate with your favorite cloud services. Store, access, and share your data securely from anywhere.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'AI-Powered Automation',
      description: 'Let our AI handle repetitive tasks. Automate workflows and focus on what matters most to your business.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8" />
          <path d="M9 19h6" />
          <path d="M12 15V9" />
          <path d="M9 12l3 3 3-3" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Secure Authentication',
      description: 'Rest easy with our enterprise-grade security. Multi-factor authentication and data encryption come standard.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <path d="M12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Real-time Collaboration',
      description: 'Work together in real-time with your team. Edit, comment, and share updates instantly across all devices.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Responsive Design',
      description: 'Experience a flawless interface on any device. Our responsive design ensures a consistent experience from desktop to mobile.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M3 15h18" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Powerful Features Built For You
          </h2>
          <p className="text-lg text-slate-600">
            Our platform combines powerful features with an intuitive interface to 
            help you achieve more with less effort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.id} 
              hover={true}
              className="border border-slate-200 transition-all duration-300 hover:border-indigo-200"
            >
              <CardContent className="p-6">
                <div className="rounded-full bg-indigo-50 w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;