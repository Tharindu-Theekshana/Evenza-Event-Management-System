import React from "react";
import { useParams } from "react-router-dom"

 const EachEvent = () => {
    const {id} = useParams();

    return(
        <div>
            this is a event and id is {id}
        </div>
    )
}

export default EachEvent;