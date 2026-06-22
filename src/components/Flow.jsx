import Icon from '../lib/icons.jsx'

export default function Flow({ nodes }) {
  if (!nodes || !nodes.length) return null
  return (
    <div className="cssflow">
      {nodes.map((n, i) => (
        <div className="cf-step" key={i}>
          <div className={'cf-node' + (n.tone ? ' ' + n.tone : '')}>
            <span className="cf-ic"><Icon name={n.icon} size={21} /></span>
            <div className="cf-t">{n.t}</div>
            {n.s ? <div className="cf-s">{n.s}</div> : null}
          </div>
          {i < nodes.length - 1 && (
            <div className="cf-arrow"><span className="wire" /></div>
          )}
        </div>
      ))}
    </div>
  )
}
