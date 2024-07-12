import React, { useState } from "react";
import Plot from 'react-plotly.js'

function Euler() {
  //Polynomials with respect to t
  const [t, set_t] = useState({ A: 0, B: 0, C: 0, a: 0, b: 0, c: 0 });

  //Polynomials with respect to y
  const [y, set_y] = useState({ A: 0, B: 0, C: 0, a: 0, b: 0, c: 0 });

  //Exponential with respect to t
  const [exp, set_e] = useState({ A: 0, a: 0, B: 0, b: 0 })

  //Initial condition (t, y)
  const [init_t, set_t0] = useState(0);
  const [init_y, set_y0] = useState(0);

  //Step count for Euler method
  const [step, set_step] = useState(10);
  const [dest, set_dest] = useState(1);

  //x-axis table and y-axis table for plot
  const [x_axis, setX] = useState([]);
  const [y_axis, setY] = useState([]);
  const [y_res, setYR] = useState(0);

  // Setting polynomial functions for t
  function handle_tA(event) {
    set_t(e => ({ ...e, A: parseFloat(event.target.value) }));
  }

  function handle_ta(event) {
    set_t(e => ({ ...e, a: parseFloat(event.target.value) }));
  }
  function handle_tB(event) {
    set_t(e => ({ ...e, B: parseFloat(event.target.value) }));
  }

  function handle_tb(event) {
    set_t(e => ({ ...e, b: parseFloat(event.target.value) }));
  }
  function handle_tC(event) {
    set_t(e => ({ ...e, C: parseFloat(event.target.value) }));
  }
  function handle_tc(event) {
    set_t(e => ({ ...e, c: parseFloat(event.target.value) }));
  }

  // Setting polynomial functions for y
  function handle_yA(event) {
    set_y(e => ({ ...e, A: parseFloat(event.target.value) }));
  }

  function handle_ya(event) {
    set_y(e => ({ ...e, a: parseFloat(event.target.value) }));
  }
  function handle_yB(event) {
    set_y(e => ({ ...e, B: parseFloat(event.target.value) }));
  }

  function handle_yb(event) {
    set_y(e => ({ ...e, b: parseFloat(event.target.value) }));
  }
  function handle_yC(event) {
    set_y(e => ({ ...e, C: parseFloat(event.target.value) }));
  }
  function handle_yc(event) {
    set_y(e => ({ ...e, c: parseFloat(event.target.value) }));
  }

  // Setting exponentials with respect to t
  function handle_eA(event) {
    set_e(e => ({ ...e, A: parseFloat(event.target.value) }));
  }

  function handle_ea(event) {
    set_e(e => ({ ...e, a: parseFloat(event.target.value) }));
  }

  function handle_eB(event) {
    set_e(e => ({ ...e, B: parseFloat(event.target.value) }));
  }

  function handle_eb(event) {
    set_e(e => ({ ...e, b: parseFloat(event.target.value) }));
  }

  // Setting initial conditions for Euler method
  function handle_t0(event) {
    set_t0(parseFloat(event.target.value));
  }

  function handle_y0(event) {
    set_y0(parseFloat(event.target.value));
  }

  // Setting step count for Euler method
  function handle_step(event) {
    set_step(parseFloat(event.target.value));
  }

  // Setting final t-value for evaluation
  function handle_dest(event) {
    set_dest(parseFloat(event.target.value));
  }

  // Main function for calculating step points for the Euler method.
  function f(t_val, y_val) {
    return (t.A * Math.pow(t_val, t.a) + t.B * Math.pow(t_val, t.b) +
      t.C * Math.pow(t_val, t.C) + y.A * Math.pow(y_val, y.a) +
      y.B * Math.pow(y_val, t.a) + y.C * Math.pow(y_val, t.c) +
      exp.A * Math.exp(exp.a) + exp.B * Math.exp(exp.b));
  }

  function solve() {
    const h = (dest - init_t) / step;
    let temp_t = init_t;
    let temp_y = init_y;
    let t_table = [init_t];
    let y_table = [init_y];
    for (let i = 0; i < step; ++i) {
      temp_y += (h * f(temp_t, temp_y));
      temp_t += h;
      t_table.push(temp_t);
      y_table.push(temp_y);
    } setYR(temp_y);
    setX(t_table);
    setY(y_table);
  }


  // Setting React components and Plotly.plot
  return (
    <div className="wrapper">
      <div className="input">
        <h1> Euler Approximation to First Order ODE.</h1>
        <div>
          <p> Assign values for A, x, B, y, C, z as they appear in
            A.t<sup> x</sup> + B.t<sup> y</sup> + C.t<sup> z</sup>:</p>
          A: <input type="number" value={t.A} onChange={handle_tA} />
          x: <input type="number" value={t.a} onChange={handle_ta} />
          B: <input type="number" value={t.B} onChange={handle_tB} />
          y: <input type="number" value={t.b} onChange={handle_tb} />
          C: <input type="number" value={t.C} onChange={handle_tC} />
          z: <input type="number" value={t.c} onChange={handle_tc} />

          <p> Assign values for A, p, B, q, C, r as they appear in
            A.y<sup> p</sup> + B.y<sup> q</sup> + C.y<sup> r</sup>:</p>
          A: <input type="number" value={y.A} onChange={handle_yA} />
          p: <input type="number" value={y.a} onChange={handle_ya} />
          B: <input type="number" value={y.B} onChange={handle_yB} />
          q: <input type="number" value={y.b} onChange={handle_yb} />
          C: <input type="number" value={y.C} onChange={handle_yC} />
          r: <input type="number" value={y.c} onChange={handle_yc} />

          <p> Assign values for A, c, B, k as they appear in A.e<sup>ct</sup>
            + B.e<sup>kt</sup></p>
          A: <input type="number" value={exp.A} onChange={handle_eA} />
          c: <input type="number" value={exp.a} onChange={handle_ea} />
          B: <input type="number" value={exp.B} onChange={handle_eB} />
          k: <input type="number" value={exp.b} onChange={handle_eb} />

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

export default Euler