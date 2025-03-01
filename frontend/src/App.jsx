import { Dashboard } from "./pages/dashboard"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import { SendMoney } from "./pages/SendMoney"

import{
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
        <h1>Hello world</h1>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
