import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="w-full p-4">
        <Balance value={1000} />
        <Users />
      </div>
    </div>
  );
}

export {Dashboard};