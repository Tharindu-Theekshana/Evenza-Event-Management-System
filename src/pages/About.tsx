import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
    Users,
    Target,
    Award,
    Heart,
    Globe,
    TrendingUp,
    Calendar,
    Zap,
    Shield,
    Quote,
    ArrowRight,
    Building,
    Coffee,
    Code,
    Palette,
    BarChart3
  } from 'lucide-react';


  
  interface Milestone {
    year: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }
  
  interface Value {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  interface Statistic {
    number: string;
    label: string;
    description: string;
  }

export default function About() {
 

  const milestones: Milestone[] = [
    {
      year: '2025 April',
      title: 'The Beginning',
      description: 'Founded by event professionals frustrated with existing tools. Started with a simple vision.',
      icon: <Zap className="h-6 w-6" />
    },
    {
      year: '2025 May',
      title: 'First Product Launch',
      description: 'Launched our MVP and onboarded first 100 customers despite global challenges.',
      icon: <Target className="h-6 w-6" />
    },
    {
      year: '2025 June',
      title: 'Series A Funding',
      description: 'Raised $10M to accelerate development and expand our team of passionate builders.',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      year: '2025 July',
      title: 'Global Expansion',
      description: 'Opened offices in New York and London. Served customers across 50+ countries.',
      icon: <Globe className="h-6 w-6" />
    },
    {
      year: '2025 August',
      title: 'Enterprise Success',
      description: 'Launched enterprise features and partnered with Fortune 500 companies.',
      icon: <Building className="h-6 w-6" />
    },
    {
      year: '2025 November',
      title: 'AI Integration',
      description: 'We are planning to integrate AI support for customers and organizers in November.',
      icon: <Award className="h-6 w-6" />
    }
  ];

  const values: Value[] = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Customer-First',
      description: 'Every decision we make starts with asking: "How does this help our customers succeed?"'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Trust & Reliability',
      description: 'We build systems and relationships that people can depend on, every single time.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Inclusive Community',
      description: 'We believe diverse perspectives make us stronger and create better solutions for everyone.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Continuous Innovation',
      description: 'We never stop improving, always looking for ways to make event planning more efficient.'
    }
  ];

  const statistics: Statistic[] = [
    {
      number: '50K+',
      label: 'Happy Customers',
      description: 'Event organizers trust Evenza'
    },
    {
      number: '1M+',
      label: 'Events Managed',
      description: 'Successful events powered by our platform'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable service you can count on'
    },
    
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white">

      <section className="bg-blue-900 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                We're Building the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Future
                </span>{' '}
                of Events
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
                Born from real event planning challenges, Evenza is transforming how people create, manage, and experience events worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#story" className=" border-2 text-white px-22 py-4 rounded-full hover:bg-white hover:text-blue-600 duration-600 font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  Our Story <ArrowRight className="h-5 w-5" />
                </a>
                
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-32 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-white" />
                  </div>
                  <div className="h-24 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-24 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div className="h-32 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
                    <Globe className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  It started with a simple frustration. As event professionals, our founders spent countless hours juggling multiple tools, spreadsheets, and manual processes just to organize a single event.
                </p>
                <p>
                  There had to be a better way. So in 2025, we set out to build the event management platform we wished existed – one that would be intuitive enough for beginners yet powerful enough for enterprise teams.
                </p>
                <p>
                  Today, Evenza powers over 1 million events worldwide, from intimate team meetings to large-scale conferences. But our mission remains the same: to eliminate the complexity from event planning so you can focus on creating memorable experiences.
                </p>
              </div>
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                <Quote className="h-8 w-8 text-blue-600 mb-4" />
                <p className="text-gray-700 italic text-lg">
                  "We believe that planning an event should be as exciting as attending one."
                </p>
                <p className="text-blue-600 font-semibold mt-2">- Tharindu Theekshana, CEO</p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"></div>
                  <div className="h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl"></div>
                </div>
                <div className="space-y-6 mt-8">
                  <div className="h-32 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl"></div>
                  <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl"></div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small startup to a global platform trusted by thousands of event organizers.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-900 h-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className={`bg-white rounded-xl p-6 shadow-lg ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      <div className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900">
                          {milestone.icon}
                        </div>
                        <div className="text-2xl font-bold text-blue-900">
                          {milestone.year}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-900 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <div className="text-blue-600 group-hover:text-white transition-colors">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Culture
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built a workplace where creativity thrives, collaboration is natural, and everyone has the opportunity to grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Coffee className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Work-Life Balance
              </h3>
              <p className="text-gray-600">
                Flexible hours, remote options, and unlimited PTO because we believe great work happens when you're at your best.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Continuous Learning
              </h3>
              <p className="text-gray-600">
                Learning budget, conference attendance, and internal knowledge sharing to keep growing your skills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Creative Freedom
              </h3>
              <p className="text-gray-600">
                We encourage experimentation and give you the autonomy to solve problems in your own innovative way.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer/>
      </>
  )
}
