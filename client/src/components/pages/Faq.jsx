import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an event on AthleticHub?",
      answer: "To create an event, log in to your account, click 'Create Event' in the dashboard, fill out the event details including date, location, and description, then submit for approval. Most events are approved within 24 hours."
    },
    {
      question: "What types of sports events can I find on AthleticHub?",
      answer: "We host a wide variety of events including running races, swimming competitions, basketball tournaments, martial arts meets, and more. You can filter events by sport type, location, date, and skill level."
    },
    {
      question: "Is there a fee to join AthleticHub?",
      answer: "Creating an account and browsing events is completely free. Some events may have participation fees set by the organizers, which will be clearly displayed before registration."
    },
    {
      question: "How do I contact an event organizer?",
      answer: "After registering for an event, you'll have access to the event dashboard where you can message the organizer directly. For general inquiries, use our contact form."
    },
    {
      question: "What is your refund policy?",
      answer: "Refund policies vary by event and are set by the organizers. Typically, refunds are available up to 7 days before an event. Check the specific event details for their policy."
    },
    {
      question: "Can I volunteer at events through AthleticHub?",
      answer: "Yes! Many events need volunteers. Look for events marked 'Volunteer Opportunities' or contact organizers directly to inquire about volunteering positions."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about AthleticHub
        </p>
      </section>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              className={`w-full flex justify-between items-center p-6 text-left ${activeIndex === index ? 'bg-gray-50' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
            
            <div 
              className={`px-6 pb-6 pt-0 transition-all duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions Section */}
      <section className="mt-16 bg-muted text-white p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-muted-foreground">Still have questions?</h2>
        <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
          Can't find what you're looking for? Our support team is happy to help.
        </p>
        <a 
          href="/contact" className='text-muted-foreground hover:text-primary font-semibold'
        >
          Contact Support
        </a>
      </section>
    </div>
  );
};

export default FAQPage;