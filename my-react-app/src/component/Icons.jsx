import {
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
  FaCode
} from 'react-icons/fa';

// 1. Create a mapper object
const iconMap = {
  FaBook: FaBook,
  FaChartLine: FaChartLine,
  FaClock: FaClock,
  FaAward: FaAward,
  FaPlay: FaPlay,
  FaUsers: FaUsers,
  FaCalendarAlt: FaCalendarAlt,
  FaArrowRight: FaArrowRight,
  FaStar: FaStar,
  FaGraduationCap: FaGraduationCap,
  FaLightbulb: FaLightbulb,
  FaCode: FaCode
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