import { useState } from "react";
import Navbar from "../components/Navbar";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Headphones,
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    CheckCircle,
    ArrowLeft,
    User,
    Building
  } from 'lucide-react';
import Footer from "../components/Footer";

  interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    message: string;
    contactPreference: 'email' | 'phone' | 'either';
  }

  interface ContactMethod {
    icon: React.ReactNode;
    title: string;
    description: string;
    value: string;
    action: string;
  }
  
  interface OfficeLocation {
    city: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
  }

export default function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        contactPreference: 'email'
      });
    
      const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
      const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
      };
    
      const contactMethods: ContactMethod[] = [
        {
          icon: <Mail className="h-8 w-8" />,
          title: 'Email Us',
          description: 'Send us an email and we\'ll respond within 24 hours',
          value: 'support@evenza.com',
          action: 'mailto:support@evenza.com'
        },
        {
          icon: <Phone className="h-8 w-8" />,
          title: 'Call Us',
          description: 'Mon-Fri from 8am to 6pm PST',
          value: '+94767696411',
          action: 'tel:+94767696411'
        },
        {
          icon: <MessageSquare className="h-8 w-8" />,
          title: 'Live Chat',
          description: '24/7 support through our chat system',
          value: 'Start Chat',
          action: '#'
        },
        {
          icon: <Headphones className="h-8 w-8" />,
          title: 'Help Center',
          description: 'Browse our comprehensive knowledge base',
          value: 'Visit Help Center',
          action: '#'
        }
      ];
    
    
    
      if (isSubmitted) {
        return (
            <>
            <Navbar/>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                <p className="text-gray-600 mb-8">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Send Another Message
                </button>
                </div>
            </div>
            <Footer/>
          </>
        );
      }
      
    
      return (
        <>
        <Navbar/>
        <div className="min-h-screen pt-18 bg-white">
          <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Touch</span>
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
                Have questions about Evenza? We're here to help you succeed with your events.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-blue-100">
                  ✨ Average response time: 2 hours
                </div>
              </div>
            </div>
          </section>
    
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Multiple Ways to Reach Us
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose the contact method that works best for you. We're available across multiple channels.
                </p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <div className="text-blue-600 group-hover:text-white transition-colors">
                        {method.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                    <p className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      {method.value}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
    
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>
    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
    
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    <p className="text-lg text-gray-600 mb-8">
                      We'd love to hear from you. Choose the method that works best for you, and we'll get back to you as soon as possible.
                    </p>
                  </div>
    
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Clock className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM PST</p>
                      <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM PST</p>
                      <p><strong>Sunday:</strong> Closed</p>
                      <p className="text-sm text-blue-600 mt-2">
                         Live chat is available 24/7 for urgent inquiries
                      </p>
                    </div>
                  </div>
    
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      {[
                        { icon: Facebook, href: '#', label: 'Facebook' },
                        { icon: Twitter, href: '#', label: 'Twitter' },
                        { icon: Instagram, href: '#', label: 'Instagram' },
                        { icon: Linkedin, href: '#', label: 'LinkedIn' }
                      ].map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors transform hover:scale-110"
                          aria-label={label}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
    
                  {/* Emergency Contact */}
                  <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-red-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-red-800">Emergency Support</h3>
                        <p className="text-red-700 text-sm">
                          For critical event issues: <strong>+94767696411-HELP</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </div>
          <>
          <Footer/>
          </>
        </>
      );
                }
