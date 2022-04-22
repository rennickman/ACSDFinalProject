import React from "react";
import { Container } from "react-bootstrap";

const CurrentGameWeek = (props) => {
  const { home, away, time } = props;
  return(
    <Container>
      <div>
        <span>
          {time} - {home} vs {away}
        </span>
      </div>
    </Container>
  )
}
export default CurrentGameWeek;