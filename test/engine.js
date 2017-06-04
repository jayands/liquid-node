import { Liquid, expect } from './_helper';

describe('Engine', () => {
  const self = this;
  beforeEach(() => {
    self.filters = Liquid.StandardFilters;
  });
  it('should create strainers', () => {
    const engine = new Liquid.Engine();
    const strainer = engine.Strainer;
    return expect(strainer.size).to.exist;
  });
  return it('should create separate strainers', () => {
    const engine1 = new Liquid.Engine();
    engine1.registerFilters(new Map([['foo1', () => 'foo1']]));
    const strainer1 = engine1.Strainer;
    expect(strainer1.size).to.exist;
    expect(strainer1.get('foo1')).to.exist;
    const engine2 = new Liquid.Engine();
    engine2.registerFilters(new Map([['foo2', () => 'foo2']]));
    const strainer2 = engine2.Strainer;
    expect(strainer2.size).to.exist;
    expect(strainer2.get('foo2')).to.exist;
    expect(strainer1.get('foo2')).not.to.exist;
    return expect(strainer2.get('foo1')).not.to.exist;
  });
});
