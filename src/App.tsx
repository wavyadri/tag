import './styles/App.scss';
import UserProfile from './components/UserProfile';

// Let's pretend we're getting this from the route
// e.g. `get /users/:uuid`
const params = Object.freeze({
  uuid: '1111-2222-3333-4444',
});

const App = () => {
  return (
    <div className='wrapper'>
      <UserProfile uuid={params.uuid} />
    </div>
  );
};

export default App;
