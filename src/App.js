import EventPlaner from './components/event-planer.jsx';

import { firebaseApp, dataBase } from './firebase/firebase-init.js';
import { backServer } from './back-server/back-server-config.js';

function App() {
  return <EventPlaner firebaseApp={firebaseApp} dataBase={dataBase} backServer={backServer} />;
}

export default App;
