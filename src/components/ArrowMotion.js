import { useEffect, useState } from "react"
import "./ArrowMotion.css"

let lastFrame = null
let lastPoints = { top: 0, left: 0 }
let lastStamp = performance.now()
let lastSection = "start"

export default function ArrowMotion() {
  // arrow activation state
  const [active, setActive] = useState(false)
  // current arrow position
  const [points, setPoints] = useState({})
  // current section name
  const [section, setSection] = useState(0)
  // method to animate
  const animate = thisStamp => {
    const delta = (thisStamp - lastStamp) * 0.005
    // request next frame
    lastFrame = requestAnimationFrame(animate)
    // get holder elements
    const holders = Array.from(document.querySelectorAll("[data-arrow-holder]"))
    // get client reacts
    const rects = holders.map(item => item.getBoundingClientRect())
    // get closest elements to viewport
    const index = rects.findIndex(rect => rect.top > 0)
    // return if no index
    if (index === -1) { return }
    // get current anchor
    const anchor = rects[index]
    // set active on minimum top
    if (anchor.top < 800) { setActive(true) }
    // get current section name
    const section = holders[index].getAttribute("data-arrow-holder")
    // update current section
    setSection(section)
    // get close flags
    const closeTop = Math.abs(lastPoints.top - anchor.top) < 10
    const closeLeft = Math.abs(lastPoints.left - anchor.left) < 10
    // update last section on close
    if (closeTop && closeLeft) {
      lastSection = section
    }
    // check section states
    if (section !== lastSection) {
      lastSection = null
      // animate position
      const top = lastPoints.top + (anchor.top - lastPoints.top) * delta
      const left = lastPoints.left + (anchor.left - lastPoints.left) * delta
      lastPoints = { top, left }
      setPoints(lastPoints)
    } else {
      // set direct position
      setPoints(anchor)
      lastPoints = anchor
      lastSection = section
    }
    // update last stamp
    lastStamp = thisStamp
  }
  // effect on mount
  useEffect(() => {
    lastFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(lastFrame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // arrow motion dom
  return (
    <div
      className="arrow-motion"
      data-section={section}
      data-active={active}
      style={{ left: points.left, top: points.top }}>
      <div className="arrow-motion-inner">
        <div className="arrow-motion-item image-arrow-left am-left" />
        <div className="arrow-motion-item image-arrow-right am-right" />
        <div className="arrow-motion-item image-arrow-bottom am-bottom" />
      </div>
      <div className="arrow-motion-item image-arrow-play am-play" />
    </div>
  )
}
