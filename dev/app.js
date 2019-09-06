/*** examples/src/app.js ***/
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Circle, Text } from "../src";

const App = () => (
  <div>
    <Circle />
    <Text />
  </div>
)

function renderWithHotReload(){
  render(
  <AppContainer>
    <App />
  </AppContainer>, 
  document.getElementById('root'))
}

renderWithHotReload()

if(module.hot){
  module.hot.accept('../src', () => {
    renderWithHotReload(App)
  })
}