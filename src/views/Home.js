import PublicNavbar from './PublicNavbar'
import '../assets/Home.css'
const nurse1 = require('../assets/img/nurse4.jpg')

export default function Home() {

    return (
        <div>
            <PublicNavbar />
            <img src={nurse1} className='fotoPrincipal' />
        </div>

    )
}

