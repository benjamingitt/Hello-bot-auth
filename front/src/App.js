import './App.css';

function App() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let name = params.get('name');
  console.log(name);
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Hello, {name} </h1>
      </header>
    </div>
  );
}

export default App;
