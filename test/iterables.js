import { Liquid, expect } from './_helper';

describe('Iterable', () => {
  describe('.cast', () => {
    it("doesn't cast iterables", () => {
      const iterable = new Liquid.Iterable();
      return expect(Liquid.Iterable.cast(iterable)).to.equal(iterable);
    });
    return it('casts null/undefined to an empty iterable', () => expect(Liquid.Iterable.cast(null).toArray()).to.become([]));
  });
  describe('.slice', () => it('is abstract', () => expect(() => new Liquid.Iterable().slice()).to.throw(/not implemented/)));
  return describe('.last', () => it('is abstract', () => expect(() => new Liquid.Iterable().last()).to.throw(/not implemented/)));
});
