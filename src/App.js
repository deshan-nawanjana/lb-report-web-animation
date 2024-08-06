import ArrowMotion from "./components/ArrowMotion"
import "./App.css"

function App() {
  return (
    <div className="container">
      <ArrowMotion />
      <div className="section section-a">
        ↓ Scroll Down ↓
      </div>
      <div className="section section-b">
        Animation Starts
        <div data-arrow-holder="start" />
      </div>
      <div className="section section-c">
        <div className="section-video">
          <div data-arrow-holder="video" />
        </div>
      </div>
      <div className="section section-d">
        <div className="section-arrow" />
        <div className="section-person">
          <div className="section-person-card">
            Person Card
          </div>
        </div>
        <div className="section-arrow">
          <div data-arrow-holder="person-1" />
        </div>
      </div>
      <div className="section section-e">
        <div className="section-arrow">
          <div data-arrow-holder="person-2" />
        </div>
        <div className="section-person">
          <div className="section-person-card">
            Person Card
          </div>
        </div>
        <div className="section-arrow" />
      </div>
      <div className="section section-f">
        <div data-arrow-holder="footer" />
        Footer
      </div>
    </div>
  )
}

export default App
