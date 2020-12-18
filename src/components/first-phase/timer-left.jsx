import { useState, useEffect } from 'react';
import { dataBase } from '../../firebase/firebase-init';

const TimerLeft = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    dataBase.ref('event/config/firstPhaseTimeLeft').on('value', (snapshot) => {
      let timeLeftNow = snapshot.val();
      setTimeLeft(timeLeftNow / 60000);
    });
  });

  return (
    <div className="indicator-name">
      Оставшееся время: <span className="indicator">{timeLeft} мин.</span>
    </div>
  );
};

export default TimerLeft;
