import Main from '../../pages/main'
import Character from '../../pages/character'

const routes = [
  {
    path: '/',
    component: Main,
    key: 0,
    exact: true
  },
  {
    path: '/character/:id',
    component: Character,
    key: 1,
    exact: true
  }
]

export default routes
