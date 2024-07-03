import React, { useEffect, useState } from 'react';

const FooterComponent = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentYear(now.getFullYear());
            setCurrentHour(now.getHours());
            setCurrentDate(now.toLocaleDateString());
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000 * 60); // Update every minute

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <footer className='footer'>
                <span>
                    SACHACK MFI | All Rights Reserved &copy; {currentYear} | Current Hour: {currentHour} | Current Date: {currentDate}
                </span>
            </footer>
        </div>
    );
}

export default FooterComponent;
