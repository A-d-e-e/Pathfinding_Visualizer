// src/components/Node.jsx
import React from 'react';

export default function Node({ cell, onToggleWall, status }) {
  const classes = ['cell'];
  if (cell.isWall) classes.push('wall');
  if (status) {
    classes.push(status, 'bounce');    // add bounce each status change
  }
  if (status === 'visited') classes.push('visited');
  if (status === 'path')
    {
      classes.push('bounce');
    }
  if (status === 'start')   classes.push('start');
  if (status === 'end')     classes.push('end');

  return (
    <div
    className={[
      'cell',
      cell.isWall && 'wall',
      status && status,        // e.g. 'visited','path'
      status ? 'bounce' : ''   // add bounce on any status
    ].join(' ')}
      onClick={() => onToggleWall(cell.row, cell.col)}
    />
  );
}
