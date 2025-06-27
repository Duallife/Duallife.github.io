'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaLaptopCode, FaInfoCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

// Define the TimelineItem interface directly here
export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'education' | 'work' | 'project';
}

interface GanttTimelineProps {
  items: TimelineItem[];
}

// Parse date string to Date object
const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split(' - ');
  const startDate = parts[0];
  
  // Handle different date formats
  if (startDate.includes('Sept') || startDate.includes('9月')) {
    return new Date(parseInt(startDate.split(' ')[1] || startDate.split('年')[0]), 8, 1); // September is month 8 (0-indexed)
  } else if (startDate.includes('Jun') || startDate.includes('6月')) {
    return new Date(parseInt(startDate.split(' ')[1] || startDate.split('年')[0]), 5, 1); // June is month 5 (0-indexed)
  } else if (startDate.includes('Jul') || startDate.includes('7月')) {
    return new Date(parseInt(startDate.split(' ')[1] || startDate.split('年')[0]), 6, 1); // July is month 6 (0-indexed)
  } else if (startDate.includes('Oct') || startDate.includes('10月')) {
    return new Date(parseInt(startDate.split(' ')[1] || startDate.split('年')[0]), 9, 1); // October is month 9 (0-indexed)
  } else if (startDate.includes('Now') || startDate.includes('现在')) {
    return new Date(); // Current date
  } else if (startDate.includes('Dec') || startDate.includes('12月')) {
    return new Date(parseInt(startDate.split(' ')[1] || startDate.split('年')[0]), 11, 1); // December is month 11 (0-indexed)
  }
  
  // Default fallback
  return new Date(2020, 0, 1);
};

// Parse end date from date string
const parseEndDate = (dateStr: string): Date => {
  const parts = dateStr.split(' - ');
  const endDate = parts[1] || parts[0];
  
  if (endDate.includes('Now') || endDate.includes('现在')) {
    return new Date();
  } else if (endDate.includes('Jun') || endDate.includes('6月')) {
    return new Date(parseInt(endDate.split(' ')[1] || endDate.split('年')[0]), 5, 1);
  } else if (endDate.includes('Oct') || endDate.includes('10月')) {
    return new Date(parseInt(endDate.split(' ')[1] || endDate.split('年')[0]), 9, 1);
  } else if (endDate.includes('Dec') || endDate.includes('12月')) {
    return new Date(parseInt(endDate.split(' ')[1] || endDate.split('年')[0]), 11, 1);
  }
  
  // Default fallback
  return new Date(2025, 11, 31);
};

// Get color based on item type
const getItemColor = (type: 'education' | 'work' | 'project', isActive: boolean, itemId: string): string => {
  // Special case for HKUST-ISD
  if (itemId === 'hkust-ra') {
    return 'bg-emerald-600 hover:bg-emerald-500';
  }
  
  switch (type) {
    case 'education':
      return 'bg-blue-600 hover:bg-blue-500';
    case 'work':
      return 'bg-emerald-600 hover:bg-emerald-500';
    case 'project':
      return 'bg-amber-600 hover:bg-amber-500';
    default:
      return 'bg-gray-600 hover:bg-gray-500';
  }
};

// Get icon based on item type
const getItemIcon = (type: 'education' | 'work' | 'project', size: number = 12, itemId: string = ''): JSX.Element => {
  // Special case for HKUST-ISD
  if (itemId === 'hkust-ra') {
    return <FaBriefcase size={size} />;
  }
  
  switch (type) {
    case 'education':
      return <FaGraduationCap size={size} />;
    case 'work':
      return <FaBriefcase size={size} />;
    case 'project':
      return <FaLaptopCode size={size} />;
    default:
      return <FaInfoCircle size={size} />;
  }
};

export const GanttTimeline: React.FC<GanttTimelineProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();
  const isChinesePage = pathname === '/cn';
  
  // Convert 'work' type to 'project' for specific items
  const processedItems = useMemo(() => {
    return items.map(item => {
      // Check if this is a project item (F.I.R.S or Robot Arm)
      if (item.type === 'work' && (item.id === 'firs' || item.id === 'robot-arm')) {
        return { ...item, type: 'project' as const };
      }
      return item;
    });
  }, [items]);
  
  // Sort items by start date
  const sortedItems = [...processedItems].sort((a, b) => {
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });
  
  // Find earliest and latest dates
  const earliestDate = sortedItems.length > 0 
    ? parseDate(sortedItems[0].date) 
    : new Date(2020, 0, 1);
    
  const latestDate = sortedItems.length > 0 
    ? sortedItems.reduce((latest, item) => {
        const endDate = parseEndDate(item.date);
        return endDate > latest ? endDate : latest;
      }, new Date(2020, 0, 1))
    : new Date();
  
  // Add padding to the timeline (3 months on each side)
  const paddedEarliestDate = new Date(earliestDate);
  paddedEarliestDate.setMonth(paddedEarliestDate.getMonth() - 3);
  paddedEarliestDate.setFullYear(2020); // Force start at 2020
  
  const paddedLatestDate = new Date(latestDate);
  paddedLatestDate.setMonth(paddedLatestDate.getMonth() + 3);
  
  // Generate year markers with fixed spacing
  const yearMarkers = [];
  for (let year = 2020; year <= 2025; year++) {
    yearMarkers.push(year);
  }
  
  // Calculate total timeline duration in months
  const totalMonths = (paddedLatestDate.getFullYear() - paddedEarliestDate.getFullYear()) * 12 + 
                     (paddedLatestDate.getMonth() - paddedEarliestDate.getMonth());
  
  // Organize items into rows to avoid overlap
  const organizedRows: TimelineItem[][] = [];
  const usedPositions: { [key: string]: boolean } = {};
  
  sortedItems.forEach(item => {
    const startDate = parseDate(item.date);
    const endDate = parseEndDate(item.date);
    
    // Calculate position and width
    const startPosition = ((startDate.getTime() - paddedEarliestDate.getTime()) / 
                          (paddedLatestDate.getTime() - paddedEarliestDate.getTime())) * 100;
    const endPosition = ((endDate.getTime() - paddedEarliestDate.getTime()) / 
                        (paddedLatestDate.getTime() - paddedEarliestDate.getTime())) * 100;
    const width = endPosition - startPosition;
    
    // Find a row where this item doesn't overlap
    let rowIndex = 0;
    let foundRow = false;
    
    while (!foundRow) {
      if (!organizedRows[rowIndex]) {
        organizedRows[rowIndex] = [];
        foundRow = true;
      } else {
        // Check if this item overlaps with any existing item in this row
        const hasOverlap = organizedRows[rowIndex].some(existingItem => {
          const existingStart = parseDate(existingItem.date);
          const existingEnd = parseEndDate(existingItem.date);
          const existingStartPos = ((existingStart.getTime() - paddedEarliestDate.getTime()) / 
                                   (paddedLatestDate.getTime() - paddedEarliestDate.getTime())) * 100;
          const existingEndPos = ((existingEnd.getTime() - paddedEarliestDate.getTime()) / 
                                 (paddedLatestDate.getTime() - paddedEarliestDate.getTime())) * 100;
          
          return !(endPosition <= existingStartPos || startPosition >= existingEndPos);
        });
        
        if (!hasOverlap) {
          foundRow = true;
        } else {
          rowIndex++;
        }
      }
    }
    
    organizedRows[rowIndex].push(item);
  });
  
  return (
    <div className="w-full">
      <div className="relative">
        {/* Year markers */}
        <div className="flex justify-between mb-4 text-xs text-slate-400">
          {yearMarkers.map(year => (
            <div key={year} className="text-center">
              <div className="w-px h-2 bg-slate-600 mx-auto mb-1"></div>
              {year}
            </div>
          ))}
        </div>
        
        {/* Timeline items */}
        <div className="relative">
          {organizedRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative h-12 mb-3">
              {/* Row line */}
              <div className="absolute top-5 left-0 right-0 h-px bg-slate-700"></div>
              
              {row.map((item) => {
                const startDate = parseDate(item.date);
                const endDate = parseEndDate(item.date);
                
                // Calculate position and width
                const startPosition = ((startDate.getTime() - paddedEarliestDate.getTime()) / 
                                      (paddedLatestDate.getTime() - paddedEarliestDate.getTime())) * 100;
                const endPosition = ((endDate.getTime() - paddedEarliestDate.getTime()) / 
                                    (paddedLatestDate.getTime() - paddedEarliestDate.getTime())) * 100;
                const width = endPosition - startPosition;
                
                const isActive = activeItem === item.id;
                
                return (
                  <motion.div 
                    key={item.id}
                    className={`absolute h-10 rounded-md flex items-center px-3 cursor-pointer transition-all ${
                      getItemColor(item.type, isActive, item.id)
                    } ${isActive ? 'z-10 ring-2 ring-white/20' : ''}`}
                    style={{ 
                      left: `${Math.min(startPosition, 95)}%`,
                      width: `${Math.min(width, 100 - Math.min(startPosition, 95))}%`,
                      minWidth: '80px',
                      maxWidth: `${100 - Math.min(startPosition, 95)}%`
                    }}
                    onClick={() => setActiveItem(isActive ? null : item.id)}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-1 truncate">
                      <p className="text-xs font-medium text-white truncate">{item.title}</p>
                      <p className="text-xs text-slate-200 truncate">{item.organization}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Active item detail view */}
        {activeItem && (
          <motion.div 
            className="relative mt-2 bg-deepPurple/80 border border-white/[0.1] rounded-lg p-4 shadow-xl z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {sortedItems.filter(item => item.id === activeItem).map(item => (
              <div key={item.id}>
                <div className="flex items-start mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${getItemColor(item.type, false, item.id)}`}>
                    {getItemIcon(item.type, 16, item.id)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-300">{item.organization}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                  </div>
                  <button 
                    className="text-slate-400 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItem(null);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-slate-300 whitespace-pre-line">{item.description}</p>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Legend */}
        <div className="flex items-center justify-center mt-6 space-x-6 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-600 mr-2 flex items-center justify-center">
              <FaGraduationCap size={10} className="text-white" />
            </div>
            <span className="text-slate-300">{isChinesePage ? '教育' : 'Education'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-600 mr-2 flex items-center justify-center">
              <FaBriefcase size={10} className="text-white" />
            </div>
            <span className="text-slate-300">{isChinesePage ? '经验' : 'Work'}</span>
          </div>
          <div className="flex items-center">
            <FaInfoCircle size={14} className="text-slate-400 mr-2" />
            <span className="text-slate-300">{isChinesePage ? '点击查看详情' : 'Click for details'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 