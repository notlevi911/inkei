import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CTO, TechScale Inc.',
      content:
        'Zenith transformed how our team collaborates. The platform is intuitive yet powerful, making it easy to onboard new team members while providing the advanced features our developers need. The analytics dashboard has become central to our decision-making process.',
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Founder, Quantum Solutions',
      content:
        "We evaluated several platforms before choosing Zenith, and it's been the best decision for our growing company. The scaling capabilities are impressive - we started with just 5 team members and now have over 50 using the platform daily without any performance issues.",
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Director, Elevate Brands',
      content:
        "As a marketing team constantly iterating on campaigns, Zenith's real-time collaboration features have eliminated the bottlenecks we used to face. The customizable workflows adapt perfectly to our creative process, and the analytics help us demonstrate clear ROI.",
    },
    {
      id: 4,
      name: 'Michael Taylor',
      role: 'Operations Manager, Global Nexus',
      content:
        'The automation capabilities in Zenith have saved our team countless hours on repetitive tasks. What used to take our team days now happens automatically in the background. Their customer support is also exceptional - responsive, knowledgeable, and genuinely helpful.',
    },
    {
      id: 5,
      name: 'Sophia Williams',
      role: 'Product Designer, Creative Pulse',
      content:
        "Zenith's interface is a designer's dream - clean, intuitive, and thoughtfully crafted. I appreciate how the platform balances powerful functionality with ease of use. The design system integration options have streamlined our product development workflow significantly.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const getAvatarUrl = (name) =>
    `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(name)}&size=80`;

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-indigo-900 to-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Innovators
          </h2>
          <p className="text-lg font-semibold text-indigo-200">
            See what our customers are saying about their experience with our platform.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4 transition-all duration-500"
              >
                <Card className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl hover:shadow-indigo-600/40 transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur opacity-60 group-hover:opacity-90 transition" />
                      <img
                        src={getAvatarUrl(testimonial.name)}
                        alt={testimonial.name}
                        className="relative h-20 w-20 rounded-full border-2 border-indigo-400"
                      />
                    </div>
                    <div className="text-2xl text-indigo-300 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="inline-block mb-1"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-slate-900 font-medium mb-6">
                      {testimonial.content}
                    </p>
                    <h4 className="font-bold text-black text-lg">{testimonial.name}</h4>
                    <p className="text-blue-400 font-semibold text-sm">{testimonial.role}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-indigo-600/80 rounded-full p-2 text-white hover:bg-indigo-500 transition"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1
              )
            }
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-indigo-600/80 rounded-full p-2 text-white hover:bg-indigo-500 transition"
            onClick={() =>
              setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
            }
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-indigo' : 'bg-slate'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
