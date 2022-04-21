import {Link} from 'react-router-dom';
import { mapOddsLeagues } from '../../helperFunctions';

const Odds = () => {

  return (
    <div>
       <div className='leagues-list' >
          {
            mapOddsLeagues.map((OddsLeague, index) => {
              return (
                <Link to={'/odds/' + OddsLeague.code_link} state={OddsLeague.code_link} className="link" key={index}>
                  <div className="card-style">
                      <div>
                        <div className="card-child" >{OddsLeague.name}</div >
                      </div>
                  </div>
                </Link>
              );
            })
          }
        </div>
    </div>
  );
};

export default Odds;