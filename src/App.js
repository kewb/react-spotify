import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import Dashboard from "./Dashboard";


const fragment = window.location.hash; // Get the fragment part of the URL
const urlSearchParams = new URLSearchParams(fragment.slice(1)); // Remove the '#' character
const code = new URLSearchParams(window.location.search).get("code")
// const code = urlSearchParams.get('code');

console.log(code)
function App() {
  return code ? <Dashboard code={code}/> : <Login/>
}

export default App;
