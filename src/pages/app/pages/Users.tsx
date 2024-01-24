import { toast } from "react-toastify";

export default function Users() {
  const notify = () => toast("Wow so easy!");
  return (
    <div>
      <button onClick={notify}>Notify!</button>
    </div>
  );
}
