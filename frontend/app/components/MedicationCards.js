'use client';
import React, { useState } from 'react';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';
import TrainingModal from './TrainingModal';

export default function TrainingCards() {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trainings = [
    {
      id: 1,
      name: 'Java',
      price: '₹499 per package',
      stockStatus: 'Available',
      stockColor: 'green',
      buttonStyle: 'bg-black text-white',
      description: 'Comprehensive Java programming with modern frameworks and best practices.',
      icon: <FaJava className="w-20 h-20 text-blue-600" />,
      promotion: '200 practice sets',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'C++',
      price: '₹499 per package',
      stockStatus: 'Limited Seats',
      stockColor: 'red',
      buttonStyle: 'bg-white text-gray-900 border-2 border-blue-300',
      description: 'Advanced C++ programming with system design and performance optimization.',
      icon: <SiCplusplus className="w-20 h-20 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      name: 'Python',
      price: '₹499 per package',
      stockStatus: 'Limited Seats',
      stockColor: 'red',
      buttonStyle: 'bg-white text-gray-900 border-2 border-blue-300',
      description: 'Complete Python development with data science and machine learning.',
      icon: <FaPython className="w-20 h-20 text-blue-600" />,
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-widest text-gray-600 mb-4 font-semibold">
            OUR TRAINING
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Professional Training Made
            <br />
            Simple & Affordable
          </h2>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {trainings.map((training) => (
            <div
              key={training.id}
              onClick={() => {
                setSelectedTraining(training);
                setIsModalOpen(true);
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image Area */}
              <div className={`relative ${training.bgColor} rounded-t-2xl h-64 p-6`}>
                {/* Stock Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white ${
                    training.stockColor === 'green' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${
                      training.stockColor === 'green' ? 'bg-green-300' : 'bg-red-300'
                    }`}></span>
                    {training.stockStatus}
                  </div>
                </div>

                {/* Training Icon */}
                <div className="w-full h-full flex items-center justify-center mt-8">
                  {training.icon}
                </div>

                {/* Promotion Banner */}
                {training.promotion && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-5/6">
                    <div className="bg-white rounded-lg px-4 py-2 text-center shadow-md">
                      <span className="text-sm font-semibold text-gray-900">{training.promotion}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Training Details */}
              <div className="p-6 space-y-4">
                {/* Training Name */}
                <h3 className="text-2xl font-bold text-gray-900">
                  {training.name}
                </h3>

                {/* Price */}
                <div className="text-xl font-semibold text-gray-900">
                  {training.price}
                </div>

                {/* Get Started Button */}
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 cursor-pointer ${training.buttonStyle}`}
                >
                  Get Started
                </button>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {training.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Modal */}
      <TrainingModal
        training={selectedTraining}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

