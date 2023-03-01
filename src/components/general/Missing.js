import { useNavigate } from "react-router-dom";

export const Missing = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
      <section>
        <br/>
        <h1>Missing</h1>
        <br/>
        <p>Resource is not found</p>
        <button className="btn btn-danger" onClick={goBack}>Go Back</button>
      </section>
  )
}