import { createRef } from "react"
import { Vector3 } from "three"

const state = {
  sections: 3,
  pages: 2.3,
  zoom: 75,
  paragraphs: [
    {
      offset: 1,
      factor: 1.75,
      header: "vytal.ai",
      image: "/photo-1515036551567-bf1198cccc35.jpeg",
      aspect: 1.51,
      text: "Two thousand pharmacologists and bio-chemists were subsidized. Six years later it was being produced commercially."
    },
    {
      offset: 2,
      factor: 2.0,
      header: "vytal.ai",
      image: "/photo-1515036551567-bf1198cccc35.jpeg",
      aspect: 1.5,
      text: "Are you up to speed on my asparagus? I think I see her. Are you up to speed on my asparagus? I think I see her."
    }
  ],
  stripes: [
    { offset: 0, color: "#000", height: 13 },
    { offset: 6.3, color: "#000", height: 20 }
  ],
  diamonds: [
    { x: 0, offset: 0.25, pos: new Vector3(), scale: 1, factor: 1.8 },
    { x: 0, offset: 0.9, pos: new Vector3(), scale: 1, factor: 1.8 },
    { x: 0, offset: 1.5, pos: new Vector3(), scale: 1.5, factor: 6 }
  ],
  top: createRef()
}

export default state
