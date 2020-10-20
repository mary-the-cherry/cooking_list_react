import React from 'react';

/**
 *
 * Component to render a Filter Button
 * @param {any} props
 */

export default function Filter(props) {
  return (
    <button
      type="button"
      className={`btn btn-info filter-btn ${props.active ? 'active' : ''}`}
      aria-pressed={props.active}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> dishes</span>
    </button>
  );
}
