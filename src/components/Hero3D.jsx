import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Ported verbatim from the original ishan-jain-profile.html hero canvas:
// a teal wireframe icosahedron with a dark inner shell and an orange particle
// cloud, rotating slowly and parallaxing toward the cursor.
export default function Hero3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true })
    } catch (e) { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 4.4
    const group = new THREE.Group()
    scene.add(group)

    const geo = new THREE.IcosahedronGeometry(1.5, 1)
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x5ad1c8, transparent: true, opacity: 0.55 })
    )
    group.add(wire)
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.95, 0),
      new THREE.MeshBasicMaterial({ color: 0x0e1220, transparent: true, opacity: 0.85 })
    )
    group.add(inner)

    const N = 150
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 2.3 + Math.random() * 1.7
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      pos[i * 3 + 2] = r * Math.cos(ph)
    }
    const pgeo = new THREE.BufferGeometry()
    pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pts = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0xff6a3d, size: 0.05, transparent: true, opacity: 0.85 }))
    scene.add(pts)

    function resize() {
      const w = cv.clientWidth, h = cv.clientHeight
      if (w && h) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix() }
    }
    resize()
    window.addEventListener('resize', resize)
    const reTimer = setTimeout(resize, 400)

    let tx = 0, ty = 0, mx = 0, my = 0, t = 0, raf = 0
    const onMove = (e) => { tx = (e.clientX / window.innerWidth - 0.5); ty = (e.clientY / window.innerHeight - 0.5) }
    window.addEventListener('mousemove', onMove)

    function frame() {
      t += 0.0035; mx += (tx - mx) * 0.05; my += (ty - my) * 0.05
      group.rotation.y = t + mx * 0.9
      group.rotation.x = t * 0.4 + my * 0.6
      pts.rotation.y = -t * 0.55 + mx * 0.4
      pts.rotation.x = -t * 0.2
      renderer.render(scene, camera)
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(reTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      geo.dispose(); wire.geometry.dispose(); wire.material.dispose()
      inner.geometry.dispose(); inner.material.dispose()
      pgeo.dispose(); pts.material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas id="hero3d" ref={canvasRef} aria-hidden="true" />
}
