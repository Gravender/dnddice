import React, { useState } from "react";
import Plot from "react-plotly.js";
import DiceRoller from "./dnddice";

interface Props {
  // Props go here
}

const DiceViewer: React.FC<Props> = (props) => {
  // State variables to store the data for the graph, the maximum dc, and the attack bonuses for the two players
  const [data, setData] = useState<any>([]);
  const [diceRoll, setDiceRoll] = useState<any>([]);
  const updateDice = (dice: { name: any; x: any; y: any }) => {
    let tempData = data;
    const indexItem = data.findIndex((e: any) => e.name === dice.name);
    if (indexItem > -1) {
      tempData.splice(indexItem, 1);
    }
    setData([
      ...tempData,
      {
        x: [...dice.x],
        y: [...dice.y],
        type: "scatter",
        name: dice.name,
      },
    ]);
  };
  return (
    <div>
      <Plot
        data={data}
        layout={{
          title: "Average Damage Dealt",
          xaxis: {
            title: "Difficulty Class (DC)",
          },
          yaxis: {
            title: "Average Damage Dealt",
          },
          width: 1000,

          height: 600,
        }}
      />
      <DiceRoller
        diceRoll={diceRoll}
        setDiceRoll={setDiceRoll}
        updateDice={updateDice}
      ></DiceRoller>
    </div>
  );
};

export default DiceViewer;
