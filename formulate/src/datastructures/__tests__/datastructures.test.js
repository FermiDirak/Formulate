import Link, { linkSymbol } from "../link";
import { createFormNode } from "../formNode";

describe('formulate datastructures', () => {
  const initialForm = {
    name: 'johnny',
    age: 1337,
    pets: ['cato'],
    profile: {
      nick: 'dirak',
      swagger: true,
    },
  };

  const formNode = createFormNode(initialForm);

  it('creates a link', () => {
    const expectedInitialFormNode = {
      [linkSymbol]: new Link(initialForm),
      name: {
        [linkSymbol]: new Link(initialForm.name),
      },
      age: {
        [linkSymbol]: new Link(initialForm.age),
      },
      pets: {
        [linkSymbol]: new Link(initialForm.pets),
        0: {
          [linkSymbol]: new Link(initialForm.pets[0]),
        }
      },
      profile: {
        [linkSymbol]: new Link(initialForm.profile),
        nick: {
          [linkSymbol]: new Link(initialForm.profile.nick),
        },
        swagger: {
          [linkSymbol]: new Link(initialForm.profile.swagger),
        },
      },
    }

    expect(formNode).toMatchObject(expectedInitialFormNode);
  });
});
