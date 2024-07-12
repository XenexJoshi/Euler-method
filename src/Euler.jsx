import React, { useState } from "react";
import Plot from 'react-plotly.js'

function Euler() {
  const [t, set_t] = useState({ A: 0, B: 0, C: 0, a: 0, b: 0, c: 0 });
  const [y, set_y] = useState({ A: 0, B: 0, C: 0, a: 0, b: 0, c: 0 });
  const [init_t, set_t0] = useState(0);
  const [init_y, set_y0] = useState(0);
  const [step, set_step] = useState(10);
  const [dest, set_dest] = useState(1);
  const [x_axis, setX] = useState([]);
  const [y_axis, setY] = useState([]);
  const [y_res, setYR] = useState(0);

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

  function handle_t0(event) {
    set_t0(parseFloat(event.target.value));
  }

  function handle_y0(event) {
    set_y0(parseFloat(event.target.value));
  }

  function handle_step(event) {
    set_step(parseFloat(event.target.value));
  }

  function handle_dest(event) {
    set_dest(parseFloat(event.target.value));
  }

  function solve() {
    const h = (dest - init_t) / step;
    let temp_t = init_t;
    let temp_y = init_y;
    let t_table = [init_t];
    let y_table = [init_y];
    for (let i = 0; i < step; ++i) {
      temp_y += (h * (t.A * Math.pow(temp_t, t.a) + t.B * Math.pow(temp_t, t.b) +
        t.C * Math.pow(temp_t, t.C) + y.A * Math.pow(temp_y, y.a) +
        y.B * Math.pow(temp_y, t.a) + y.C * Math.pow(temp_y, t.c)))
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

// Dsin kt + D sin ky + Ee ^ kt
export default Euler