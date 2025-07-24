// import React, { useState, useEffect } from 'react';
// import '../styles.css';

// const TimeElapsed = () => {
//   const [time, setTime] = useState(0); // Time in seconds

//   useEffect(() => {
//     // Update the timer every second
//     const interval = setInterval(() => {
//       setTime((prevTime) => prevTime + 1);
//     }, 1000);

//     // Clear the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   // Convert seconds to hours, minutes, and seconds
//   const hours = Math.floor(time / 3600);
//   const minutes = Math.floor((time % 3600) / 60);
//   const seconds = time % 60;

//   // Format the time
//   const formattedTime = `${hours}h : ${minutes}m : ${seconds}s`;

//   return <div className='time-elapsed'>{formattedTime}</div>;
// };

// export default TimeElapsed;

import React, { useState, useEffect } from 'react';

const TimeElapsed = () => {
  const [time, setTime] = useState(() => {
    // Get the time from localStorage if it exists
    const savedTime = localStorage.getItem('elapsedTime');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  useEffect(() => {
    // Set an interval to update the time every second
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        // Save the updated time to localStorage
        localStorage.setItem('elapsedTime', newTime);
        return newTime;
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // Format the time
  const formattedTime = `${hours}h : ${minutes}m : ${seconds}s`;

  return <div className='time-elapsed'>{formattedTime}</div>;
};

export default TimeElapsed;
