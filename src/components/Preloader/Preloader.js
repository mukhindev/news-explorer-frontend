import BemHandler from '../../utils/bem-handler';
import './Preloader.css';

const bem = new BemHandler('preloader');

function Preloader({ className: mix }) {
  return (
    <div className={bem.get(null, null, mix)} />
  );
}

export default Preloader;
