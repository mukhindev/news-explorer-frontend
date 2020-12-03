import BemHandler from '../../utils/bem-handler';
import './Container.css';

const bem = new BemHandler('container');

function Container({ children, className: mix }) {
  return (
    <div className={bem.get(null, null, mix)}>
      {children}
    </div>
  );
}

export default Container;
