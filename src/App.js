import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./App.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [NumFact, setNumFact] = useState(
    "Choose a gamemode!"
  );
  const [Tries, setTries] = useState(0);
  const [Points, setPoints] = useState(0);
  const [userInput, setuserInput] = useState(0);
  const [NumToOmitt, setNumToOmitt] = useState(0);
  const [colorChange, setcolorChange] = useState("white");
  const [LcolorChange, setLcolorChange] = useState("white");
  const [display, setdisplay] = useState("");
  const [prevanswer, setprevanswer] = useState()
  let startnum = 0;
  let endnum =100;
  let play = "";

  function fetchNum() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://numbersapi.com/random/" +play +"?min="+startnum+"&max="+endnum,requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(play)
        let woNum = result.split(" ");
        setNumToOmitt(Number(woNum[0]));
        woNum = result.replace(woNum[0], "What");
        setNumFact(woNum);
        if(play == "year"){
          startnum = 2000
          endnum = 2024
        }
        else{
          startnum = 0;
          endnum = 100;
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
        <Toolbar className="OnTop"
        >
          <div className="Gamemodeselect">
            <Typography
            fontFamily={"monospace"}
            fontWeight={900}
            color={"black"}
            padding-bottom={"20px"}
            >What game would you like to play?</Typography>
            <FormControl 
            fullWidth>
              <InputLabel id="demo-simple-select-label">Gamemode</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={display}
                label="Gamemode"
                onChange={(event) => {
                  setdisplay(event.target.value)
                  play = (event.target.value);
                  console.log("play", play)
                  if(play == "year"){
                    startnum = 2000
                    endnum = 2024
                  }
                  else{
                    startnum = 0;
                    endnum = 100;
                  }
                  setLcolorChange("white");
                  setcolorChange("white");
                  setTries(3);
                  setPoints(0);
                  fetchNum();
                }}
              >
                <MenuItem value={"trivia"}>General trivia (0 - 100) </MenuItem>
                <MenuItem value={"year"}>Year trivia (2000 - 2024)</MenuItem>
                <MenuItem value={"math"}>Math trivia (0 - 100)</MenuItem>
              </Select>
            </FormControl>
          </div>

        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography
          className="Title"
          fontWeight={900}
          textTransform={"uppercase"}
          fontSize={90}
          variant="h2"
          align="center"
          color={"#1f145e"}
          sx={{ py: 2 }}
        >
          Number Trivia
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id="subtitle"
        >
          {NumFact}
        </Typography>
        <Button 
          onClick={() => {
            play = display
            if(play == "year"){
              startnum = 2000
              endnum = 2024
            }
            else{
              startnum = 0;
              endnum = 100;
            }
            fetchNum();
            setTries(3);
          }}
        >
          {" "}
          Get a new question
        </Button>
        <div className="TextonTop">
          <Typography variant="h6" align="left" fontFamily={"monospace"}>
            Tries left: {Tries}
          </Typography>
          <Typography variant="h6" align="right" fontFamily={"monospace"}>
            Points: {Points}
          </Typography>
        </div>
        <div className="AnswerLocation">
          <TextField
            id="outlined-controlled"
            type="Number"
            size="small"
            InputProps={{ inputProps: { min: startnum, max: endnum} }}
            userInput={userInput}
            onChange={(event) => {
              setuserInput(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              play = display
              if(play == "year"){
                startnum = 2000
                endnum = 2024
              }
              else{
                startnum = 0;
                endnum = 100;
              }
              console.log("answer", NumToOmitt);
              console.log("user input: ", userInput);
              if (userInput == NumToOmitt) {
                console.log("you got the question right");
                setprevanswer(NumToOmitt)
                setPoints(Points + Tries);
                fetchNum();
                setTries(3);
                setcolorChange("white");
                setLcolorChange("white")
              } else {
                console.log("next",play)
                if (Tries != 0) {
                  setTries(Tries - 1);
                  if (userInput < NumToOmitt) {
                    setcolorChange("red");
                    setLcolorChange("white");
                  }
                  if (userInput > NumToOmitt) {
                    setcolorChange("white");
                    setLcolorChange("red");
                  }
                }
                if (Tries == 1) {
                  setprevanswer(NumToOmitt);
                  console.log("prev answer",prevanswer)
                  fetchNum();
                  setTries(3);
                  setLcolorChange("white");
                  setcolorChange("white");
                }
              }
            }}
          >
            Submit
          </Button>
        </div>
        <Typography variant="h5" color={colorChange}>
          Higher!
        </Typography>
        <Typography variant="h5" color={LcolorChange}>
          Lower!
        </Typography>
        <Typography
        >
          The answer was: {prevanswer}
        </Typography>
      </Container>
    </div>
  );
}

export default App;
