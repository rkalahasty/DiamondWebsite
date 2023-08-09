import ReactDOM from "react-dom"
import React, { Suspense, useEffect, useRef, useMemo } from "react"
import { Canvas, Dom, useLoader, useFrame } from "react-three-fiber"
import { TextureLoader, LinearFilter } from "three"
import lerp from "lerp"
import { Text, MultilineText } from "./components/Text"
import Diamonds from "./diamonds/Diamonds"
import Plane from "./components/Plane"
import { Block, useBlock } from "./blocks"
import state from "./store"
import "./styles.css"

function Startup() {
  const ref = useRef()
  useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)))
  return <Plane ref={ref} color="#0e0e0f" position={[0, 0, 200]} scale={[100, 100, 1]} />
}

function Paragraph({ image, index, offset, factor, header, aspect, text }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = !(index % 2)
  const color = index % 2 ? "#D40749" : "#2FE8C3"
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane map={image} args={[1, 1, 32, 32]} shift={75} size={size} aspect={aspect} scale={[w * size, (w * size) / aspect, 1]} frustumCulled={false} />
        <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
          <div tabIndex={index}>{text}</div>
        </Dom>
        <Text left={left} right={!left} size={w * 0.04} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
          {header}
        </Text>
        <Block factor={0.2}>
          <Text opacity={0.5} size={w * 0.1} color="#1A1E2A" position={[((left ? w : -w) / 2) * size, (w * size) / aspect / 1.5, -10]}>
            {"0" + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  )
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )
  useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images])
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile, medium, large, xl, margin, sectionHeight: h } = useBlock()
  const size = 1.5 < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = true
  const color = "#2FBDA1"
  return (
    <>
    <Block factor={1} offset={-1}>
      <Dom position={[mobile ? -w / 1.75 : -w / 1.25, mobile ? -h * 0.3 : -h * 0.2, 0]}>
      <img src="/DI.png" width={300} className="frame__title" style={{zIndex:"9999"}}/>
      </Dom>  
    </Block>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Text left size={w * 0.05} position={[-w / 2.2, 1.5, -1]} color={color}>
            Diamond Investments
          </Text>
        </Block>
        <Block factor={1.0}>
          <Dom position={[-w / 2.2, -w * 0.05 + 1, -1]} style={{ width: pixelWidth / (mobile ? 1.5 : 1) }}>
            Drawing inspiration from a diamond&apos;s 58 facets, we&apos;ve curated a 58 million dollar fund. We invest in seed stage startups, putting our faith and a million dollar check in the hands of founders we believe in.
          </Dom>
        </Block>
      </Block>


      <Block factor={1.75} offset={1}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 1, (w * size) / 1.5 / 2 - 0.75, 1]}>
          <div tabIndex={1}>
          {/* <Text size={w * 0.03} color={color}>
            vytal.ai
          </Text>
          <Text size={w * 0.04} style={{textDecoration: "underline"}}>
            Recent Investments
          </Text> */}
            <div style={{color: "#FFFFFF", fontSize: "1.1rem"}}>
            Comprehensive and quantitative tools for brain health monitoring - all on your smartphone.
            </div>
            <br />
            <div style={{color: "#FFFFFF", fontSize: "1.1rem"}}>
            Founded by US high school students,
            Rohan Kalahasty & Sai Mattapalli
            </div>
          </div>
        </Dom> 
        <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 2)}}
          position={[mobile ? 1000 : (medium ? 3 : (large ? 6 : 8.5)), 3, 1]}>
          <a href="https://vytal.ai" target="_blank"><img className="logo" src="/vytal.png" /></a>
        </Dom>
        <Text left={left} right={!left} size={w * 0.03} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / 1.5 / 2, -1]}>
          vytal.ai
        </Text>
        <Text left size={w * 0.04} position={[((left ? -w : w) * size) / 2, (w * size) / 1.5 / 2 + (xl ? 2.5 : (mobile ? 1 : 1.5)), -1]} style={{textDecoration: "underline"}}>
          Recent Investments
        </Text>

        <Dom position={[left || mobile ? (-w * size) / 2 : 1, (w * size) / 1.5 / 2 - (mobile ?  4.5 : 4), 1]} style={{ width: pixelWidth / (mobile ? 1 : 1) }}>
          Looking for an investment? Approach us <a href="/">here</a>.<br/>
          Have a media inquiry? Contact us <a href="/">here</a>.
        </Dom>
      </group>
    </Block>

    <Block factor={2} offset={0.9}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
      <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 1), textAlign: "left", color: "#d1d1d1", fontSize: "1.2em" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (w * size) / 1.5 / 2 - 8.5, 0.01]}>
          <div tabIndex={1}>
          "At Diamond Investments, we have a steadfast commitment to unearthing the world's most exceptional startup founders, much like discovering the rarest and most valuable diamonds in the world.
          <br />
          <br />
          Just as diamonds are formed under immense pressure, our chosen founders are those who have weathered the challenges of entrepreneurship and emerged stronger, resilient, and more determined than ever.
          <br />
          <br />
          We seek out individuals who have demonstrated unwavering perseverance, tenacity, and the ability to navigate through the toughest of situations with grace and determination."
          <br />
          <br />
          <div style={{color: "#FFFFFF", fontSize: "1.1em"}}>- Shekhar Goyal, Managing Partner @ Diamond Investments</div>
          </div>
        </Dom>
      </group>
    </Block>


      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -10]} />
        </Block>
      ))}
      <Block factor={1.25} offset={1.5}>
        <Dom className="bottom-left" position={[-canvasWidth / 2, -canvasHeight / (mobile ? 0.75 : (medium ? 0.7 : (large ? 1 : 2))), 0]}>
        &copy; 2023 Diamond Investments, All Rights Reserved.
        </Dom>
      </Block>
    </>
  )
}

function App() {
  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  const w = window.innerWidth
  const mobile = w < 700
  const medium = w < 1100 && !mobile
  const large = w < 1400 && !medium && !mobile
  const xl = w >= 1800 && !large && !medium && !mobile
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas className="canvas" concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
          <Content />
          <Diamonds />
          <Startup />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div id={"0" + index} style={{ height: (mobile ? '90vh' : (medium ? '90vh' : (large ? '80vh' : '65vh'))) }} />
        ))}
      </div>
      <div className="frame">
        <div className="frame__nav">
          <a className="frame__link" href="#00" children="home" />
          <a className="frame__link" href="#01" children="investments" />
          <a className="frame__link" href="#02" children="about" />
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
