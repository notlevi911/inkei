import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import Button from '../ui/button';

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      price: annual ? 12 : 15,
      billing: annual ? 'annually' : 'monthly',
      save: annual ? 'Save $36' : null,
      features: [
        'Up to 5 projects',
        '5GB storage',
        'Basic analytics',
        'Email support',
        'Standard security',
      ],
      cta: 'Start with Starter',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      price: annual ? 29 : 39,
      billing: annual ? 'annually' : 'monthly',
      save: annual ? 'Save $120' : null,
      features: [
        'Unlimited projects',
        '50GB storage',
        'Advanced analytics',
        'Priority support',
        'Enhanced security',
        'Team collaboration',
        'Custom integrations',
      ],
      cta: 'Go Professional',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Advanced features for larger organizations',
      price: annual ? 79 : 99,
      billing: annual ? 'annually' : 'monthly',
      save: annual ? 'Save $240' : null,
      features: [
        'Unlimited everything',
        '500GB storage',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Advanced security',
        'Advanced collaboration',
        'Custom integrations',
        'Dedicated account manager',
        'Single sign-on (SSO)',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Choose the plan that's right for you and start transforming your workflow today.
          </p>
          
          {/* Pricing toggle */}
          <div className="flex justify-center items-center mb-8">
            <span className={`mr-3 text-sm ${annual ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>Annual Billing</span>
            <button 
              className="relative rounded-full w-14 h-7 bg-slate-200 flex items-center transition-colors focus:outline-none"
              onClick={() => setAnnual(!annual)}
              role="switch"
              aria-checked={!annual}
            >
              <span 
                className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-300 ${
                  annual ? '' : 'translate-x-7'
                }`} 
              />
            </button>
            <span className={`ml-3 text-sm ${!annual ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>Monthly Billing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`border ${
                plan.popular 
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                  : 'border-slate-200'
              } h-full flex flex-col justify-between relative transition-all duration-300 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-4 -mr-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="pb-0">
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="py-6">
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-600 ml-2">/{plan.billing}</span>
                  {plan.save && (
                    <p className="text-sm text-indigo-600 font-medium mt-1">{plan.save}</p>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Need a custom plan for your enterprise? 
            <a href="#contact" className="text-indigo-600 font-medium ml-1 hover:text-indigo-700">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;