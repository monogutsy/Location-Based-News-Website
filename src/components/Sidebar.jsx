import {
  FaHome,
  FaFire,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaBookmark,
  FaHeart,
  FaPlayCircle,
} from 'react-icons/fa'

import nationIcon from '../assets/icons/nation.png'
import sportsIcon from '../assets/icons/sports.png'
import eventsIcon from '../assets/icons/events.png'
import crimeIcon from '../assets/icons/crime.png'
import educationIcon from '../assets/icons/education.png'
import communityIcon from '../assets/icons/community.png'

function Sidebar() {
  return (
    <aside className='sidebar'>
      <h2 className='logo'>
        NewsHub
      </h2>

      <nav>
        <button className='active'>
          <FaHome /> Home
        </button>

        <button>
          <FaFire /> Trending
        </button>

        <button>
          <FaMapMarkerAlt />
          Map & Incidents
        </button>

        <button>
          <FaLayerGroup />
          Categories
        </button>

        <button>
          <FaBookmark />
          Favorites
        </button>

        <button>
          <FaHeart />
          Saved Locations
        </button>

        <button>
          <FaPlayCircle />
          Multimedia
        </button>
      </nav>

      <div className='sidebar-categories'>
        <h4>Categories</h4>

        <div className='category-item'>
          <div className='category-circle'>
            <img
              src={nationIcon}
              alt='nation'
              className='category-icon'
            />
          </div>

          <span>Nation</span>
        </div>

        <div className='category-item'>
          <div className='category-circle'>
            <img
              src={sportsIcon}
              alt='sports'
              className='category-icon'
            />
          </div>

          <span>Sports</span>
        </div>

        <div className='category-item'>
          <div className='category-circle'>
            <img
              src={eventsIcon}
              alt='events'
              className='category-icon'
            />
          </div>

          <span>Events</span>
        </div>

        <div className='category-item'>
          <div className='category-circle'>
            <img
              src={crimeIcon}
              alt='crime'
              className='category-icon'
            />
          </div>

          <span>Crime</span>
        </div>

        <div className='category-item'>
          <div className='category-circle'>
            <img
              src={educationIcon}
              alt='education'
              className='category-icon'
            />
          </div>

          <span>Education</span>
        </div>

        <div className='category-item'>
          <div className='category-circle'>
            <img
              src={communityIcon}
              alt='community'
              className='category-icon'
            />
          </div>

          <span>Community</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar