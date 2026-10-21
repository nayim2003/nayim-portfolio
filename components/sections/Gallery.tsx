'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Gallery() {
  const radialRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!radialRef.current) return;
    radialRef.current.innerHTML = '';
    const width = 400, height = 350;
    const data = [
      { name: 'Python', value: 92 }, { name: 'SQL', value: 85 }, { name: 'Stats', value: 90 },
      { name: 'ML', value: 88 }, { name: 'DL/NLP', value: 78 }, { name: 'Viz', value: 82 }, { name: 'MLOps', value: 72 },
    ];
    const svg = d3.select(radialRef.current).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');
    const g = svg.append('g').attr('transform', `translate(${width/2},${height/2})`);
    const step = (Math.PI * 2) / data.length;
    const maxR = 130, inner = 30;
    data.forEach((d, i) => {
      const a0 = i * step, a1 = (i + 1) * step - 0.05;
      const r = inner + (d.value / 100) * (maxR - inner);
      g.append('path')
        .attr('d', d3.arc().innerRadius(inner).outerRadius(r).startAngle(a0).endAngle(a1)()!)
        .attr('fill', '#4fd1c5').attr('opacity', 0.85);
      const angle = (a0 + a1) / 2;
      g.append('text').attr('x', Math.sin(angle) * (maxR + 18)).attr('y', -Math.cos(angle) * (maxR + 18))
        .attr('text-anchor', 'middle').attr('fill', '#8a97ad').attr('font-size', 11).text(d.name);
    });
  }, []);

  useEffect(() => {
    if (!barsRef.current) return;
    barsRef.current.innerHTML = '';
    const width = 400, height = 300;
    const data = [
      { name: 'Python', value: 8 }, { name: 'SQL', value: 6 }, { name: 'Scikit-learn', value: 6 },
      { name: 'XGBoost', value: 5 }, { name: 'Power BI', value: 3 }, { name: 'Streamlit', value: 4 },
    ].sort((a, b) => b.value - a.value);
    const svg = d3.select(barsRef.current).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');
    const x = d3.scaleLinear().domain([0, 9]).range([100, width - 30]);
    const y = d3.scaleBand().domain(data.map(d => d.name)).range([20, height - 20]).padding(0.25);
    data.forEach(d => {
      svg.append('rect').attr('x', 100).attr('y', y(d.name)).attr('width', x(d.value) - 100).attr('height', y.bandwidth()).attr('fill', '#4fd1c5').attr('rx', 4);
      svg.append('text').attr('x', 95).attr('y', y(d.name)! + y.bandwidth() / 2).attr('text-anchor', 'end').attr('dominant-baseline', 'middle').attr('fill', '#8a97ad').attr('font-size', 10).text(d.name);
      svg.append('text').attr('x', x(d.value) + 6).attr('y', y(d.name)! + y.bandwidth() / 2).attr('dominant-baseline', 'middle').attr('fill', '#e8eef9').attr('font-size', 10).text(d.value);
    });
  }, []);

  useEffect(() => {
    if (!areaRef.current) return;
    areaRef.current.innerHTML = '';
    const width = 400, height = 260;
    const data = [
      { month: 'Jan', v: 1 }, { month: 'Feb', v: 2 }, { month: 'Mar', v: 2 }, { month: 'Apr', v: 3 },
      { month: 'May', v: 4 }, { month: 'Jun', v: 5 }, { month: 'Jul', v: 6 }, { month: 'Aug', v: 8 },
      { month: 'Sep', v: 10 }, { month: 'Oct', v: 11 }, { month: 'Nov', v: 13 }, { month: 'Dec', v: 14 },
    ];
    const svg = d3.select(areaRef.current).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');
    const m = { top: 16, right: 20, bottom: 32, left: 32 };
    const x = d3.scalePoint().domain(data.map(d => d.month)).range([m.left, width - m.right]);
    const y = d3.scaleLinear().domain([0, 15]).range([height - m.bottom, m.top]);
    svg.append('defs').append('linearGradient').attr('id', 'areaG').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', 1)
      .call(g => { g.append('stop').attr('offset', '0%').attr('stop-color', '#4fd1c5').attr('stop-opacity', 0.45); g.append('stop').attr('offset', '100%').attr('stop-color', '#4fd1c5').attr('stop-opacity', 0); });
    svg.append('path').datum(data)
      .attr('d', d3.area<any>().x(d => x(d.month)!).y0(height - m.bottom).y1(d => y(d.v)).curve(d3.curveMonotoneX) as any)
      .attr('fill', 'url(#areaG)');
    svg.append('path').datum(data)
      .attr('d', d3.line<any>().x(d => x(d.month)!).y(d => y(d.v)).curve(d3.curveMonotoneX) as any)
      .attr('fill', 'none').attr('stroke', '#4fd1c5').attr('stroke-width', 2.5);
    data.forEach((d, i) => {
      if (i % 2 !== 0 && i !== data.length - 1) return;
      svg.append('text').attr('x', x(d.month)!).attr('y', height - 8).attr('text-anchor', 'middle').attr('fill', '#8a97ad').attr('font-size', 9).text(d.month);
    });
  }, []);

  useEffect(() => {
    if (!scatterRef.current) return;
    scatterRef.current.innerHTML = '';
    const width = 400, height = 300;
    const data = [
      { name: 'TraceVision', x: 9, y: 9 }, { name: 'Churn', x: 6, y: 8 }, { name: 'House', x: 5, y: 7 },
      { name: 'Segmentation', x: 4, y: 6 }, { name: 'Fraud', x: 8, y: 9 }, { name: 'Banking', x: 8, y: 8 },
      { name: 'FinGuard', x: 9, y: 10 }, { name: 'Retail', x: 7, y: 7 },
    ];
    const svg = d3.select(scatterRef.current).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');
    const m = { top: 20, right: 20, bottom: 40, left: 40 };
    const x = d3.scaleLinear().domain([0, 10]).range([m.left, width - m.right]);
    const y = d3.scaleLinear().domain([0, 11]).range([height - m.bottom, m.top]);
    const color = d3.scaleLinear<string>().domain([5, 10]).range(['#6b9eff', '#f472b6']).clamp(true);
    [0, 2, 4, 6, 8, 10].forEach(t => {
      svg.append('line').attr('x1', m.left).attr('x2', width - m.right).attr('y1', y(t)).attr('y2', y(t)).attr('stroke', 'rgba(255,255,255,.08)');
      svg.append('line').attr('x1', x(t)).attr('x2', x(t)).attr('y1', m.top).attr('y2', height - m.bottom).attr('stroke', 'rgba(255,255,255,.08)');
    });
    svg.append('text').attr('x', (m.left + width - m.right) / 2).attr('y', height - 8).attr('text-anchor', 'middle').attr('fill', '#8a97ad').attr('font-size', 10).text('Complexity →');
    svg.append('text').attr('transform', `translate(12,${(m.top + height - m.bottom) / 2}) rotate(-90)`).attr('text-anchor', 'middle').attr('fill', '#8a97ad').attr('font-size', 10).text('Impact →');
    data.forEach(d => {
      svg.append('circle').attr('cx', x(d.x)).attr('cy', y(d.y)).attr('r', 8).attr('fill', color(d.y)).attr('opacity', 0.8).attr('stroke', '#e8eef9').attr('stroke-width', 1);
      svg.append('text').attr('x', x(d.x)).attr('y', y(d.y) - 12).attr('text-anchor', 'middle').attr('fill', '#8a97ad').attr('font-size', 9).text(d.name);
    });
  }, []);

  return (
    <section id="gallery" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-heading">
          <div className="section-label">12 / Analytics & Visualization</div>
          <h2>Interactive charts that tell a story.</h2>
        </div>
        <div className="d3-grid">
          <div className="d3-card"><h3>Skills Distribution</h3><div className="d3-chart" ref={radialRef} style={{ height: 300 }} /></div>
          <div className="d3-card"><h3>Project Technologies</h3><div className="d3-chart" ref={barsRef} style={{ height: 300 }} /></div>
          <div className="d3-card"><h3>Learning Journey</h3><div className="d3-chart" ref={areaRef} style={{ height: 260 }} /></div>
          <div className="d3-card"><h3>Project Complexity</h3><div className="d3-chart" ref={scatterRef} style={{ height: 300 }} /></div>
        </div>
      </div>
    </section>
  );
}
