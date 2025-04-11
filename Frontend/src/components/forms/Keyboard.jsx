import { useEffect,useContext } from "react";
import KioskBoard from "kioskboard";

import { refKeyboardContext } from "../../contexts/RefsProvider";

export default function App() {
  const {user,password} = useContext(refKeyboardContext);

  useEffect(() => {
    if (user.current && password.current) {
      KioskBoard.run(user.current && password.current, {
        language: "en",
        theme: "light",
        keysArrayOfObjects: [
          {
            "0": "Q",
            "1": "W",
            "2": "E",
            "3": "R",
            "4": "T",
            "5": "Y",
            "6": "U",
            "7": "I",
            "8": "O",
            "9": "P"
          },
          {
            "0": "A",
            "1": "S",
            "2": "D",
            "3": "F",
            "4": "G",
            "5": "H",
            "6": "J",
            "7": "K",
            "8": "L"
          },
          {
            "0": "Z",
            "1": "X",
            "2": "C",
            "3": "V",
            "4": "B",
            "5": "N",
            "6": "M"
          }
        ]
      });
    }
  }, [user,password]);

  return (
    <></>
  );
}