import MapUI from "./ProjectsScene/MapUI"
import {styled} from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  pointer-events: none;
`

export default function UI() {
  return (
    <Container>
        <MapUI />
    </Container>
  )
}
