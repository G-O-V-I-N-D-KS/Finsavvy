import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "../styles/Dcards.css";

const Dcards = () => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("govind");
  const [date, SetDate] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");

  return (
    <>
      {/* <div className="rccs__card backcolor"> */}

      <div className="rccs__card rccs__card--unknown">
        <Cards
          number={number}
          name={name}
          expiry={date}
          cvc={cvc}
          focused={focus}
        />
      </div>

      <br />
      
    </>
  );
};
export default Dcards;
