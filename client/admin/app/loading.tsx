export default function LoadingSkeleton() {
  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      className="position-absolute d-flex justify-content-center align-items-center top-0 start-0 end-0 bottom-0"
    >
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
