import Promise from 'any-promise';
import { renderTest } from './_helper';

const asyncResult = (result, delay = 1) => new Promise((resolve) => {
  const onTimeout = () => resolve(result);
  return setTimeout(onTimeout, delay);
});

describe('Futures', () => {
  it('are supported as simple variables', () => renderTest('worked', '{{ test }}', {
    test: asyncResult('worked'),
  }));
  it('are supported as complex variables', () => renderTest('worked', '{{ test.text }}', {
    test: asyncResult({
      text: 'worked',
    }),
  }));
  it('are supported as filter input', () => renderTest('WORKED', '{{ test | upcase }}', {
    test: asyncResult('worked'),
  }));
  it('are supported as filter arguments', () => renderTest('1-2-3', '{{ array | join:minus }}', {
    minus: asyncResult('-'),
    array: [1, 2, 3],
  }));
  it('are supported as filter arguments', () => renderTest('1+2+3', '{{ array | join:minus | split:minus | join:plus }}', {
    minus: asyncResult('-'),
    plus: asyncResult('+'),
    array: [1, 2, 3],
  }));
  it('are supported in conditions', () => renderTest('YES', '{% if test %}YES{% else %}NO{% endif %}', {
    test: asyncResult(true),
  }));
  it('are supported in captures', () => renderTest('Monkeys&Monkeys', '{% capture heading %}{{animal}}{% endcapture %}{{heading}}&{{heading}}', {
    animal: asyncResult('Monkeys'),
  }));
  it('are supported in assigns', () => renderTest('YES', '{% assign test = var %}{% if test == 42 %}YES{% else %}NO{% endif %}', {
    var: asyncResult(42),
  }));
  return context('in for-loops', () => {
    it('are supported as lists', () => {
      const products = [1, 2, 2].map(i => ({ id: `item${i}` }));
      const doc = '{% for product in products %}- {{ product.id }}\n{% endfor %}';
      return renderTest('- item1\n- item2\n- item2\n', doc, {
        products: asyncResult(products),
      });
    });
    it('are supported as lists (with ifchanged)', () => {
      const products = [1, 2, 2].map(i => ({ id: `item${i}` }));
      const doc = '{% for product in products %}{% ifchanged %}- {{ product.id }}\n{% endifchanged %}{% endfor %}';
      return renderTest('- item1\n- item2\n', doc, {
        products: asyncResult(products),
      });
    });
    it('are supported as elements', () => {
      const doc = '{% for product in products %}- {{ product.id }}\n{% endfor %}';
      const products = [1, 2, 3].map(i => ({ id: `item${i}` }));
      return renderTest('- item1\n- item2\n- item3\n', doc, { products });
    });
  });
});
