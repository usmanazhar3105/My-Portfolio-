import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './app.css'

function ThreeBg() {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const container = ref.current!
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
		container.appendChild(renderer.domElement)
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
		camera.position.set(0, 0, 18)

		const resize = () => {
			const { clientWidth:w, clientHeight:h } = container
			renderer.setSize(w, h)
			camera.aspect = w/h; camera.updateProjectionMatrix()
		}
		const observer = new ResizeObserver(resize); observer.observe(container); resize()

		const geo = new THREE.TorusKnotGeometry(6.8, 0.18, 220, 18)
		const mat = new THREE.MeshStandardMaterial({ color: 0x6ae3ff, metalness: 0.35, roughness: 0.25, emissive: 0x112233, emissiveIntensity: 0.4 })
		const ribbon = new THREE.Mesh(geo, mat)
		scene.add(ribbon)
		const amb = new THREE.AmbientLight(0xffffff, 0.22); scene.add(amb)
		const p1 = new THREE.PointLight(0x6ae3ff, 10, 120); p1.position.set(12,10,10); scene.add(p1)
		const p2 = new THREE.PointLight(0x9b8cff, 8, 120); p2.position.set(-12,-6,-12); scene.add(p2)

		let t = 0; let mounted = true
		const tick = () => { if(!mounted) return; requestAnimationFrame(tick); t+=0.0035; ribbon.rotation.y+=0.0016; ribbon.position.y = Math.sin(t)*0.6; renderer.render(scene,camera)}
		tick()
		return () => { mounted=false; observer.disconnect(); container.removeChild(renderer.domElement); renderer.dispose() }
	}, [])
	return <div ref={ref} className="three-bg" />
}

export default function App() {
	const [messages, setMessages] = useState<{role:'user'|'assistant', content:string}[]>([])
	const [input, setInput] = useState('')
	const [loading, setLoading] = useState(false)

	async function send() {
		const prompt = input.trim(); if(!prompt) return
		setMessages(m => [...m, { role: 'user', content: prompt }])
		setInput('')
		setLoading(true)
		try{
			const res = await fetch('/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt }) })
			if(!res.ok){ const err = await res.json().catch(()=>({})); throw new Error(err.detail || 'Request failed') }
			const data = await res.json()
			setMessages(m => [...m, { role:'assistant', content: data.code || '' }])
		}catch(e:any){
			setMessages(m => [...m, { role:'assistant', content: 'Error: ' + (e?.message || e) }])
		} finally { setLoading(false) }
	}

	return (
		<div className="chat-root">
			<ThreeBg />
			<div className="chat-panel">
				<div className="chat-header">Chat-bot</div>
				<div className="messages" id="messages">
					{messages.map((m,i)=> (
						<div className={`msg ${m.role}`} key={i}>
							<pre>{m.content}</pre>
						</div>
					))}
					{loading && <div className="typing"><span></span><span></span><span></span></div>}
				</div>
				<div className="input-row">
					<input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your request..." onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); } }} />
					<button className="send" onClick={send} aria-label="Send">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12L21 3L14 21L11 13L3 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
				</div>
			</div>
		</div>
	)
}
