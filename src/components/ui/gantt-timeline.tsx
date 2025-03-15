'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaLaptopCode, FaInfoCircle } from 'react-icons/fa';

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

// Parse date string to get start date as Date object
const parseDate = (dateStr: string): Date => {
  try {
    // Extract start date part (before the dash)
    const startDateStr = dateStr.split(' - ')[0].trim();
    
    // Map month abbreviations to month numbers
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Sept': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    // Extract month and year
    const parts = startDateStr.split(' ');
    if (parts.length < 2) return new Date(); // Fallback
    
    const month = parts[0];
    const year = parseInt(parts[1]);
    
    if (isNaN(year)) return new Date(); // Fallback if year is not a number
    
    // Create date at the exact start of the month
    return new Date(year, monthMap[month] || 0, 1);
  } catch (error) {
    console.error("Error parsing date:", dateStr, error);
    return new Date(); // Fallback to current date on error
  }
};

// Parse end date from date string
const parseEndDate = (dateStr: string): Date => {
  try {
    // Check if date contains "Now"
    if (dateStr.includes('Now')) {
      return new Date(); // Return current date
    }
    
    const parts = dateStr.split(' - ');
    if (parts.length < 2) {
      // If no end date specified, use start date plus one month
      const startDate = parseDate(dateStr);
      return new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Last day of the month
    }
    
    const endDateStr = parts[1].trim();
    
    // Map month abbreviations to month numbers
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Sept': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    // Extract month and year
    const endParts = endDateStr.split(' ');
    if (endParts.length < 2) return new Date(); // Fallback
    
    const month = endParts[0];
    const year = parseInt(endParts[1]);
    
    if (isNaN(year)) return new Date(); // Fallback if year is not a number
    
    // Set to last day of the month
    const endDate = new Date(year, monthMap[month] || 0, 1);
    return new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
  } catch (error) {
    console.error("Error parsing end date:", dateStr, error);
    return new Date(); // Fallback to current date on error
  }
};

// Get color based on item type
const getItemColor = (type: 'education' | 'work' | 'project', isActive: boolean, itemId: string): string => {
  if (isActive) return 'bg-[#005ab4]';
  
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

  // Group items by type, with special handling for HKUST-ISD
  const { educationItems, workItems, projectItems } = useMemo(() => {
    const education = sortedItems.filter(item => item.type === 'education');
    // Move HKUST-ISD to work items regardless of its type
    const work = sortedItems.filter(item => item.type === 'work' || item.id === 'hkust-ra');
    const project = sortedItems.filter(item => item.type === 'project');
    return { educationItems: education, workItems: work, projectItems: project };
  }, [sortedItems]);

  // Organize items into rows by type, keeping each type in separate rows
  const organizedRows = useMemo(() => {
    const rows: TimelineItem[][] = [];
    
    // Helper function to check if an item overlaps with any item in a row
    const overlapsWithRow = (item: TimelineItem, row: TimelineItem[]): boolean => {
      const itemStart = parseDate(item.date).getTime();
      const itemEnd = parseEndDate(item.date).getTime();
      
      return row.some(rowItem => {
        const rowItemStart = parseDate(rowItem.date).getTime();
        const rowItemEnd = parseEndDate(rowItem.date).getTime();
        
        // Check for overlap
        return (itemStart <= rowItemEnd && itemEnd >= rowItemStart);
      });
    };
    
    // Place items of a specific type in rows
    const placeItemsByType = (items: TimelineItem[]) => {
      if (items.length === 0) return;
      
      // Start a new section of rows for this type
      const typeRows: TimelineItem[][] = [];
      
      items.forEach(item => {
        // Find a row where this item doesn't overlap with existing items
        let placed = false;
        for (let i = 0; i < typeRows.length; i++) {
          if (!overlapsWithRow(item, typeRows[i])) {
            typeRows[i].push(item);
            placed = true;
            break;
          }
        }
        
        // If not placed in any existing row, create a new row
        if (!placed) {
          typeRows.push([item]);
        }
      });
      
      // Add all rows for this type to the main rows array
      rows.push(...typeRows);
    };
    
    // Place items in order by type, with each type in its own section
    placeItemsByType(educationItems);
    placeItemsByType(workItems);
    placeItemsByType(projectItems);
    
    return rows;
  }, [educationItems, workItems, projectItems]);
  
  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="min-width-content" style={{ minWidth: '800px' }}>
        {/* Year markers */}
        <div className="relative h-8 mb-2">
          {yearMarkers.map((year, index) => {
            // Calculate position with fixed spacing
            const position = (index * 20); // Each year takes 20% of the width
            return (
              <div 
                key={year}
                className="absolute h-full flex items-center justify-center text-xs text-slate-300"
                style={{ 
                  left: `${position}%`, 
                  width: '20%',
                  textAlign: 'center'
                }}
              >
                <span className="font-medium">{year}</span>
              </div>
            );
          })}
        </div>
        
        {/* Gantt chart */}
        <div className="relative">
          {/* Timeline grid */}
          <div className="absolute inset-0">
            {yearMarkers.map((year, index) => {
              const position = (index * 20); // Each year takes 20% of the width
              return (
                <div 
                  key={year}
                  className="absolute h-full border-l border-slate-800/20"
                  style={{ left: `${position}%` }}
                ></div>
              );
            })}
            {/* Add an extra grid line for the end of 2025 */}
            <div 
              className="absolute h-full border-l border-slate-800/20"
              style={{ left: '100%' }}
            ></div>
          </div>
          
          {/* Timeline items organized in rows */}
          <div className="relative pb-4">
            {organizedRows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative h-12 mb-3">
                {row.map((item) => {
                  const startDate = parseDate(item.date);
                  const endDate = parseEndDate(item.date);
                  
                  // Calculate position based on years and months since 2020
                  const startYear = startDate.getFullYear();
                  const startMonth = startDate.getMonth();
                  const yearsSince2020 = startYear - 2020;
                  const monthsSince2020Start = yearsSince2020 * 12 + startMonth;
                  
                  const endYear = endDate.getFullYear();
                  const endMonth = endDate.getMonth();
                  const monthsUntilEnd = (endYear - 2020) * 12 + endMonth;
                  
                  // Each year is 20% of the width, each month is 20/12 = 1.667% of the width
                  const startPosition = (monthsSince2020Start / 60) * 100; // 60 months in 5 years
                  const endPosition = (monthsUntilEnd / 60) * 100;
                  
                  const width = Math.max(endPosition - startPosition, 3); // Minimum width for visibility
                  
                  const isActive = activeItem === item.id;
                  
                  return (
                    <motion.div 
                      key={item.id}
                      className={`absolute h-10 rounded-md flex items-center px-3 cursor-pointer transition-all ${
                        getItemColor(item.type, isActive, item.id)
                      } ${isActive ? 'z-10 shadow-lg' : ''}`}
                      style={{ 
                        left: `${startPosition}%`, 
                        width: `${width}%`,
                        minWidth: '100px',
                        maxWidth: '95%' // Prevent overflow
                      }}
                      onClick={() => setActiveItem(isActive ? null : item.id)}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-white/20`}>
                        {getItemIcon(item.type, 12, item.id)}
                      </div>
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
            <span className="text-slate-300">Education</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-600 mr-2 flex items-center justify-center">
              <FaBriefcase size={10} className="text-white" />
            </div>
            <span className="text-slate-300">Work</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-amber-600 mr-2 flex items-center justify-center">
              <FaLaptopCode size={10} className="text-white" />
            </div>
            <span className="text-slate-300">Project</span>
          </div>
          <div className="flex items-center">
            <FaInfoCircle size={14} className="text-slate-400 mr-2" />
            <span className="text-slate-300">Click on a bar for details</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 