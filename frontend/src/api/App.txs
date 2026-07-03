import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequestsPage from './pages/RequestsPage';
import CreateRequestPage from './pages/CreateRequestPage';
import EditRequestPage from './pages/EditRequestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/requests" />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/requests/new" element={<CreateRequestPage />} />
        <Route path="/requests/:id/edit" element={<EditRequestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;