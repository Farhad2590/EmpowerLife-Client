// import  { useState } from 'react';
// import { FaChevronRight } from 'react-icons/fa';
import DynamicHeader from '../SharedComponets/DynamicHeader';

const categories = [
  {
    id: 1,
    name: 'Hearing Aids',
    description: 'Devices to assist with hearing loss.',
    image: 'https://i.ibb.co/QN4cFNr/download-1.jpg',
  },
  {
    id: 2,
    name: 'Mobility Aids',
    description: 'Assistive equipment for easier mobility.',
    image: 'https://i.ibb.co/jMT1Jjn/download-2.jpg',
  },
  {
    id: 3,
    name: 'Vision Aids',
    description: 'Tools to support vision-impaired users.',
    image: 'https://i.ibb.co/p0PcWs6/download-3.jpg',
  },
  {
    id: 4,
    name: 'Daily Living Aids',
    description: 'Items to help with daily life tasks.',
    image: 'https://i.ibb.co/Y794Nr5/download-4.jpg',
  },
  {
    id: 5,
    name: 'Cognitive Aids',
    description: 'Support devices for cognitive impairments.',
    image: 'https://i.ibb.co/PFxhgzL/download.jpg',
  },
];

const AssistiveEquipmentCategories = () => {
  // const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-6">
      <DynamicHeader title="Assistive Equipment Categories" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            // onClick={() => setSelectedCategory(category.name)}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#86c7d2]">{category.name}</h3>
              <p className="text-gray-600 mt-2">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AssistiveEquipmentCategories;
