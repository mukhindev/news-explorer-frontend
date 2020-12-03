import Container from '../Container/Container';
import BemHandler from '../../utils/bem-handler';
import './About.css';

const bem = new BemHandler('about');

function About() {
  return (
    <section className={bem.get(null)}>
      <Container className={bem.get('container')}>
        <img
          className={bem.get('avatar')}
          alt="Фотография автора"
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1927&q=80"
        />
        <div className={bem.get('text')}>
          <h2 className={bem.get('title')}>Об авторе</h2>
          <p className={bem.get('paragraph')}>Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
        <p className={bem.get('paragraph')}>Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
        </div>
      </Container>
    </section>
  );
}

export default About;
