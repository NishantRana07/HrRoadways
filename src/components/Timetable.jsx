import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar,
  Filter,
  Search,
  Bus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

const WeeklyTimetable = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [selectedBusType, setSelectedBusType] = useState('all');
  const [hoveredSlot, setHoveredSlot] = useState(null);
    const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentWeek);
    day.setDate(day.getDate() - day.getDay() + i);
    return day;
  });

  const scheduleData = {
    'Monday-06:00': { 
      status: 'occupied',
      route: 'Delhi-Chandigarh',
      type: 'Volvo',
      busId: 'HR-01-1234'
    },
    'Wednesday-08:00': {
      status: 'occupied',
      route: 'Gurgaon-Rohtak',
      type: 'Regular',
      busId: 'HR-02-5678'
    },
    'Wednesday-10:00': {
      status: 'occupied',
      route: 'Gurgaon-Faridabad',
      type: 'Regular',
      busId: 'HR-02-5679'
    },
    'Friday-08:00': {
      status: 'occupied',
      route: 'Hisar-Rohtak',
      type: 'Regular',
      busId: 'HR-02-5678'
    },
  };

  const getSlotStatus = (day, time) => {
    const key = `${day}-${time}`;
    return scheduleData[key] || { status: 'free' };
  };

  const getFormattedDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Weekly Bus Schedule
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive timetable showing all bus schedules and availability
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-600" />
                <span className="font-semibold">
                  {getFormattedDate(weekDays[0])} - {getFormattedDate(weekDays[6])}
                </span>
              </div>
              <button
                onClick={() => navigateWeek(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
              >
                <option value="all">All Routes</option>
                <option value="Delhi-Chandigarh">Delhi - Chandigarh</option>
                <option value="Gurgaon-Rohtak">Gurgaon - Rohtak</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedBusType}
                onChange={(e) => setSelectedBusType(e.target.value)}
              >
                <option value="all">All Bus Types</option>
                <option value="Volvo">Volvo</option>
                <option value="Regular">Regular</option>
              </select>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setCurrentWeek(new Date())}
              >
                <RefreshCw size={20} />
                Today
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 border-b border-r border-gray-200 min-w-[100px]">
                    Time
                  </th>
                  {weekDays.map((day, index) => (
                    <th key={index} className="p-4 border-b border-r border-gray-200 min-w-[180px]">
                      <div className="font-semibold">
                        {new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getFormattedDate(day)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, timeIndex) => (
                  <tr key={time} className={timeIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-4 border-b border-r border-gray-200 font-medium">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        {time}
                      </div>
                    </td>
                    {weekDays.map((day, dayIndex) => {
                      const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day);
                      const slot = getSlotStatus(dayName, time);
                      const isHovered = hoveredSlot === `${dayName}-${time}`;
                      
                      return (
                        <td 
                          key={`${dayName}-${time}`}
                          className={`p-4 border-b border-r border-gray-200 transition-all duration-200
                            ${slot.status === 'occupied' ? 'bg-blue-50' : ''}
                            ${isHovered ? 'bg-blue-100' : ''}`}
                          onMouseEnter={() => setHoveredSlot(`${dayName}-${time}`)}
                          onMouseLeave={() => setHoveredSlot(null)}
                        >
                          {slot.status === 'occupied' ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <Bus size={16} className="text-blue-600" />
                                <span className="font-medium text-blue-600">{slot.route}</span>
                              </div>
                              <div className="text-sm text-gray-500">
                                {slot.type} • {slot.busId}
                              </div>
                            </div>
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              Available
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-4 flex gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
            <span>Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimetable;