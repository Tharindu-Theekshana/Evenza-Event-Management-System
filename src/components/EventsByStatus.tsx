import { useLocation } from "react-router-dom"

export default function EventsByStatus() {

    const location = useLocation();
    const status = location.state?.status;

  return (
    <div>
      
    </div>
  )
}
