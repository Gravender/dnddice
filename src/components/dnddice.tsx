import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  diceRoll: any[];
  setDiceRoll: any;
  updateDice: any;
}

const DiceRoller: React.FC<Props> = (props) => {
  // State variables to store the data for the graph, the maximum dc, and the attack bonuses for the two players
  const { diceRoll, setDiceRoll, updateDice } = props;
  const [name, setName] = useState<string>("");
  const [dc, setDc] = useState<number>(20);
  const [ac1, setAc1] = useState<number>(8);
  const [dm1, setDm1] = useState<number>(8);
  const [dmPlus1, setDmPlus1] = useState<number>(3);

  const hit = (dc: number, ac: number): boolean => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    return d20 + ac > dc;
  };

  const damage = (d: number, plus = 0): number => {
    return Math.floor(Math.random() * d) + 1 + plus;
  };

  const simulate = (dc: number, x: number) => {
    let range = Array.from(Array(dc + 1).keys());
    let newData1 = [];
    for (let i = 1; i <= dc; i++) {
      let sumOP1 = 0;
      for (let j = 0; j < x; j++) {
        if (hit(i, ac1)) {
          sumOP1 += damage(dm1, dmPlus1);
        }
      }
      newData1[i] = sumOP1 / x;
    }
    range.shift();
    newData1.shift();
    updateDice({ name: name, x: range, y: newData1 });
    updateDiceRolls();
  };
  useEffect(() => {
    setDc(20);
  }, []);
  useEffect(() => {
    let tempData = diceRoll;
    const indexItem = diceRoll.findIndex((e: any) => e.name === name);
    if (indexItem > -1) {
      const dice = tempData[indexItem];
      setDc(dice.dc);
      setAc1(dice.ac);
      setDm1(dice.dm);
      setDmPlus1(dice.dmPlus);
    }
  }, [name, diceRoll]);
  const updateDiceRolls = () => {
    let tempData = diceRoll;
    const indexItem = diceRoll.findIndex((e: any) => e.name === name);
    if (indexItem > -1) {
      tempData.splice(indexItem, 1);
    }
    setDiceRoll([
      ...tempData,
      {
        dc: dc,
        ac: ac1,
        dm: dm1,
        dmPlus: dmPlus1,
        name: name,
      },
    ]);
  };
  return (
    <div>
      <Form>
        <Row className="mb-3">
          <Col className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(String(e.target.value))}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Hit/DC: {ac1}</Form.Label>
              <Form.Control
                type="range"
                className="form-range"
                value={ac1}
                onChange={(e) => setAc1(Number(e.target.value))}
                min="0"
                max="20"
              />
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Damage: {dm1}</Form.Label>
              <Form.Control
                type="range"
                className="form-range"
                value={dm1}
                onChange={(e) => setDm1(Number(e.target.value))}
                min="0"
                max="20"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Damage Bonus: {dmPlus1}</Form.Label>
              <Form.Control
                type="range"
                className="form-range"
                value={dmPlus1}
                onChange={(e) => setDmPlus1(Number(e.target.value))}
                min="0"
                max="20"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Button onClick={() => simulate(dc, 100000)}>Simulate</Button>
    </div>
  );
};

export default DiceRoller;
