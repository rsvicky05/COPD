// src/Components/Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            Lung Sound Disease Prediction
          </span>
          <span className="badge bg-danger">
            Demo · Not for Diagnosis
          </span>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow-1 py-4 bg-light">
        <div className="container-fluid px-4">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-2 small">
        Built for educational purposes only.
      </footer>
    </div>
  );
}
