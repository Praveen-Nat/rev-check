import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="main-card">
      <textarea className="editor-area" spellCheck="false" onChange={(e)=> {
        console.log(e.target.value);
      } } />
      </div>
    </div>
  );
}

export default App;
