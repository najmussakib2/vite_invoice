import InvoiceForm from "./components/InvoiceForm";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Provider store={store}>
        <div className="mx-auto max-w-7xl">
          <InvoiceForm />
        </div>
      </Provider>
    </div>
  );
}

export default App;
