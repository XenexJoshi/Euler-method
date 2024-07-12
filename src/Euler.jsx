import React, { useState } from "react";
import Plot from 'react-plotly.js'

function Euler() {
  const [t, set_t] = useState(0);
  const [y, set_y] = useState(0);
  const [init_t, set_t0] = useState(0);
  const [init_y, set_y0] = useState(0);
  const [step, set_step] = useState(10);
  const [dest, set_dest] = useState(1);
  const [x_axis, setX] = useState([]);
  const [y_axis, setY] = useState([]);
  const [y_res, setYR] = useState(0);

  function handle_t(event) {
    set_t(parseInt(event.target.value));
  }

  function handle_y(event) {
    set_y(parseInt(event.target.value));
  }

  function handle_t0(event) {
    set_t0(parseInt(event.target.value));
  }

  function handle_y0(event) {
    set_y0(parseInt(event.target.value));
  }

  function handle_step(event) {
    set_step(parseInt(event.target.value));
  }

  function handle_dest(event) {
    set_dest(parseInt(event.target.value));
  }

  function solve() {
    const h = (dest - init_t) / step;
    let temp_t = init_t;
    let temp_y = init_y;
    let t_table = [init_t];
    let y_table = [init_y];
    for (let i = 0; i < step; ++i) {
      temp_y += h * (y * temp_y + t * temp_t);
      temp_t += h;
      t_table.push(temp_t);
      y_table.push(temp_y);
    } setYR(temp_y);
    setX(t_table);
    setY(y_table);
  }

  return (
    <div className="wrapper">
      <div className="input">
        <h1> Euler Approximation to First Order ODE.</h1>
        <div>
          <p> Enter the coefficient of t:</p>
          <input type="number" value={t} onChange={handle_t} />
          <p> Enter the coefficient of y:</p>
          <input type="number" value={y} onChange={handle_y} />
          <p> Enter the starting coordinate (t, y):</p>
          <input type="number" value={init_t} onChange={handle_t0} />
          <input type="number" value={init_y} onChange={handle_y0} />
          <p> Enter step count (Default set to 10): </p>
          <input type="number" value={step} onChange={handle_step} />
          <p> Enter final t value to compute:</p>
          <input type="number" value={dest} onChange={handle_dest} />
          <button className="compute" onClick={solve}> Solve </button>
        </div>

        <div className="result">
          <p className="res"> The Euler approximation for t = {dest} is ({dest}, {y_res}).</p>
        </div>
      </div>

      <div className="plot">
        <Plot data={[
          {
            x: x_axis,
            y: y_axis,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          }
        ]}
          layout={{
            width: 600, height: 600, title: 'Euler Approximation of y(t)',
            font: "Times New Roman"
          }}
        />
      </div>
    </div>

  )
}

// A1 tx + A2 tx + B1 yx + B2 yx + C + Dsin kt + D sin ky + Ee ^ kt
export default Euler