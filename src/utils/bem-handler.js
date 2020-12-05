/*
В конструктор передаётся имя БЭМ-блока
Метод get(элемент, модификатор) возвращает:
Если элемент = false, возвращает имя БЭМ-блока
Если элемент задан, возвращается имя БЭМ-элемента
Если модификатор:
  false, не добавляется модификатор
  строка: добавится булеевый БЭМ-модификатор
  [cтрока]: добавится несколько булеевых БЭМ-модификаторов
  { ключ: значение }: один или несколько ключ_значение БЭМ-модификаторов
  { ключ: true }: один или несколько булеевых БЭМ-модификаторов
*/

export default class BemHandler {
  constructor(block) {
    this.block = block;
  }

  getWithModifier(modifier, element) {
    // Если не элемент, то блок
    const bemClass = element || this.block;
    const classes = [bemClass];

    // Если модификатор строка, то по БЭМ он булевый
    if (modifier && typeof modifier === 'string') {
      classes.push(`${bemClass}_${modifier}`);
      return classes.join(' ');
    }
    // Есди модификатор массив, то по БЭМ несколько булевых
    if (modifier && modifier instanceof Array) {
      modifier.forEach((el) => {
        if (!el) return;
        classes.push(`${bemClass}_${el}`);
      });
      return classes.join(' ');
    }
    // Если модификатор объект, то по БЭМ он ключ_значение
    if (modifier && modifier instanceof Object) {
      const modifiers = Object.entries(modifier);
      modifiers.forEach((el) => {
        if (!el[1]) return '';
        if (typeof el[1] === 'boolean') return classes.push(`${bemClass}_${el[0]}`);
        return classes.push(`${bemClass}_${el[0]}_${el[1]}`);
      });

      return classes.join(' ');
    }
    // Если модификатор не передан, возвращать без него
    return bemClass;
  }

  getWithElement(element, modifier) {
    const bemElement = `${this.block}__${element}`;
    if (modifier) return this.getWithModifier(modifier, bemElement);
    return bemElement;
  }

  get(element, modifier, mix) {
    let result;

    if (!element) {
      if (!modifier) {
        result = this.block;
      } else {
        result = this.getWithModifier(modifier, null);
      }
    } else {
      result = this.getWithElement(element, modifier);
    }
    return !mix
      ? result
      : `${result} ${mix}`;
  }
}
