import {
  FaBook,
  FaChartLine,
  FaClock,
  FaAward,
  FaPlay,
  FaUsers,
  FaCalendarAlt,
  FaArrowRight,
  FaStar, FaGraduationCap, FaLightbulb, FaCode,
  FaLaptopCode, FaBrain, FaRocket, FaCloud, FaDatabase, FaAws
} from 'react-icons/fa';

// 1. Create a mapper object
export const iconMap = {
  FaBook,
  FaChartLine,
  FaClock,
  FaAward,
  FaPlay,
  FaUsers,
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
  FaGraduationCap,
  FaLightbulb,
  FaCode,
  FaLaptopCode,
  FaBrain,
  FaRocket,
  FaCloud,
  FaDatabase,
  FaAws
};

export default function Icons({ icon, ...props }) {
  // 2. Look up the component from the map using the string prop
  const IconComponent = iconMap[icon];

  // 3. Render the found component, or return null if not found
  if (!IconComponent) {
    return null; // Or return a default icon
  }

  // Pass any other props (like size, color) to the icon component
  return <IconComponent {...props} />;
}